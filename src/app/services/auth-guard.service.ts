import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(auth => {
        if (!auth) {
          this.router.navigate(["/sign-in"]);
          return false;
        }
          return true;
      })
    );
  }
}
