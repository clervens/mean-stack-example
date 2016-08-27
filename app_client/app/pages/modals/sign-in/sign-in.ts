import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'build/pages/modals/sign-in/sign-in-modal.html',
  providers: [AuthService]
})
export class SignInModal {
  username: string;
  password: string;

  errorMsg: string;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController,
    private auth: AuthService) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  signin() {
    this.auth.signin(this.username, this.password).then((currentUser) => {
      this.viewCtrl.dismiss(currentUser);
    }).catch((err) => {
      this.errorMsg = err.message;
    })
  }
}
