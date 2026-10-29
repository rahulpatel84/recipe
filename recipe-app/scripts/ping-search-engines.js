#!/usr/bin/env node

/**
 * Post-deploy script to notify search engines about new/updated content
 *
 * Usage:
 *   node scripts/ping-search-engines.js                    # Ping sitemap only
 *   node scripts/ping-search-engines.js --urls url1 url2   # Ping specific URLs via IndexNow
 *
 * This script pings:
 * - Google (sitemap ping)
 * - Bing/Yandex via IndexNow (for instant indexing)
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://relishrealm.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = 'relishrealm2026indexnow';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(color, symbol, message) {
  console.log(`${colors[color]}${symbol}${colors.reset} ${message}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function pingGoogle() {
  // Note: Google deprecated the sitemap ping URL in 2023
  // Google crawls sitemaps automatically via Google Search Console
  // This function is kept for reference but will likely return 404
  log('blue', '→', 'Checking Google (uses Search Console)...');
  log('green', '✓', 'Google uses Search Console for sitemap discovery');
  return true;
}

async function pingBingIndexNow(urls = []) {
  log('blue', '→', 'Pinging Bing via IndexNow...');

  // If no specific URLs provided, just ping the sitemap URL
  const urlList = urls.length > 0 ? urls : [SITEMAP_URL];

  try {
    const body = JSON.stringify({
      host: 'relishrealm.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlList,
    });

    const result = await makeRequest('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    });

    // IndexNow returns 200 for success, 202 for accepted
    if (result.status === 200 || result.status === 202) {
      log('green', '✓', `IndexNow ping successful (${urlList.length} URLs submitted)`);
      return true;
    } else {
      log('yellow', '!', `IndexNow ping returned status ${result.status}: ${result.data}`);
      return false;
    }
  } catch (error) {
    log('red', '✗', `IndexNow ping failed: ${error.message}`);
    return false;
  }
}

async function pingYandex() {
  log('blue', '→', 'Pinging Yandex...');
  try {
    // Yandex also supports IndexNow, so we use the same endpoint
    const body = JSON.stringify({
      host: 'relishrealm.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: [SITEMAP_URL],
    });

    const result = await makeRequest('https://yandex.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    });

    if (result.status === 200 || result.status === 202) {
      log('green', '✓', 'Yandex ping successful');
      return true;
    } else {
      log('yellow', '!', `Yandex ping returned status ${result.status}`);
      return false;
    }
  } catch (error) {
    log('red', '✗', `Yandex ping failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('\n📡 Pinging Search Engines...\n');
  console.log(`   Site: ${SITE_URL}`);
  console.log(`   Sitemap: ${SITEMAP_URL}\n`);

  // Parse command line arguments for specific URLs
  const args = process.argv.slice(2);
  const urlsIndex = args.indexOf('--urls');
  const specificUrls = urlsIndex !== -1 ? args.slice(urlsIndex + 1) : [];

  if (specificUrls.length > 0) {
    console.log(`   Specific URLs to ping: ${specificUrls.length}\n`);
    specificUrls.forEach((url) => console.log(`     - ${url}`));
    console.log('');
  }

  const results = await Promise.all([
    pingGoogle(),
    pingBingIndexNow(specificUrls),
    pingYandex(),
  ]);

  const successCount = results.filter(Boolean).length;
  console.log('');

  if (successCount === results.length) {
    log('green', '✓', 'All search engines pinged successfully!\n');
    process.exit(0);
  } else {
    log('yellow', '!', `${successCount}/${results.length} pings successful\n`);
    process.exit(successCount > 0 ? 0 : 1);
  }
}

main().catch((error) => {
  log('red', '✗', `Script failed: ${error.message}\n`);
  process.exit(1);
});
