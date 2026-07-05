import { describe, expect, it } from 'vitest';
import { buildCalendarCells, formatMonthLabel, getMonthDays, isSameDay } from './date.utils';

describe('date utilities', () => {
  it('returns the correct number of days for a month', () => {
    const days = getMonthDays(2026, 6);
    expect(days).toHaveLength(31);
    expect(days[0].getDate()).toBe(1);
  });

  it('builds calendar cells with padded blanks', () => {
    const cells = buildCalendarCells(2026, 6, () => 'D3');
    expect(cells[0].dayLabel).toBe('');
    expect(cells[3].dayLabel).toBe('1');
    expect(cells.at(-1)?.dayLabel).toBe('');
  });

  it('detects matching days', () => {
    expect(isSameDay(new Date('2026-07-05'), new Date('2026-07-05'))).toBe(true);
  });

  it('formats month labels', () => {
    expect(formatMonthLabel(new Date('2026-07-01'))).toBe('July 2026');
  });
});
