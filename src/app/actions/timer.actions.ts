import { createAction, props } from '@ngrx/store';

export const resetTimer = createAction('[Timer] Reset');
export const updateElapsedTime = createAction('[Timer] Update Elapsed Time', props<{ elapsedTime: number }>());
