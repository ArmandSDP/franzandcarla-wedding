import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyCdahkAaiO94q_9FP5w0EiEg2qM1WXz96c',
  authDomain: 'franzandcarla-wedding.firebaseapp.com',
  projectId: 'franzandcarla-wedding',
  storageBucket: 'franzandcarla-wedding.firebasestorage.app',
  messagingSenderId: '10658511313',
  appId: '1:10658511313:web:ba91188a9a1c6d72ba08f0',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
