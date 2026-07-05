import { Component, output, signal } from '@angular/core';
import { type CycleDay } from '../../models/cycle-day';

@Component({
  selector: 'app-setup-dialog',
  standalone: true,
  template: `
    <div class="dialog-backdrop">
      <div class="dialog-card">
        <h2>What is today in your workout cycle?</h2>
        <p>Select the day that matches today.</p>
        <div class="options">
          @for (option of options; track option) {
            <button type="button" class="option" (click)="select(option)">{{ option }}</button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(3, 7, 18, 0.78);
        display: grid;
        place-items: center;
        padding: 1rem;
        z-index: 30;
      }

      .dialog-card {
        width: min(100%, 480px);
        border-radius: 24px;
        background: #111827;
        border: 1px solid rgba(255,255,255,0.1);
        padding: 1.25rem;
        box-shadow: 0 20px 50px rgba(0,0,0,0.35);
      }

      h2 {
        margin: 0 0 0.5rem;
        color: white;
      }

      p {
        margin: 0 0 1rem;
        color: #d1d5db;
      }

      .options {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.7rem;
      }

      .option {
        border: none;
        border-radius: 999px;
        padding: 0.8rem 0.95rem;
        background: rgba(255,255,255,0.08);
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
    `
  ]
})
export class SetupDialogComponent {
  readonly options: CycleDay[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'Rest1', 'Rest2', 'Rest3'];
  readonly selected = output<CycleDay>();

  select(option: CycleDay): void {
    this.selected.emit(option);
  }
}
