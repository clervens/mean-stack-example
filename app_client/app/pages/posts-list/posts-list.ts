import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';

/*
  Generated class for the PostsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/posts-list/posts-list.html',
})
export class PostsListPage {
  public posts: Array<any> = [];

  constructor(private nav: NavController, private postsService: PostsService) {}

  ionViewLoaded() {
    this.postsService.load().then((posts) => {
      this.posts = posts;
    });
  }
}
