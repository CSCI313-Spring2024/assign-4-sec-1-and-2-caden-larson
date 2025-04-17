//
// 
// Interesting, but I'm not using the delay because it frusterated me to wait
//
//
import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private delay = 0; // Simulate network delay but i don't want this - Caden
  private contacts: Contact[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john.smith@email.com',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '555-234-5678',
      email: 'sarah.j@email.com',
    },
    
  ];

  private generateUniqueId(): string {
    const existingIds = this.contacts.map((c) => parseInt(c.id));
    const maxId = Math.max(...existingIds);
    return (maxId + 1).toString();
  }

  async getContacts(): Promise<Contact[]> {
    await this.simulateDelay();

    return [...this.contacts];
  }

  async addContact(contact: Contact): Promise<Contact> {
    await this.simulateDelay();
    const newContact = {
      ...contact,
      id: this.generateUniqueId(),
    };
    this.contacts = [newContact, ...this.contacts];
    return newContact;
  }

  async deleteContact(id: string): Promise<void> {
    await this.simulateDelay();
    this.contacts = this.contacts.filter((c) => c.id !== id);
  }

  async updateContact(updatedContact: Contact): Promise<Contact> {
    await this.simulateDelay();
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    if (index === -1) {
      throw new Error('Contact not found');
    }
    this.contacts[index] = updatedContact;
    return updatedContact;
  }

  async getContact(id: string): Promise<Contact> {
    await this.simulateDelay();
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
