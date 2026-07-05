import { Component, input, output, signal } from '@angular/core';
import { type CycleDay } from '../../models/cycle-day';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  template: `
    <div class="dialog-backdrop">
      <div class="dialog-card">
        <div class="dialog-head">
          <h2>Change reference day</h2>
          <button type="button" class="ghost" (click)="close.emit()">Close</button>
        </div>
        <p>Choose the day that matches today in your cycle.</p>
        <div class="options">
          @for (option of options; track option) {
            <button type="button" class="option" [class.active]="selectedValue() === option" (click)="selectedValue.set(option)">{{ option }}</button>
          }
        </div>
        <button type="button" class="save" (click)="save.emit(selectedValue())">Save</button>
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

      .dialog-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      h2 {
        margin: 0;
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
        margin-bottom: 1rem;
      }

      .option, .save, .ghost {
        border: none;
        border-radius: 999px;
        padding: 0.8rem 0.95rem;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }

      .option {
        background: rgba(255,255,255,0.08);
      }

      .option.active {
        background: #2563eb;
      }

      .save {
        width: 100%;
        background: #10b981;
      }

      .ghost {
        background: transparent;
        padding: 0;
      }
    `
  ]
})
export class SettingsDialogComponent {
  readonly options: CycleDay[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'Rest1', 'Rest2', 'Rest3'];
  readonly selected = input<CycleDay>('D1');
  readonly save = output<CycleDay>();
  readonly close = output<void>();

  protected readonly selectedValue = signal<CycleDay>('D1');

  ngOnInit(): void {
    this.selectedValue.set(this.selected());
  }
}
