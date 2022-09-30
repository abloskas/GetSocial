import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./components/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./components/create-account/create-account.module').then(m => m.CreateAccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
