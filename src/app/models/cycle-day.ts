export type CycleDay = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'Rest1' | 'Rest2' | 'Rest3';

export interface CycleReference {
  referenceDate: string;
  referenceCycleIndex: number;
}

export interface CalendarCell {
  date: Date;
  dayLabel: string;
  cycleDay: CycleDay;
  isToday: boolean;
  isCurrentMonth: boolean;
}
