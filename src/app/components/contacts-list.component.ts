import {
  Component,
  computed,
  effect,
  inject,
  resource,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container my-5">
      <h2 class="text-center text-primary mb-4">Contact List</h2>

      <div class="list-group shadow">
        @for (contact of contactsResource.value(); track contact.id) {
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ contact.name }}</h5>
              <small class="text-muted">{{ contact.email }}</small>
            </div>
            <div class="btn-group">
              <a [routerLink]="['/edit', contact.id]" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil-fill"></i>
              </a>
              <button (click)="deleteContact(contact.id)" class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        }
      </div>

      @if (loading()) {
        <div class="text-center mt-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
  `,
})
export class ContactsListComponent {
  apiService = inject(ApiService);

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });

  deleting = signal(false);

  loading = computed(
    () => this.deleting() || this.contactsResource.isLoading()
  );

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.apiService.deleteContact(id);
    this.deleting.set(false);
    this.contactsResource.reload();
  }

  showError = effect(() => {
    const error = this.contactsResource.error() as Error;
    if (error) {
      alert(`Error: ${error.message}`);
    }
  });
}
