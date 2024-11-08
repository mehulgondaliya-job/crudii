// Common moment format types
const MOMENT_FORMATS = {
  // Year Formats
  YEAR_LONG: 'YYYY', // e.g., 2024
  YEAR_SHORT: 'YY', // e.g., 24

  // Month Formats
  MONTH_FULL: 'MMMM', // e.g., September
  MONTH_SHORT: 'MMM', // e.g., Sep
  MONTH_NUMBER_LONG: 'MM', // e.g., 09
  MONTH_NUMBER_SHORT: 'M', // e.g., 9

  // Day Formats
  DAY_FULL: 'dddd', // e.g., Friday
  DAY_SHORT: 'ddd', // e.g., Fri
  DAY_MIN: 'dd', // e.g., Fr
  DAY_NUMBER_LONG: 'DD', // e.g., 06
  DAY_NUMBER_SHORT: 'D', // e.g., 6

  // Time Formats (24-hour and 12-hour)
  HOUR_24_LONG: 'HH', // e.g., 15 (24-hour format)
  HOUR_24_SHORT: 'H', // e.g., 9 (24-hour format)
  HOUR_12_LONG: 'hh', // e.g., 03 (12-hour format)
  HOUR_12_SHORT: 'h', // e.g., 3 (12-hour format)
  MINUTE_LONG: 'mm', // e.g., 07
  MINUTE_SHORT: 'm', // e.g., 7
  SECOND_LONG: 'ss', // e.g., 45
  SECOND_SHORT: 's', // e.g., 5
  MILLISECOND: 'SSS', // e.g., 123

  // AM/PM
  AM_PM_UPPER: 'A', // e.g., PM
  AM_PM_LOWER: 'a', // e.g., pm

  // Timezone Formats
  TIMEZONE_OFFSET_COLON: 'Z', // e.g., +05:00
  TIMEZONE_OFFSET_NO_COLON: 'ZZ', // e.g., +0500
  TIMEZONE_ABBREVIATION: 'z', // e.g., PST

  // Unix Timestamps
  UNIX_TIMESTAMP_SECONDS: 'X', // e.g., 1630582800
  UNIX_TIMESTAMP_MILLISECONDS: 'x', // e.g., 1630582800123

  // Date Formats (ISO 8601 and others)
  DATE_ISO: 'YYYY-MM-DD', // e.g., 2024-09-06
  DATE_ISO_FULL: 'YYYY-MM-DDTHH:mm:ssZ', // e.g., 2024-09-06T15:30:00Z
  DATE_MM_DD_YYYY: 'MM/DD/YYYY', // e.g., 09/06/2024
  DATE_M_D_YYYY: 'M/D/YYYY', // e.g., 9/6/2024

  // Localized Date Formats
  TIME_12H: 'LT', // e.g., 3:30 PM
  TIME_12H_WITH_SECONDS: 'LTS', // e.g., 3:30:25 PM
  DATE_LOCALE_SHORT: 'L', // e.g., 09/06/2024
  DATE_LOCALE_SHORT_NO_ZERO: 'l', // e.g., 9/6/2024
  DATE_FULL: 'LL', // e.g., September 6, 2024
  DATE_FULL_SHORT: 'll', // e.g., Sep 6, 2024
  DATE_TIME_FULL: 'LLL', // e.g., September 6, 2024 3:30 PM
  DATE_TIME_FULL_SHORT: 'lll', // e.g., Sep 6, 2024 3:30 PM
  DATE_DAY_TIME_FULL: 'LLLL', // e.g., Friday, September 6, 2024 3:30 PM
  DATE_DAY_TIME_FULL_SHORT: 'llll', // e.g., Fri, Sep 6, 2024 3:30 PM

  //unit
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
  HOUR: 'hour',
  MINUTES: 'minutes',
  SECONDS: 'seconds',
};

module.exports = MOMENT_FORMATS;
