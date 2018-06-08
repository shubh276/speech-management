import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthShellComponent } from './auth-shell/auth-shell.component';

const routes: Routes = [
    { path: 'auth', component: AuthShellComponent },
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
