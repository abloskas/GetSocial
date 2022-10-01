import { Injectable, OnInit } from '@angular/core';
import * as _googleFBAuth from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  userState: any;
  authState$: Observable<any>;
  constructor(private fireAuth: AngularFireAuth,  private fireStore: AngularFirestore, private router: Router) { 
    this.authState$ = this.fireAuth.authState;
  }
  
  ngOnInit(): void {
    this.authState$.subscribe(userState => {
      console.log(userState);
      if(!!userState){
        userState = userState;
      localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
       return result;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* Sign in bia Google auth*/
  googleSignIn() {
    return this._authLogin(new _googleFBAuth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  register(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        return result;
      })
      .catch((error) => {
        console.log("ERROR =>", error);
        window.alert(error); // TBD update to notification banner
      });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.fireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.'); // TBD update to notification banner
      })
      .catch((error) => {
        window.alert(error); // TBD update to notification banner
      });
  }

  signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  /* Sets User in document db in FireBase */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  _sendVerificationMail() {
    return this.fireAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        window.alert('Confirm Email Address; if correct, continue') // TDB set up route for this
      });
  }

   // Auth logic to run auth providers
   _authLogin(provider: any) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);  // TDB set up route for this
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error); // TBD update to notification banner
      });
  }
  
}
