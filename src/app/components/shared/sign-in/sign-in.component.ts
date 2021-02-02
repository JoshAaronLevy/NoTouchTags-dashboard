import { Component, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: []
})
export class SignInComponent implements OnDestroy {
  user: any;
  loggedIn: boolean;
  email: string;
  password: string;
  subscription: Subscription;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    // public authService: AuthService
  ) {}

  submitSignIn(email) {
    this.user = email;
    localStorage.setItem('user', this.user);
    this.ref.close(this.user);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
