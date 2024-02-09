import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, effect, WritableSignal } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { Store, select } from '@ngrx/store';

// comparing 3 different timer implementations:
// - simple counter implementation
// - calculation using Date().getTime()
// - implementation using rxJS
// - implementation using signals

@Component({
  selector: 'app-timer-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer-component.component.html',
  styleUrl: './timer-component.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {

  oldTimer : number = 0;
  second: number = 1;
  updateInterval: number = 1000;
  intervalId: NodeJS.Timeout | undefined;
  newIntervalId: NodeJS.Timeout | undefined;
  startTime: number = 0;
  newTimer : number = 0;
  rxjsStartTime : number = 0;
  elapsedTime$!: Observable<string>;
  signalIntervalId: NodeJS.Timeout | undefined;
  signalStartTime: WritableSignal<number> = signal(Date.now());
  signalElapsedtime: WritableSignal<number> = signal(0);
  signalTimerFormat: WritableSignal<string> = signal('00:00:00');

  ngOnInit(): void {
    this.startTime = new Date().getTime();
    console.log('start init');
    this.newIntervalId = setInterval(() => this.updateNewTime(), this.updateInterval);
    this.intervalId = setInterval(() => this.updateOldtimer(), this.updateInterval);
    this.signalIntervalId = setInterval(() => this.updateSignalTime(), this.updateInterval);
    console.log('finish init');
    this.startTimer();
  }

  ngOnDestroy(): void {
      if (this.intervalId)
      {
        clearInterval(this.intervalId);
      }
      if (this.newIntervalId)
      {
        clearInterval(this.newIntervalId);
      }
      if (this.signalIntervalId)
      {
        clearInterval(this.signalIntervalId);
      }
  }

  resetTimes(): void {
    this.signalStartTime.set(Date.now());
    this.rxjsStartTime = new Date().getTime();
    this.startTime = new Date().getTime();
    this.oldTimer = 0;
  }

  updateSignalTime(): void { 
    this.signalElapsedtime.set( Math.floor((Date.now() - this.signalStartTime()) / 1000));
    this.signalTimerFormat.set ( this.formatTime(this.signalElapsedtime()));
  }

  updateOldtimer(): void {
    this.oldTimer += this.second;
  }

  updateNewTime(): void {
    this.newTimer = Math.floor((new Date().getTime() - this.startTime) / 1000);
  }

  startTimer(): void {
    this.rxjsStartTime = new Date().getTime();

    this.elapsedTime$ = interval(1000).pipe(
      startWith(0),
      map(() => {
        const currentTime = new Date().getTime();
        const elapsedSeconds = Math.floor((currentTime - this.rxjsStartTime) / 1000);
        return this.formatTime(elapsedSeconds);
      })
    )
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
}
