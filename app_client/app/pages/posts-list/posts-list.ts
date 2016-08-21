import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { JsDatePipe } from '../../pipes/js-date-pipe';
import { CreatePostModal } from '../modals/create-post/create-post-modal';
import { Post } from '../../models/post';
/*
  Generated class for the PostsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/posts-list/posts-list.html',
  pipes: [TimeAgoPipe, JsDatePipe]
})
export class PostsListPage {
  public posts: Array<Post> = [];

  constructor(private nav: NavController, private postsService: PostsService,
      private modalCtrl: ModalController) {}

  ionViewLoaded() {
    this.postsService.load().then((posts) => {
      this.posts = posts;
    });
  }

  public showCreateModal() {
    let modal = this.modalCtrl.create(CreatePostModal)
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      let post: Post = data;
      this.postsService.add(post).then((post) => {
        this.posts.push(post);
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    });
    modal.present();
  }
}
