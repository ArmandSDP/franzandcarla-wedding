import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  collectionData,
} from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RsvpService {
  private rsvpCollection;

  constructor(private firestore: Firestore) {
    this.rsvpCollection = collection(this.firestore, 'RSVP'); // Now initialized in the constructor
  }

  // Fetch all existing RSVPs and store them in a Set
  async getExistingRsvps(): Promise<Set<string>> {
    const snapshot = await getDocs(this.rsvpCollection);
    return new Set(snapshot.docs.map((doc) => doc.data()['name']));
  }

  // Add RSVP to Firestore
  async addRSVP(name: string, attending: boolean, staying: boolean) {
    return await addDoc(this.rsvpCollection, {
      name,
      attending,
      staying,
      timestamp: new Date(),
    });
  }

  // Fetch all RSVPs (optional)
  getRSVPs(): Observable<any[]> {
    return collectionData(this.rsvpCollection, { idField: 'id' }); // Real-time data fetching
  }
}
