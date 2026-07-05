import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  it('should create the app', () => {
    const app = createApp();
    expect(app).toBeTruthy();
  });

  it('should initialize the empty-state view when no reference exists', () => {
    const app = createApp();

    app.ngOnInit();

    expect((app as unknown as { showSetup: () => boolean }).showSetup()).toBe(true);
    expect((app as unknown as { calendarDays: () => Array<unknown> }).calendarDays().length).toBeGreaterThan(0);
  });
});

function createApp(): App {
  const cycleService = {
    currentCycleDay: signal('Rest'),
    currentReference: signal(null),
    selectedMonth: signal(new Date('2026-07-01T00:00:00.000Z')),
    initializeFromStorage: vi.fn().mockReturnValue(null),
    setReference: vi.fn(),
    getCycleDayForDate: vi.fn().mockReturnValue('Rest'),
    getTodayCycleDay: vi.fn().mockReturnValue('Rest')
  };

  return new App(cycleService as never, {} as never);
}
