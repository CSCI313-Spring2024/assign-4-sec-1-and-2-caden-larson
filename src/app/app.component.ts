import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <span class="navbar-brand">My Contacts</span>
        <button class="btn btn-outline-light" routerLink="/add">
          <i class="bi bi-plus-circle"></i> Add Contact
        </button>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .navbar {
        margin-bottom: 20px;
      }
      .btn-outline-light {
        color: #ffffff;
        border-color: #ffffff;
      }
      .btn-outline-light:hover {
        background-color: #ffffff;
        color: #000;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Angular Signals Crud';
}
