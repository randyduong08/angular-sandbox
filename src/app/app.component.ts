import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from './timer-component/timer-component.component';
import { DummyComponent } from './dummy-component/dummy-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerComponent, DummyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-sandbox';
}
