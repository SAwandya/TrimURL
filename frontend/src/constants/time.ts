export const TIME_CONSTANTS = {
  ONE_HOUR: 3600000,
  ONE_DAY: 86400000,
  THREE_DAYS: 259200000,
  ONE_WEEK: 604800000,
  THIRTY_DAYS: 2592000000,
};

export const TIME_OPTIONS = [
  { value: TIME_CONSTANTS.ONE_HOUR, label: "1 hour" },
  { value: TIME_CONSTANTS.ONE_DAY, label: "24 hours" },
  { value: TIME_CONSTANTS.THREE_DAYS, label: "3 days" },
  { value: TIME_CONSTANTS.ONE_WEEK, label: "7 days" },
  { value: TIME_CONSTANTS.THIRTY_DAYS, label: "30 days" },
];
