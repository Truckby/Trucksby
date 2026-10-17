const imageCleanupService = require('../services/imageCleanupService');

const RUN_EVERY_MS = 24 * 60 * 60 * 1000;
// Let the server finish starting up (and connect to the database) before the first run
const FIRST_RUN_DELAY_MS = 10 * 60 * 1000;

let running = false;

const run = async () => {
  if (running) return;
  running = true;
  try {
    await imageCleanupService.deleteOrphanedImages();
  } catch (error) {
    console.log('ImageCleanupError: ', error);
  } finally {
    running = false;
  }
};

// Deletes unused photos from S3 once a day
const start = () => {
  // Only the live server cleans up: a development machine may use the live bucket with a
  // different database, and would see every live photo as unused
  if (process.env.NODE_ENV !== 'production') return;

  setTimeout(() => {
    run();
    setInterval(run, RUN_EVERY_MS);
  }, FIRST_RUN_DELAY_MS);
};

module.exports = { start };
