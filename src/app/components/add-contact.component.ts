import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from './contact-form.component';
import { Contact } from '../model/contact.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <div class="container my-5">
      <app-contact-form title="Add Contact" (save)="addContact($event)" />

      <div *ngIf="saving()" class="text-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Saving...</span>
        </div>
        <p class="mt-2">Saving...</p>
      </div>
    </div>
  `,
})
export class AddContactComponent {
  private router = inject(Router);
  private api = inject(ApiService);

  saving = signal(false);

  async addContact(newContact: Contact) {
    this.saving.set(true);
    await this.api.addContact(newContact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
