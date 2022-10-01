import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount(email: string, password: string): Promise<void> |undefined {
    if(!email || !password) {
      return;
  }
  return this.authService.register(email, password).then((data) => {
    if(!!data?.user){
      this.router.navigate(['dashboard'])
    }
  });
  }

}
