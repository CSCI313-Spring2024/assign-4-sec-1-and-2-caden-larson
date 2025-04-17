import {
  Component,
  input,
  inject,
  resource,
  computed,
  signal,
} from '@angular/core';
import { ContactFormComponent } from './contact-form.component';
import { ApiService } from '../services/api.service';
import { Contact } from '../model/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <div class="container my-5">
      <h2 class="text-center text-primary mb-4">Edit Contact</h2>

      @if (loading()) {
        <div class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      }

      @if (contactResource.value(); as contact) {
        <app-contact-form
          title="Edit Contact"
          [contact]="contact"
          (save)="updateContact($event)"
        />
      }
    </div>
  `,
})
export class EditContactComponent {
  id = input.required<string>();
  private router = inject(Router);
  private apiService = inject(ApiService);

  saving = signal(false);

  loading = computed(() => this.contactResource.isLoading() || this.saving());

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id),
  });

  async updateContact(contact: Contact) {
    this.saving.set(true);
    await this.apiService.updateContact(contact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
