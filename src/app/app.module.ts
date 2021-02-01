import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGBundleModule } from './primeng.module';
import { CrudTableComponent } from './components/tables/crud/crud-table.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudTableComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNGBundleModule,
    HttpClientModule
  ],
  entryComponents: [
    SignInComponent
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
