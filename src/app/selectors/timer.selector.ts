import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimerState } from '../reducers/timer.reducer';

// Selector for the timer feature state
export const selectTimerFeature = createFeatureSelector<TimerState>('timer');

// Selector for the start time
export const selectStartTime = createSelector(
  selectTimerFeature,
  (state: TimerState) => state.startTime
);

// Selector for the elapsed time
export const selectElapsedTime = createSelector(
  selectTimerFeature,
  (state: TimerState) => state.elapsedTime
);

// Selector for formatting the elapsed time (optional)
export const selectFormattedElapsedTime = createSelector(
  selectElapsedTime,
  (elapsedTime) => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return [hours, minutes, seconds].map(val => `${val}`.padStart(2, '0')).join(':');
  }
);