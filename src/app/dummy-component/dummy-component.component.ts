import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFormattedElapsedTime } from '../selectors/timer.selector';
import { CommonModule } from '@angular/common';
import { resetTimer } from '../actions/timer.actions';

@Component({
  selector: 'app-dummy-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dummy-component.component.html',
  styleUrl: './dummy-component.component.css'
})
export class DummyComponent {
  formattedElapsedTime$ = this.store.select(selectFormattedElapsedTime);


  constructor(private store: Store) {}

  resetTimer(): void {
    this.store.dispatch(resetTimer());
  }
}
