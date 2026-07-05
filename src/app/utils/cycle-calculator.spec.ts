import { describe, expect, it } from 'vitest';
import { calculateCycleDay, CYCLE_SEQUENCE, getCycleIndex, getCycleType } from './cycle-calculator';

describe('cycle calculator', () => {
  it('maps cycle labels to stable indexes', () => {
    expect(getCycleIndex('D1')).toBe(0);
    expect(getCycleIndex('Rest1')).toBe(2);
    expect(getCycleIndex('Rest2')).toBe(4);
    expect(getCycleIndex('Rest3')).toBe(7);
  });

  it('calculates forward days from the reference point', () => {
    const referenceDate = new Date('2026-07-05T00:00:00.000Z');
    const targetDate = new Date('2026-07-06T00:00:00.000Z');
    expect(calculateCycleDay(referenceDate, getCycleIndex('D3'), targetDate)).toBe('Rest2');
  });

  it('keeps the sequence deterministic', () => {
    expect(CYCLE_SEQUENCE).toEqual(['D1', 'D2', 'Rest1', 'D3', 'Rest2', 'D4', 'D5', 'Rest3']);
  });

  it('calculates the next rest phase from a selected rest day', () => {
    const referenceDate = new Date('2026-07-05T00:00:00.000Z');
    const targetDate = new Date('2026-07-07T00:00:00.000Z');
    expect(calculateCycleDay(referenceDate, getCycleIndex('Rest1'), targetDate)).toBe('Rest2');
  });

  it('classifies workout and rest days', () => {
    expect(getCycleType('D4')).toBe('workout');
    expect(getCycleType('Rest2')).toBe('rest');
  });
});
