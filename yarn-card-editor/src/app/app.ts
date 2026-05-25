import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root component — lean shell with router-outlet only.
 * All layout and navigation logic lives in LayoutComponent.
 * Card set management lives in SetSelectorComponent (route: /sets).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet />`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `],
})
export class App {}
