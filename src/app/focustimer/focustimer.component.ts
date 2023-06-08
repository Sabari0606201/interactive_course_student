import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-focustimer',
  templateUrl: './focustimer.component.html',
  styleUrls: ['./focustimer.component.css']
})
export class FocustimerComponent {

  minutes: number = 0;
  seconds: number = 0;
  isPaused: boolean = true;
  interval: any;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer() {
    if (!this.isPaused) {
      return;
    }

    this.isPaused = false;
    let totalSeconds = (this.minutes * 60) + this.seconds;
    let interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        this.minutes = Math.floor(totalSeconds / 60);
        this.seconds = totalSeconds % 60;
      } else {

        clearInterval(interval);
        alert('Time is up! ' + ' Take some Rest..');


      }
    }, 1000);
    this.interval = interval;
  }

  pauseTimer() {
    this.isPaused = true;
    clearInterval(this.interval);
  }

  resetTimer() {
    this.minutes = 0;
    this.seconds = 0;
    this.isPaused = true;
    clearInterval(this.interval);
  }





}

