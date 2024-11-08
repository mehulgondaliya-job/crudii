const i18n = require('i18n');
const path = require('path');

// Configure i18n
i18n.configure({
  locales: ['en'], // Supported languages
  directory: path.join(__dirname, '../locales'), // Directory for translation files
  defaultLocale: 'en', // Default language
  queryParameter: 'lang', // Optional: Allows changing language via query parameter
  autoReload: true, // Automatically reload locale files on change
  syncFiles: true, // Sync locale information across all files
  objectNotation: true, // Allows using nested keys in JSON files
});

module.exports = i18n;
