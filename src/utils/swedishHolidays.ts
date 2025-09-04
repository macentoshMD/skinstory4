import { addDays, format, getYear, setMonth, setDate } from "date-fns";

export interface Holiday {
  date: Date;
  name: string;
}

/**
 * Calculate Easter Sunday for a given year using the algorithm
 */
function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month - 1, day);
}

/**
 * Get all Swedish public holidays (red days) for a given year
 */
export function getSwedishHolidays(year: number): Date[] {
  const holidays: Date[] = [];
  
  // Fixed holidays
  holidays.push(new Date(year, 0, 1));   // Nyårsdagen
  holidays.push(new Date(year, 0, 6));   // Trettondedag jul
  holidays.push(new Date(year, 4, 1));   // Första maj
  holidays.push(new Date(year, 5, 6));   // Nationaldagen
  holidays.push(new Date(year, 11, 24)); // Julafton
  holidays.push(new Date(year, 11, 25)); // Juldagen
  holidays.push(new Date(year, 11, 26)); // Annandag jul
  holidays.push(new Date(year, 11, 31)); // Nyårsafton
  
  // Easter-dependent holidays
  const easter = calculateEaster(year);
  holidays.push(addDays(easter, -2));    // Långfredagen
  holidays.push(easter);                 // Påskdagen
  holidays.push(addDays(easter, 1));     // Annandag påsk
  holidays.push(addDays(easter, 39));    // Kristi himmelfärdsdag
  holidays.push(addDays(easter, 49));    // Pingstdagen
  
  // Midsummer (Saturday between June 20-26)
  const june20 = new Date(year, 5, 20);
  let midsummer = june20;
  while (midsummer.getDay() !== 6) {
    midsummer = addDays(midsummer, 1);
  }
  holidays.push(midsummer);
  
  // All Saints' Day (Saturday between October 31 - November 6)
  const oct31 = new Date(year, 9, 31);
  let allSaints = oct31;
  while (allSaints.getDay() !== 6) {
    allSaints = addDays(allSaints, 1);
  }
  holidays.push(allSaints);
  
  return holidays;
}

/**
 * Get all Swedish public holidays with names for a given year
 */
export function getSwedishHolidaysWithNames(year: number): Holiday[] {
  const holidays: Holiday[] = [];
  
  // Fixed holidays
  holidays.push({ date: new Date(year, 0, 1), name: "Nyårsdagen" });
  holidays.push({ date: new Date(year, 0, 6), name: "Trettondedag jul" });
  holidays.push({ date: new Date(year, 4, 1), name: "Första maj" });
  holidays.push({ date: new Date(year, 5, 6), name: "Nationaldagen" });
  holidays.push({ date: new Date(year, 11, 24), name: "Julafton" });
  holidays.push({ date: new Date(year, 11, 25), name: "Juldagen" });
  holidays.push({ date: new Date(year, 11, 26), name: "Annandag jul" });
  holidays.push({ date: new Date(year, 11, 31), name: "Nyårsafton" });
  
  // Easter-dependent holidays
  const easter = calculateEaster(year);
  holidays.push({ date: addDays(easter, -3), name: "Skärtorsdag" });
  holidays.push({ date: addDays(easter, -2), name: "Långfredagen" });
  holidays.push({ date: easter, name: "Påskdagen" });
  holidays.push({ date: addDays(easter, 1), name: "Annandag påsk" });
  holidays.push({ date: addDays(easter, 39), name: "Kristi himmelfärdsdag" });
  holidays.push({ date: addDays(easter, 49), name: "Pingstdagen" });
  
  // Midsummer (Saturday between June 20-26)
  const june20 = new Date(year, 5, 20);
  let midsummer = june20;
  while (midsummer.getDay() !== 6) {
    midsummer = addDays(midsummer, 1);
  }
  holidays.push({ date: midsummer, name: "Midsommarafton" });
  
  // All Saints' Day (Saturday between October 31 - November 6)
  const oct31 = new Date(year, 9, 31);
  let allSaints = oct31;
  while (allSaints.getDay() !== 6) {
    allSaints = addDays(allSaints, 1);
  }
  holidays.push({ date: allSaints, name: "Alla helgons dag" });
  
  return holidays;
}

/**
 * Check if a given date is a Swedish public holiday (red day)
 */
export function isSwedishHoliday(date: Date): boolean {
  const year = getYear(date);
  const holidays = getSwedishHolidays(year);
  const dateString = format(date, 'yyyy-MM-dd');
  
  return holidays.some(holiday => format(holiday, 'yyyy-MM-dd') === dateString);
}

/**
 * Get the name of a Swedish holiday for a given date
 */
export function getSwedishHolidayName(date: Date): string | null {
  const year = getYear(date);
  const holidays = getSwedishHolidaysWithNames(year);
  const dateString = format(date, 'yyyy-MM-dd');
  
  const holiday = holidays.find(holiday => format(holiday.date, 'yyyy-MM-dd') === dateString);
  return holiday ? holiday.name : null;
}

/**
 * Check if a date is a red day (holiday or weekend)
 */
export function isRedDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6 || isSwedishHoliday(date);
}

/**
 * Get red day info (name and type)
 */
export function getRedDayInfo(date: Date): { isRedDay: boolean; name: string | null; type: 'weekend' | 'holiday' | null } {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const holidayName = getSwedishHolidayName(date);
  
  if (holidayName) {
    return { isRedDay: true, name: holidayName, type: 'holiday' };
  }
  
  if (isWeekend) {
    const weekendName = dayOfWeek === 0 ? 'Söndag' : 'Lördag';
    return { isRedDay: true, name: weekendName, type: 'weekend' };
  }
  
  return { isRedDay: false, name: null, type: null };
}