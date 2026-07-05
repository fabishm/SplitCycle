import { beforeEach, describe, expect, it } from 'vitest';
import { StorageService } from './storage.service';

describe('storage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads null when nothing is saved', () => {
    const service = new StorageService();
    expect(service.loadReference()).toBeNull();
  });

  it('persists and restores cycle references', () => {
    const service = new StorageService();
    service.saveReference({ referenceDate: '2026-07-05T00:00:00.000Z', referenceCycleIndex: 3 });
    expect(service.loadReference()).toEqual({ referenceDate: '2026-07-05T00:00:00.000Z', referenceCycleIndex: 3 });
  });
});
