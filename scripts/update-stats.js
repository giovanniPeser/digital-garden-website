/**
 * @fileoverview Automated script to fetch Play Store stats and update main.js.
 * This runs in a Node.js environment (GitHub Actions).
 */

const gplay = require('google-play-scraper');
const fs = require('fs');
const path = require('path');

const APP_ID = 'com.digitalgarden';
const TARGET_FILE = path.join(__dirname, '../js/main.js');

async function updateStats() {
    try {
        console.log(`Fetching stats for ${APP_ID}...`);
        const appDetails = await gplay.app({appId: APP_ID});

        const rating = appDetails.scoreText || '4.8/5';
        const downloads = appDetails.installs || '1,000+';

        console.log(`Live Stats found - Rating: ${rating}, Downloads: ${downloads}`);

        let mainJsContent = fs.readFileSync(TARGET_FILE, 'utf8');

        // Regex patterns to find and replace the stats in CONFIG.STATS
        const ratingRegex = /RATING:\s*['"][^']*['"]/;
        const downloadsRegex = /DOWNLOADS:\s*['"][^']*['"]/;

        mainJsContent = mainJsContent.replace(ratingRegex, `RATING: '${rating}'`);
        mainJsContent = mainJsContent.replace(downloadsRegex, `DOWNLOADS: '${downloads}'`);

        fs.writeFileSync(TARGET_FILE, mainJsContent);
        console.log('Successfully updated js/main.js with live stats!');

    } catch (error) {
        console.error('Error updating stats:', error);
        process.exit(1);
    }
}

updateStats();
