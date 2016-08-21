import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/modals/create-post/create-post-modal.html'
})
export class CreatePostModal {
  title: string;
  content: string;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendNewPost() {
    this.viewCtrl.dismiss({
      title: this.title,
      content: this.content
    });
  }
}
