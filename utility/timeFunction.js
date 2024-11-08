const momentTimezone = require('moment-timezone');
const MOMENT_FORMATS = require('./constant/momentConstant');
const { TimeZone } = require('../config/config');
const { TIME_UNIT } = require('./constant/constantVariable');

/**
 * Get current date in a specified format and timezone
 * @param {string} format - Desired date format from MOMENT_FORMATS
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {string} - Formatted current date
 */
const getCurrentDate = (format = MOMENT_FORMATS.DATE_ISO_FULL, timezone = TimeZone) => {
  return momentTimezone.tz(timezone).format(format);
};

/**
 * Format a given date into a specified format and timezone
 * @param {Date|string} date - Date object or string
 * @param {string} format - Desired format (default is ISO format)
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {string} - Formatted date
 */
const formatDate = (date, format = MOMENT_FORMATS.DATE_ISO_FULL, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone).format(format);
};

/**
 * Parse a date string and return a moment object
 * @param {string} dateString - The date string to parse
 * @param {string} format - The format of the input date string
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {moment.Moment} - Parsed moment object
 */
const parseDate = (dateString, timezone = TimeZone) => {
  return momentTimezone.tz(dateString, timezone);
};

/**
 * Get the difference between two dates
 * @param {Date|string} startDate - The start date
 * @param {Date|string} endDate - The end date
 * @param {string} unit - Unit of time ('days', 'months', 'years', 'hours', 'minutes', etc.)
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {number} - Difference in the specified unit
 */
const getDateDifference = (startDate, endDate, unit = MOMENT_FORMATS.MINUTES, timezone = TimeZone) => {
  return momentTimezone.tz(endDate, timezone).diff(momentTimezone.tz(startDate, timezone), unit);
};

/**
 * Add a certain amount of time to a given date
 * @param {Date|string} date - The initial date
 * @param {number} amount - The amount of time to add
 * @param {string} unit - Unit of time ('days', 'months', 'years', etc.)
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {string} - New date after adding time, formatted as ISO
 */
const addTimeToDate = (date, amount, unit = MOMENT_FORMATS.MINUTES, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone).add(amount, unit).format(MOMENT_FORMATS.DATE_ISO_FULL);
};

/**
 * Get current time in a specific timezone
 * @param {string} timezone - Timezone name (e.g., 'America/Los_Angeles')
 * @param {string} format - Format to return the date in
 * @returns {string} - Formatted time in the given timezone
 */
const getCurrentTimeInTimezone = (timezone = TimeZone, format = MOMENT_FORMATS.DATE_TIME_FULL) => {
  return momentTimezone.tz(timezone).format(format);
};

/**
 * Convert date from one timezone to another
 * @param {string} date - Date string to convert
 * @param {string} fromTimezone - Original timezone
 * @param {string} toTimezone - Target timezone
 * @param {string} format - Desired output format
 * @returns {string} - Converted date in the target timezone
 */
const convertTimezone = (date, fromTimezone, toTimezone, format = MOMENT_FORMATS.DATE_TIME_FULL) => {
  return momentTimezone.tz(date, fromTimezone).tz(toTimezone).format(format);
};

/**
 * Get the Unix timestamp of a given date
 * @param {Date|string} date - Date to convert to Unix timestamp
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {number} - Unix timestamp
 */
const getUnixTimestamp = (date, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone).unix();
};

/**
 * Check if a date is valid
 * @param {string|Date} date - The date to validate
 * @param {string} format - The format to validate against
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {boolean} - True if the date is valid, false otherwise
 */
const isValidDate = (date, format = MOMENT_FORMATS.DATE_ISO_FULL, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone, format, true).isValid();
};

/**
 * Get the start of the day for a given date
 * @param {Date|string} date - Date to get the start of the day
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {string} - Start of the day in ISO format
 */
const getStartOfDay = (date, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone).startOf(MOMENT_FORMATS.DAY).format(MOMENT_FORMATS.DATE_ISO_FULL);
};

/**
 * Get the end of the day for a given date
 * @param {Date|string} date - Date to get the end of the day
 * @param {string} [timezone] - Timezone name (e.g., 'America/Los_Angeles')
 * @returns {string} - End of the day in ISO format
 */
const getEndOfDay = (date, timezone = TimeZone) => {
  return momentTimezone.tz(date, timezone).endOf(MOMENT_FORMATS.DAY).format(MOMENT_FORMATS.DATE_ISO_FULL);
};

const convertTimeToMiliSeconds = (value = 1, unit = TIME_UNIT.DAY) => {
  switch (unit.toLowerCase()) {
    case 'hour':
      return value * 60 * 60 * 1000; // Convert hours to seconds
    case 'minutes':
      return value * 60 * 1000; // Convert minutes to seconds
    case 'days':
      return value * 24 * 60 * 60 * 1000; // Convert days to seconds
    default:
      throw new Error('Invalid time unit. Please use "hours", "minutes", or "days".');
  }
};

module.exports = {
  getCurrentDate,
  formatDate,
  parseDate,
  getDateDifference,
  addTimeToDate,
  getCurrentTimeInTimezone,
  convertTimezone,
  getUnixTimestamp,
  isValidDate,
  getStartOfDay,
  getEndOfDay,
  convertTimeToMiliSeconds,
};
