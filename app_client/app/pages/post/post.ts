import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { PostsListPage } from '../posts-list/posts-list';
import { PostEditPage } from '../post-edit/post-edit';

// Models
import { Post } from '../../models/post';

// Pipes
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { JsDatePipe } from '../../pipes/js-date-pipe';

/*
  Generated class for the PostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post/post.html',
  pipes: [TimeAgoPipe, JsDatePipe],
})
export class PostPage {
  post: Post;
  private parent: PostsListPage;

  constructor(private nav: NavController, private params: NavParams) {
    this.post = this.params.get('post');
    this.parent = this.params.get('parent');
  }

  edit() {
    this.nav.push(PostEditPage, {post: this.post, parent: this});
  }

  update(postToUpdate: Post) {
    return this.parent.update(postToUpdate);
  }

  delete() {
    this.parent.delete(this.post).then(() => {
      this.nav.pop();
    });
  }
}
