import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor() { }

  private sugg: any;
  private number: any;

  setsugg(sugg: any, number: any): void {
    this.sugg = sugg;
    this.number = number;
  }
  getsugg(): any {
    return {
      sugg: this.sugg,
      num: this.number
    };
  }
}