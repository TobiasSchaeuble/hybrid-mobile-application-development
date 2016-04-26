import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;
    this.username ='';
    this.interests ='';
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
