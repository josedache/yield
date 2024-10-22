/**
 *
 * @param {Date | string | number} to
 * @param {Date | string | number} from
 */
export function countdown(
  to: Date | string | number,
  from?: Date | string | number
) {
  const oneSecondInMilli = 1000,
    oneMinuteInMilli = oneSecondInMilli * 60,
    oneHourInMilli = oneMinuteInMilli * 60,
    oneDayInMilli = oneHourInMilli * 24;

  from = from ? new Date(from) : new Date();
  to = new Date(to);

  const fromTime = from.getTime(),
    toTime = to.getTime(),
    distance = toTime - fromTime;

  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (distance > 0) {
    days = Math.max(0, Math.floor(distance / oneDayInMilli));
    hours = Math.max(
      0,
      Math.floor((distance % oneDayInMilli) / oneHourInMilli)
    );
    minutes = Math.max(
      0,
      Math.floor((distance % oneHourInMilli) / oneMinuteInMilli)
    );
    seconds = Math.max(
      0,
      Math.floor((distance % oneMinuteInMilli) / oneSecondInMilli)
    );
  }

  return { days, hours, minutes, seconds };
}

export const dateMonths = [
  undefined,
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * format stringified number which length is less than 10 to DD e.g 02.
 * @param {number} number
 * @returns
 */
function formatNumberToDD(number) {
  const suffix = "0";
  let numberStr = number.toString();
  if (numberStr.length === 1) {
    numberStr = suffix.concat(numberStr);
  }
  return numberStr;
}

/**
 *
 * @param {Array} date
 * @returns
 */
export const parseDateToString = (date) => {
  const year = date?.[0] || "";
  const month = dateMonths[date?.[1]] || "";
  const day = date?.[2] || "";

  const separator = Array.isArray(date) && date.length ? " " : "";
  const newDate =
    formatNumberToDD(day) +
    separator +
    formatNumberToDD(month) +
    separator +
    year;

  return newDate || null;
};

export const parseDate = (date) => {
  const year = date?.[0] || "";
  const month = dateMonths[date?.[1]] || "";
  const day = date?.[2] || "";

  const separator = Array.isArray(date) && date.length ? " " : "";
  const newDate = new Date(day + separator + month + separator + year);
  return newDate || null;
};

import { parseISO, isValid, format } from "date-fns";

/**
 * Check for date validity
 * @param {Date} date // Date in iso
 * @returns
 */
export const isValidDate = (date) => {
  const parsed = parseISO(date);
  if (isValid(parsed)) {
    return format(parsed, "dd/MM/yyyy");
  }
  return null;
};

export const getDateFromTimestamp = (date) => {
  if (!date || date.length < 3) {
    return "_";
  }

  const [year, month, day, hours, minutes] = date;
  const dateObj = new Date(year, month - 1, day, hours || 0, minutes || 0);

  return format(dateObj, "yyyy-MM-dd 'at' HH:mm");
};
