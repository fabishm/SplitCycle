import { type CalendarCell, type CycleDay } from '../models/cycle-day';

export function getMonthDays(year: number, month: number): Date[] {
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const days: Date[] = [];

  for (let day = 1; day <= totalDays; day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(date);
}

export function buildCalendarCells(
  year: number,
  month: number,
  getCycleDay: (date: Date) => CycleDay,
  today: Date = new Date()
): CalendarCell[] {
  const days = getMonthDays(year, month);
  const firstOfMonth = startOfMonth(new Date(year, month, 1));
  const lastOfMonth = endOfMonth(new Date(year, month, 1));
  const leadingOffset = firstOfMonth.getDay();
  const trailingOffset = (7 - ((leadingOffset + lastOfMonth.getDate()) % 7)) % 7;
  const cells: CalendarCell[] = [];

  for (let index = 0; index < leadingOffset; index += 1) {
    cells.push({
      date: new Date(year, month, index - leadingOffset + 1),
      dayLabel: '',
      cycleDay: 'Rest1',
      isToday: false,
      isCurrentMonth: false
    });
  }

  for (const date of days) {
    cells.push({
      date,
      dayLabel: String(date.getDate()),
      cycleDay: getCycleDay(date),
      isToday: isSameDay(date, today),
      isCurrentMonth: date.getMonth() === month
    });
  }

  for (let index = 0; index < trailingOffset; index += 1) {
    cells.push({
      date: new Date(year, month + 1, index + 1),
      dayLabel: '',
      cycleDay: 'Rest1',
      isToday: false,
      isCurrentMonth: false
    });
  }

  return cells;
}
