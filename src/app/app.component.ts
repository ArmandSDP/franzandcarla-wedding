import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { TravelComponent } from './pages/travel/travel.component';
import { DetailsComponent } from './pages/details/details.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ This makes it standalone
  imports: [
    HomeComponent,
    RsvpComponent,
    TravelComponent,
    DetailsComponent,
    GalleryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ Use 'styleUrls' (plural)
})
export class AppComponent {
  title = 'carlaandfranzwedding';
}
