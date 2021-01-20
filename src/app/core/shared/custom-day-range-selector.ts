import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangeSelectionStrategy, DateRange } from '@angular/material/datepicker';
import { GetDateRangeService } from '../services/get-date-range.service';

@Injectable()
export class CustomDayRangeSelector<D> implements MatDateRangeSelectionStrategy<D> {
  start;
  end;
  constructor(
    private dateAdapter: DateAdapter<D>,
    private dayRange: GetDateRangeService
  ) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this.createDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this.createDayRange(activeDate);
  }

  private createDayRange(date: D | null): DateRange<D> {
    if (date) {
      this.dayRange.checkRange.subscribe(
        range => {
          console.log(`Range : ${range}`);
          this.start = this.dateAdapter.addCalendarDays(date, 0);
          this.end = this.dateAdapter.addCalendarDays(date, range);
        }
      );
      return new DateRange<D>(this.start, this.end);
    }

    return new DateRange<D>(null, null);
  }
}
