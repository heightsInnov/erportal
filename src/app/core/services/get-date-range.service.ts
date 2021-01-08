import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDateRangeService {

  dayRange = new BehaviorSubject(0);
  checkRange = this.dayRange.asObservable();

  constructor() { }

  changeRange(range: number) {
    this.dayRange.next(range);
  }

}
