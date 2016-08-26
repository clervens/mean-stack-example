import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';
import { AuthService } from '../../providers/auth-service/auth-service';
// Pipes
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { JsDatePipe } from '../../pipes/js-date-pipe';
// Modals
import { CreatePostModal } from '../modals/create-post/create-post-modal';
import { SignInModal } from '../modals/sign-in/sign-in';
// Models
import { Post } from '../../models/post';
// Pages
import { PostPage } from '../post/post';
import { SignUpPage } from '../sign-up/sign-up';

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
      private modalCtrl: ModalController, private alertCtrl: AlertController,
      private auth: AuthService) {}

  ionViewLoaded() {
    this.postsService.load().then((posts) => {
      this.posts = posts;
    });
  }

  showCreateModal() {
    let modal = this.modalCtrl.create(CreatePostModal)
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      let post: Post = data;
      this.postsService.add(post).then((post) => {
        this.posts.unshift(post);
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    });
    modal.present();
  }

  showPost(post: Post) {
    this.nav.push(PostPage, {post: post, parent: this});
  }

  delete(post: Post) {
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: 'Delete post',
        message: 'Are you sure that you want to permanently delete the selected post?',
        buttons: [ {
          text: 'Disagree',
          handler: () => {
            reject();
          }
        },{
          text: 'Agree',
          handler: () => {
            this.postsService.delete(post).then((post) => {
              this.posts = this.posts.filter((el) => el._id !== post._id);
              resolve();
            }).catch((err) => {
              console.log(JSON.stringify(err));
              reject();
            });
          }
        }]
      });

      confirm.present();
    });
  }

  update(post: Post) {
    return new Promise<Post>((resolve, reject) => {
      this.postsService.update(post).then((updatedPost) => {
        this.posts.forEach((el) => {
          if (el._id === updatedPost._id) {
            el = updatedPost;
            resolve(updatedPost);
            return;
          }
        });
      }).catch((err) => {
        console.log(JSON.stringify(err));
        reject();
      });
    })
  }

  signup() {
    this.nav.push(SignUpPage);
  }

  signin() {
    let modal = this.modalCtrl.create(SignInModal)
    modal.present();
  }
}
