import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { AuthShellComponent } from './auth-shell/auth-shell.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FeatureShellModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AuthShellComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
