import { Injectable, signal } from '@angular/core';
import { type CycleReference } from '../models/cycle-day';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storageKey = 'splitcycle-reference';
  readonly hasReference = signal(false);

  loadReference(): CycleReference | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const saved = window.localStorage.getItem(this.storageKey);
    if (!saved) {
      this.hasReference.set(false);
      return null;
    }

    try {
      const parsed = JSON.parse(saved) as CycleReference;
      this.hasReference.set(Boolean(parsed.referenceDate && parsed.referenceCycleIndex >= 0));
      return parsed;
    } catch {
      this.hasReference.set(false);
      return null;
    }
  }

  saveReference(reference: CycleReference): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(reference));
    this.hasReference.set(true);
  }

  clearReference(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(this.storageKey);
    this.hasReference.set(false);
  }
}
