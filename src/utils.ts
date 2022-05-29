import { DayData } from "./types";

enum MonthName {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

const isLeapYear = (year: number): boolean => {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

const getDayOfWeek = (date: Date): number => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

const getMonthDays = (year: number, month: number): number => {
  const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === MonthName.February) {
    return isLeapYear(year) ? 29 : 28;
  } else {
    return dayInMonth[month]
  }
}

const compareDates = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) {
    return false;
  }
  return (date1.getDate() === date2.getDate() && (date1.getMonth() === date2.getMonth()) && (date1.getFullYear() === date2.getFullYear()));
};

const getMonthTable = (year: number, month: number, hours: number, minutes: number):DayData[][] => {
  const monthDays = getMonthDays(year, month);
  const result: DayData[][] = [];

  let weekNum = 0;
  let day = 1;

  while (day <= monthDays) {
    result.push([]);

    for (let i = 0; i < 7; i++) {
      const date = new Date(year, month, day, hours, minutes);
      const dayOfWeek = getDayOfWeek(date);
      if (dayOfWeek === i) {
        result[weekNum].push({day: date, isThisMonth: day > monthDays ? false : true});
        day++;
      } else {
        result[weekNum].push({day: new Date(year, month,  i - dayOfWeek + 1), isThisMonth: false});
      }
    }
    weekNum++;
  }
  return result;
}

const getYearsTable = (year: number) => {
  const result = [];
  for (let i = year - 7; i <= year + 7; i++) {
    result.push(i);
  }
  return result;
}

const addZero = (digit: number) => digit < 10 ? "0" + digit : digit;

const getIndexByHours = (hours: number, minutes: number) => {
  return hours * 2 + (minutes ? 1 : 0);
}

const getHoursByIndex = (index: number) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 ? 30 : 0
  return [hours, minutes];
}

const getHoursTable = () => {
  return new Array(48).fill(0).map((it, index) => {
    const time = getHoursByIndex(index);
    const hour = time[0] < 10 ? addZero(time[0]) : time[0];
    return `${hour}:${time[1] ? "30" : "00"}`;
  });
}

export {MonthName, getMonthTable, isLeapYear, getMonthDays, compareDates, getYearsTable, addZero, getIndexByHours, getHoursByIndex, getHoursTable};
