import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }
  private status: any;

  getstatus(status: any) {
    this.status = status;

  }

  setstatus(): any {

    return this.status;
  }


  private buttonClickSubject = new Subject<void>();
  buttonClick$ = this.buttonClickSubject.asObservable();

  emitButtonClick() {
    this.buttonClickSubject.next();

  }

}
