import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
     this.authService.googleSignIn();
  }

  signIn(email: string, password: string): void {
    if(!email || !password) {
      return;
  }
  this.authService.signIn(email, password);
  }

  createAccount(): void {
    this.router.navigate(['create-account']);
  }

}
