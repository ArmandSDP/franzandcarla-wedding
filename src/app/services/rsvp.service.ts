import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  collectionData,
  query,
  doc,
  where,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RsvpService {
  private rsvpCollection;
  private guestsCollection;

  constructor(private firestore: Firestore) {
    this.rsvpCollection = collection(this.firestore, 'RSVP');
    this.guestsCollection = collection(this.firestore, 'Guests');
  }

  // Fetch all existing RSVPs and store them in a Set
  async getExistingRsvps(): Promise<Set<string>> {
    const snapshot = await getDocs(this.rsvpCollection);
    return new Set(snapshot.docs.map((doc) => doc.data()['name']));
  }

  // ✅ NEW: Add or Update RSVP
  async addOrUpdateRSVP(name: string, attending: boolean, staying: boolean) {
    // Search if RSVP already exists
    const q = query(this.rsvpCollection, where('name', '==', name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update the existing RSVP
      const docRef = querySnapshot.docs[0].ref;
      await setDoc(docRef, {
        name,
        attending,
        staying,
        timestamp: new Date(),
      });
    } else {
      // Otherwise, add a new RSVP
      await addDoc(this.rsvpCollection, {
        name,
        attending,
        staying,
        timestamp: new Date(),
      });
    }
  }

  // Fetch all RSVPs (optional)
  getRSVPs(): Observable<any[]> {
    return collectionData(this.rsvpCollection, { idField: 'id' });
  }

  // 🆕 Fetch all guest names from the Guests collection
  async getGuestList(): Promise<string[]> {
    const snapshot = await getDocs(this.guestsCollection);
    return snapshot.docs.map((doc) => doc.data()['NameAndSurname']);
  }
}
