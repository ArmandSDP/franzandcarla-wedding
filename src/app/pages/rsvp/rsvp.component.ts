import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RsvpService } from '../../services/rsvp.service'; // Import the RSVP service

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent {
  rsvpStatus: string = '';
  name: string = '';
  stayingOver: string = '';
  namesList: string[] = [];
  filteredNames: string[] = [];
  existingRsvps: Set<string> = new Set(); // Store names that already RSVP’d

  constructor(private rsvpService: RsvpService) {}

  async ngOnInit() {
    this.namesList = await this.rsvpService.getGuestList();
    this.existingRsvps = await this.rsvpService.getExistingRsvps();
  }

  filterNames() {
    this.filteredNames = this.namesList.filter((name) =>
      name.toLowerCase().includes(this.name.toLowerCase())
    );
  }

  selectName(selectedName: string) {
    this.name = selectedName;
    this.filteredNames = [];
  }

  isNameValid(): boolean {
    return this.namesList.includes(this.name);
  }


  isFormValid(): boolean {
    if (!this.isNameValid()) {
      return false;
    }

    if (this.rsvpStatus === 'yes') {
      return this.stayingOver !== '';
    }

    if (this.rsvpStatus === 'no') {
      return true;
    }

    return false;
  }

  async submitRsvp() {
    if (!this.isFormValid()) {
      alert('Please complete all required fields before submitting.');
      return;
    }

    await this.rsvpService.addOrUpdateRSVP(
      this.name,
      this.rsvpStatus === 'yes',
      this.stayingOver === 'yes'
    );

    alert('Your RSVP has been submitted! 🎉');

    // Update the existing RSVP list to prevent re-submission
    this.existingRsvps.add(this.name);

    // Reset form
    this.rsvpStatus = '';
    this.name = '';
    this.stayingOver = '';
  }
}
