import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  isDestroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(private fireStore: AngularFirestore) {
   }


  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }  
}
