const User = require('../models/userModel');
const Truck = require('../models/truckModel');
const imageService = require('./imageService');

// Keys our upload code creates start with Date.now() in ms ("1712345678901-..."). Anything
// else in the bucket was put there some other way, so the sweep never touches it.
const UPLOAD_KEY_PATTERN = /^\d{13}-/;

// Profile and listing photos are uploaded just before the form that uses them is saved.
// Give slow or retried saves a full day before treating a photo as abandoned.
const ORPHAN_MIN_AGE_MS = 24 * 60 * 60 * 1000;

// Deletes photos that were replaced or removed, unless another user or listing still uses
// them, so one account's change can never delete a photo someone else shows
const deleteUnusedImages = async (urls) => {
  const candidates = [...new Set(urls.filter(Boolean))];
  if (!candidates.length) return;

  const [users, trucks] = await Promise.all([
    User.find({ image: { $in: candidates } }, { image: 1 }).lean(),
    Truck.find({ images: { $in: candidates } }, { images: 1 }).lean(),
  ]);
  const inUse = new Set([
    ...users.map((user) => user.image),
    ...trucks.flatMap((truck) => truck.images),
  ]);

  await imageService.deleteImages(candidates.filter((url) => !inUse.has(url)));
};

// S3 keys of every photo a user or listing points to
const getReferencedKeys = async () => {
  const [users, trucks] = await Promise.all([
    User.find({ image: { $nin: [null, ''] } }, { image: 1 }).lean(),
    Truck.find({ 'images.0': { $exists: true } }, { images: 1 }).lean(),
  ]);
  const urls = [...users.map((user) => user.image), ...trucks.flatMap((truck) => truck.images)];
  return new Set(urls.map(imageService.getS3KeyFromUrl).filter(Boolean));
};

// Deletes uploaded photos that no user or listing points to and that are over a day old:
// photos from abandoned forms, saves that failed after the upload, or replaced photos
// that older code didn't delete
const deleteOrphanedImages = async () => {
  // Read the database before listing the bucket, so a photo uploaded and saved in
  // between is new (and skipped by the age check) rather than missing from the database
  const referencedKeys = await getReferencedKeys();
  const uploads = (await imageService.listImages()).filter(({ Key }) => UPLOAD_KEY_PATTERN.test(Key));

  // Safety net: if the database doesn't point at a single photo in the bucket, this
  // server is probably connected to a different database than the bucket belongs to
  // (e.g. a local database with the live bucket). Deleting would wipe photos in use.
  if (uploads.length && !uploads.some(({ Key }) => referencedKeys.has(Key))) {
    console.log('ImageCleanup: skipped, the database references none of the bucket\'s photos');
    return 0;
  }

  const cutoff = Date.now() - ORPHAN_MIN_AGE_MS;
  const orphanKeys = uploads
    .filter(({ Key, LastModified }) => !referencedKeys.has(Key) && LastModified.getTime() < cutoff)
    .map(({ Key }) => Key);

  await imageService.deleteImageKeys(orphanKeys);
  console.log(`ImageCleanup: deleted ${orphanKeys.length} unused photo(s)`);
  return orphanKeys.length;
};

module.exports = {
  deleteUnusedImages,
  deleteOrphanedImages,
};
