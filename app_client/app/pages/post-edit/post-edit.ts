import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { Post } from '../../models/post';

/*
  Generated class for the PostEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post-edit/post-edit.html',
})
export class PostEditPage {
  post: Post;
  parent: PostPage;

  constructor(private nav: NavController, private params: NavParams) {
    this.post = this.params.get('post');
    this.parent = this.params.get('parent');
  }

  save() {
    this.parent.update(this.post).then((updatedPost) => {
      this.parent.post = updatedPost;
      this.nav.pop();
    });
  }

}
