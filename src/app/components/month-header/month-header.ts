import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-month-header',
  standalone: true,
  template: `
    <div class="month-header">
      <button type="button" class="icon-button" (click)="previousMonth.emit()">←</button>
      <div class="month-title">{{ label() }}</div>
      <button type="button" class="icon-button" (click)="nextMonth.emit()">→</button>
    </div>
  `,
  styles: [
    `
      .month-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .month-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: #f9fafb;
      }

      .icon-button {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        color: white;
        border: none;
        cursor: pointer;
      }
    `
  ]
})
export class MonthHeaderComponent {
  readonly label = input.required<string>();
  readonly previousMonth = output<void>();
  readonly nextMonth = output<void>();
}
