import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  modalImage: string | null = null;

  openModal(id: number): void {
    this.modalImage = 'assets/cf' + id + '.jpg';
  }

  closeModal(): void {
    this.modalImage = null;
  }
}
