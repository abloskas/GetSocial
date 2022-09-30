import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  createAccount(email: string, password: string): void {
    if(!email || !password) {
      return;
  }
  this.authService.register(email, password);
  }

}
