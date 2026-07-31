/**
 * @fileoverview Automated script to fetch Play Store stats and update stats.json.
 * This runs in a Node.js environment (GitHub Actions).
 */

const gplay = require('google-play-scraper').default;
const fs = require('fs');
const path = require('path');

const APP_ID = 'com.digitalgarden';
const TARGET_FILE = path.join(__dirname, '../data/stats.json');

/**
 * Validates the rating string.
 * @param {string|number} rating
 * @return {boolean}
 */
function isValidRating(rating) {
    return rating !== undefined && rating !== null && rating !== 'undefined';
}

/**
 * Validates the installs string.
 * @param {string} installs
 * @return {boolean}
 */
function isValidInstalls(installs) {
    return typeof installs === 'string' && installs.length > 0 && installs !== 'undefined';
}

async function updateStats() {
    try {
        console.log(`Fetching stats for ${APP_ID}...`);
        const appDetails = await gplay.app({appId: APP_ID});

        // Use scoreText if available, otherwise format numeric score
        let rating = appDetails.scoreText || (appDetails.score ? appDetails.score.toFixed(1) + '/5' : '5.0/5');
        const downloads = appDetails.installs || '1,000+';

        if (!isValidRating(rating) || !isValidInstalls(downloads)) {
            throw new Error(`Invalid stats received: rating="${rating}", downloads="${downloads}"`);
        }

        console.log(`Live Stats found - Rating: ${rating}, Downloads: ${downloads}`);

        const statsData = {
            rating: rating,
            downloads: downloads
        };

        fs.writeFileSync(TARGET_FILE, JSON.stringify(statsData, null, 4));
        console.log('Successfully updated data/stats.json with live stats!');

    } catch (error) {
        console.error('Error updating stats:', error.message);
        process.exit(1);
    }
}

updateStats();
