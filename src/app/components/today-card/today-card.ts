import { Component, input } from '@angular/core';
import { type CycleDay } from '../../models/cycle-day';
import { getCycleType } from '../../utils/cycle-calculator';

@Component({
  selector: 'app-today-card',
  standalone: true,
  template: `
    <section class="today-card" [class.is-rest]="getCycleType(cycleDay()) === 'rest'">
      <p class="eyebrow">Today's Workout</p>
      <h2>{{ cycleDay() }}</h2>
      <p class="status">{{ getCycleType(cycleDay()) === 'rest' ? 'Rest Day' : 'Workout Day' }}</p>
    </section>
  `,
  styles: [
    `
      .today-card {
        border-radius: 24px;
        padding: 1.1rem;
        background: linear-gradient(140deg, rgba(59,130,246,0.24), rgba(17,24,39,0.92));
        border: 1px solid rgba(96,165,250,0.26);
        margin-bottom: 1rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.22);
      }

      .today-card.is-rest {
        background: linear-gradient(140deg, rgba(107,114,128,0.24), rgba(17,24,39,0.92));
        border-color: rgba(156,163,175,0.22);
      }

      .eyebrow {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #93c5fd;
      }

      h2 {
        margin: 0.3rem 0;
        font-size: 1.5rem;
        color: white;
      }

      .status {
        color: #d1d5db;
      }
    `
  ]
})
export class TodayCardComponent {
  readonly cycleDay = input.required<CycleDay>();

  protected readonly getCycleType = getCycleType;
}
