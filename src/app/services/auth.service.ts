import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  // Observable string sources
  private authStateChangedSource = new Subject<string>();
  private authChangeDetectedSource = new Subject<string>();

  // Observable string streams
  authStateChanged$ = this.authStateChangedSource.asObservable();
  authChangeDetected$ = this.authChangeDetectedSource.asObservable();

  // Service message commands
  changeAuthState(currentUser: string) {
    this.authStateChangedSource.next(currentUser);
    console.log(currentUser);
  }
  
  confirmAuthState(currentUser: string) {
    this.authChangeDetectedSource.next(currentUser);
    console.log(currentUser);
  }
}