import { Component, computed, OnInit, signal } from '@angular/core';
import { CalendarDayComponent } from './components/calendar-day/calendar-day';
import { MonthHeaderComponent } from './components/month-header/month-header';
import { SetupDialogComponent } from './components/setup-dialog/setup-dialog';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog';
import { TodayCardComponent } from './components/today-card/today-card';
import { CycleService } from './services/cycle.service';
import { StorageService } from './services/storage.service';
import { type CalendarCell, type CycleDay } from './models/cycle-day';
import { buildCalendarCells, formatMonthLabel } from './utils/date.utils';

@Component({
  selector: 'app-root',
  imports: [TodayCardComponent, MonthHeaderComponent, CalendarDayComponent, SetupDialogComponent, SettingsDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('SplitCycle');
  protected readonly currentMonth = signal(new Date());
  protected readonly showSetup = signal(true);
  protected readonly showSettings = signal(false);
  protected readonly selectedCycleDay = signal<CycleDay>('D1');
  protected readonly calendarDays = signal<CalendarCell[]>([]);
  protected readonly todayLabel = computed(() => formatMonthLabel(this.currentMonth()));
  protected readonly todayCycleDay = computed(() => this.cycleService.getTodayCycleDay(new Date()));

  constructor(
    private readonly cycleService: CycleService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    const reference = this.cycleService.initializeFromStorage();
    if (reference) {
      this.showSetup.set(false);
      this.selectedCycleDay.set(this.cycleService.currentCycleDay());
    } else {
      this.showSetup.set(true);
    }

    this.currentMonth.set(this.cycleService.selectedMonth());
    this.refreshCalendar();
  }

  protected onSelectCycleDay(day: CycleDay): void {
    const referenceDate = new Date();
    this.cycleService.setReference(referenceDate, day);
    this.selectedCycleDay.set(day);
    this.showSetup.set(false);
    this.currentMonth.set(referenceDate);
    this.refreshCalendar();
  }

  protected openSettings(): void {
    this.showSettings.set(true);
  }

  protected closeSettings(): void {
    this.showSettings.set(false);
  }

  protected onSaveSettings(day: CycleDay): void {
    this.cycleService.setReference(new Date(), day);
    this.selectedCycleDay.set(day);
    this.showSettings.set(false);
    this.currentMonth.set(new Date());
    this.refreshCalendar();
  }

  protected previousMonth(): void {
    const current = this.currentMonth();
    this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    this.refreshCalendar();
  }

  protected nextMonth(): void {
    const current = this.currentMonth();
    this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    this.refreshCalendar();
  }

  private refreshCalendar(): void {
    const monthDate = this.currentMonth();
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const cells = buildCalendarCells(year, month, (date) =>
      this.cycleService.getCycleDayForDate(new Date(this.cycleService.currentReference()?.referenceDate ?? new Date()), date)
    );

    this.calendarDays.set(cells);
    this.cycleService.selectedMonth.set(monthDate);
  }
}
