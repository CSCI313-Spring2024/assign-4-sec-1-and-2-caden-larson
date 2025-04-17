import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Contact } from '../model/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="container my-5">
      <h2 class="text-center text-primary mb-4">{{ title() }}</h2>

      <form (ngSubmit)="onSubmit()">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              [(ngModel)]="name"
              name="name"
              placeholder="Enter Name"
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              [(ngModel)]="phone"
              name="phone"
              placeholder="Enter Phone"
            />
          </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary">Save</button>
          <a routerLink="/" class="btn btn-secondary">Cancel</a>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
      }
    `,
  ],
})
export class ContactFormComponent {
  title = input<string>('');
  contact = input<Contact>();

  name = linkedSignal(() => this.contact()?.name ?? '');
  email = linkedSignal(() => this.contact()?.email ?? '');
  phone = linkedSignal(() => this.contact()?.phone ?? '');

  save = output<Contact>();

  onSubmit() {
    this.save.emit({
      id: this.contact()?.id ?? '',
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
  }
}
