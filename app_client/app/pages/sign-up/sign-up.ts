import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/*
  Generated class for the SignUpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/sign-up/sign-up.html',
})
export class SignUpPage {
  username: string;
  password: string;
  errorMsg: string;

  constructor(private nav: NavController, private auth:AuthService) {}

  signup() {
    this.auth.signup(this.username, this.password).then((currentUser) => {
      if (currentUser) {
        this.nav.pop();
      }
    }).catch((err) => {
      this.errorMsg = err.message;
    })
  }

}
