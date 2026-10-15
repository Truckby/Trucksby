const s3 = require('../configs/s3.config');

// Turns an S3 URL from our bucket into its object key. Supports both
// virtual-hosted (bucket.s3.region.amazonaws.com/key) and path-style
// (s3.region.amazonaws.com/bucket/key) URLs. Returns null for anything else.
const getS3KeyFromUrl = (url) => {
  const bucket = process.env.AWS_BUCKET_NAME;
  if (!url || !bucket) return null;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const path = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
  if (parsed.hostname.startsWith(`${bucket}.s3`)) {
    return path || null;
  }
  if (parsed.hostname.startsWith('s3') && path.startsWith(`${bucket}/`)) {
    return path.slice(bucket.length + 1) || null;
  }
  return null;
};

// Uploads files (from imageUploadMiddleware) to S3 and returns their URLs
const uploadImages = async (files) => {
  const results = await Promise.all(files.map((file) => s3.upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }).promise()));
  return results.map((result) => result.Location);
};

// Deletes images from S3. URLs that aren't in our bucket are ignored.
const deleteImages = async (urls) => {
  const keys = [...new Set(urls.map(getS3KeyFromUrl).filter(Boolean))];

  // deleteObjects accepts at most 1000 keys per request
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    const result = await s3.deleteObjects({
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: { Objects: batch.map((Key) => ({ Key })), Quiet: true },
    }).promise();

    if (result.Errors?.length) {
      console.log('DeleteImagesError: ', result.Errors);
    }
  }
};

module.exports = {
  uploadImages,
  deleteImages,
};
