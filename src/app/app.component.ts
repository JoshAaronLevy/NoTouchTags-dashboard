import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
// import { AuthService } from './services/auth.service';
// import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    DialogService,
    MessageService
  ]
})
export class AppComponent implements OnInit {
  user: any;
  password: string;
  loggedIn: boolean;
  subscription: Subscription;

  constructor(
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public messageService: MessageService,
    // public authService: AuthService,
    // private store: Store
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem('user');
    // this.user = `demo@tollbrothers.com`;
    // localStorage.setItem('user', this.user);
    this.checkAuthStatus(this.user);
    this.primengConfig.ripple = true;
  }

  checkAuthStatus(user) {
    if (!user || user === '' || user === undefined) {
      this.loggedIn = false;
      this.triggerSignIn();
    } else {
      this.user = user;
      this.confirm();
    }
  }

  triggerSignIn() {
    const ref = this.dialogService.open(SignInComponent, {
      header: 'Sign In',
      width: '50%',
      data: {
        user: this.user
      }
    });
  
    ref.onClose.subscribe((user) => {
      if (user) {
        this.user = user;
        this.messageService.add({severity:'info', summary: 'Signed In!'});
        this.confirm();
      } else {
        this.loggedIn = false;
      }
    });
  }

  confirm() {
    this.loggedIn = true;
    localStorage.setItem('user', this.user);
  }

  signOut(user) {
    user = '';
    this.user = user;
    this.loggedIn = false;
    localStorage.removeItem('user');
    // this.checkAuthStatus(user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
