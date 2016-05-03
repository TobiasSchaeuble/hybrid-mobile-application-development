import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController], [Http]];
  }

  constructor(nav, menu, http) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;
    this.username ='';
    this.interests ='';
    this.http = http;
    this.slides = [
      {
        index: "Username",
        title: "Welcome Developer",
        description: "The <b>hybrid mobile application development App</b> is a practical preview of the Ionic Framework in action, and a demonstration of proper code use.",
        image: "img/ica-slidebox-img-1.png",
        input: "Username"
      },
      {
        index: "Interests",
        title: "What is Ionic?",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "img/ica-slidebox-img-2.png",
        input: "Interests"
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
    let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let order = ''+this.username+', '+this.interests;
        this.http.post('/proxy/hmad/post.php', order, {
        // this.http.post('https://klecks.info/hmad/post.php', order, {
            headers: headers
        }).subscribe(res => {
            console.log('post result %o', res);
        });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  updateInput(event, slide) {
    if (slide.index == "Username"){
      this.username = event.target.value;
      slide.title = "Welcome "+ this.username;
    }
    if (slide.index == "Interests"){
      this.interests = event.target.value;
    }
  }

}
