import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, pipe, takeUntil, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authState$: Observable<any>;
  isDestroyed$: Subject<boolean> = new Subject<boolean>();
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    this.authState$ = this.authService.authState$;
    this.authState$.pipe(takeUntil(this.isDestroyed$)).subscribe(
      (state) => {
        this.isLoggedIn = !!state;
      } 
    );
  }
  
  signOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }  

}

