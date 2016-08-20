import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

// Pages
import {HomePage} from './pages/home/home';
import {PostsListPage} from './pages/posts-list/posts-list';

// Services
import { PostsService } from './providers/posts-service/posts-service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [PostsService]
})
export class MyApp {
  // rootPage: any = HomePage;
  rootPage: any = PostsListPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
