import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

}
