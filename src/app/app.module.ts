import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGBundleModule } from './primeng.module';
import { CrudTableComponent } from './components/tables/crud/crud-table.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { StoreModule } from '@ngrx/store';

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppReducers, AppEffects } from './store/app.state';
import { AuthInterceptorService } from './interceptors/authentication.interceptor';

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
    HttpClientModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument(),
  ],
  entryComponents: [
    SignInComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
