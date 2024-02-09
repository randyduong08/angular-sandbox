import { createReducer, on } from '@ngrx/store';
import * as TimerActions from '../actions/timer.actions'

export interface TimerState {
  startTime: number;
  elapsedTime: number;
}

export const initialState: TimerState = {
  startTime: Date.now(),
  elapsedTime: 0,
};

export const timerReducer = createReducer(
  initialState,
  on(TimerActions.resetTimer, (state) => ({ ...state, startTime: Date.now(), elapsedTime: 0 })),
  on(TimerActions.updateElapsedTime, (state, { elapsedTime }) => ({ ...state, elapsedTime })),
);