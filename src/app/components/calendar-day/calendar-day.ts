import { Component, input } from '@angular/core';
import { type CalendarCell } from '../../models/cycle-day';
import { getCycleType } from '../../utils/cycle-calculator';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  template: `
    <button
      class="calendar-day"
      [class.is-today]="cell().isToday"
      [class.is-rest]="getCycleType(cell().cycleDay) === 'rest'"
      [class.is-workout]="getCycleType(cell().cycleDay) === 'workout'"
      [attr.aria-label]="cell().date.toDateString()"
      type="button"
    >
      <span class="day-number">{{ cell().dayLabel }}</span>
      <span class="cycle-label">{{ cell().cycleDay }}</span>
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .calendar-day {
        width: 100%;
        min-height: 74px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.08);
        padding: 0.45rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        color: #f9fafb;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        cursor: pointer;
      }

      .calendar-day:hover {
        transform: translateY(-1px);
        border-color: rgba(96, 165, 250, 0.45);
      }

      .day-number {
        font-size: 0.8rem;
        font-weight: 700;
      }

      .cycle-label {
        font-size: 0.8rem;
        font-weight: 600;
      }

      .is-workout {
        background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(37,99,235,0.32));
      }

      .is-rest {
        background: rgba(107,114,128,0.22);
      }

      .is-today {
        box-shadow: inset 0 0 0 2px #34d399;
      }
    `
  ]
})
export class CalendarDayComponent {
  readonly cell = input.required<CalendarCell>();

  protected readonly getCycleType = getCycleType;
}
