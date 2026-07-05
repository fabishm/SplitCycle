import { describe, expect, it } from 'vitest';
import { CycleService } from './cycle.service';
import { StorageService } from './storage.service';

describe('cycle service', () => {
  it('returns a fallback cycle day when no reference is stored', () => {
    const service = new CycleService(new StorageService());
    expect(service.getCycleDayForDate(new Date('2026-07-05T00:00:00.000Z'), new Date('2026-07-05T00:00:00.000Z'))).toBe('Rest1');
  });

  it('uses the stored reference to calculate the current cycle day', () => {
    const storage = new StorageService();
    const service = new CycleService(storage);
    service.setReference(new Date('2026-07-05T00:00:00.000Z'), 'D3');
    expect(service.getTodayCycleDay(new Date('2026-07-06T00:00:00.000Z'))).toBe('Rest2');
  });
});
