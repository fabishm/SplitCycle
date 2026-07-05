import { Injectable, signal } from '@angular/core';
import { type CycleDay, type CycleReference } from '../models/cycle-day';
import { calculateCycleDay, createReferenceFromDate } from '../utils/cycle-calculator';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CycleService {
  readonly currentCycleDay = signal<CycleDay>('Rest1');
  readonly currentReference = signal<CycleReference | null>(null);
  readonly selectedMonth = signal(new Date());

  constructor(private readonly storage: StorageService) {}

  initializeFromStorage(): CycleReference | null {
    const reference = this.storage.loadReference();
    if (reference) {
      this.currentReference.set(reference);
      this.currentCycleDay.set(this.getCycleDayForDate(new Date(reference.referenceDate), new Date(reference.referenceDate)));
      this.selectedMonth.set(new Date(reference.referenceDate));
    }
    return reference;
  }

  setReference(date: Date, cycleDay: CycleDay): CycleReference {
    const reference = createReferenceFromDate(date, cycleDay);
    this.storage.saveReference(reference);
    this.currentReference.set(reference);
    this.currentCycleDay.set(cycleDay);
    this.selectedMonth.set(date);
    return reference;
  }

  getCycleDayForDate(referenceDate: Date, targetDate: Date): CycleDay {
    const reference = this.currentReference();
    if (!reference) {
      return 'Rest1';
    }
    return calculateCycleDay(new Date(reference.referenceDate), reference.referenceCycleIndex, targetDate);
  }

  getTodayCycleDay(today: Date): CycleDay {
    const reference = this.currentReference();
    if (!reference) {
      return 'Rest1';
    }
    return calculateCycleDay(new Date(reference.referenceDate), reference.referenceCycleIndex, today);
  }

  getCurrentMonthDays(): Date[] {
    const monthDate = this.selectedMonth();
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const days = [] as Date[];
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day += 1) {
      days.push(new Date(year, month, day));
    }
    return days;
  }
}
