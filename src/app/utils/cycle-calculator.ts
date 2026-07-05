import { type CycleDay, type CycleReference } from '../models/cycle-day';

export const CYCLE_SEQUENCE: CycleDay[] = ['D1', 'D2', 'Rest1', 'D3', 'Rest2', 'D4', 'D5', 'Rest3'];

export function getCycleIndex(cycleDay: CycleDay): number {
  const index = CYCLE_SEQUENCE.indexOf(cycleDay);
  if (index === -1) {
    throw new Error(`Unsupported cycle day: ${cycleDay}`);
  }
  return index;
}

export function calculateCycleDay(referenceDate: Date, referenceCycleIndex: number, targetDate: Date): CycleDay {
  const normalizedReference = new Date(referenceDate);
  const normalizedTarget = new Date(targetDate);
  normalizedReference.setHours(0, 0, 0, 0);
  normalizedTarget.setHours(0, 0, 0, 0);

  const dayDiff = Math.floor((normalizedTarget.getTime() - normalizedReference.getTime()) / 86400000);
  const effectiveIndex = (referenceCycleIndex + dayDiff) % CYCLE_SEQUENCE.length;
  const normalizedIndex = (effectiveIndex + CYCLE_SEQUENCE.length) % CYCLE_SEQUENCE.length;
  return CYCLE_SEQUENCE[normalizedIndex];
}

export function createReferenceFromDate(referenceDate: Date, cycleDay: CycleDay): CycleReference {
  return {
    referenceDate: referenceDate.toISOString(),
    referenceCycleIndex: getCycleIndex(cycleDay)
  };
}

export function getCycleType(cycleDay: CycleDay): 'workout' | 'rest' {
  return cycleDay.startsWith('Rest') ? 'rest' : 'workout';
}
