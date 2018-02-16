import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform,AlertController } from 'ionic-angular';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ListMasterPage } from '../pages/list-master/list-master';
import { PaypalPage } from '../pages/paypal/paypal';
import { RfwalletPage } from '../pages/rfwallet/rfwallet';
import { RechargehistoryPage } from '../pages/rechargehistory/rechargehistory';
import { RftabsPage } from '../pages/rftabs/rftabs';
import { ServicestatementPage } from '../pages/servicestatement/servicestatement';
import { QuotesandresponsePage } from '../pages/quotesandresponse/quotesandresponse';
import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { ViewresponsePage } from '../pages/viewresponse/viewresponse';
import { EditQuotePage } from '../pages/edit-quote/edit-quote';
// import { Keyboard } from 'ionic-angular/platform/keyboard';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ContactusPage } from '../pages/contactus/contactus';
import {ProfilePage} from '../pages/profile/profile';
import {ChangepasswordPage} from '../pages/changepassword/changepassword';
import {InvitefriendsPage} from '../pages/invitefriends/invitefriends';
import{RateusPage} from '../pages/rateus/rateus';
import { OtpverifyPage } from '../pages/otpverify/otpverify';
import {LocationPage} from '../pages/location/location';
import { ProfilelocationPage } from '../pages/profilelocation/profilelocation';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { AppRate } from '@ionic-native/app-rate';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { CredithistoryPage } from '../pages/credithistory/credithistory';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TutorialPage } from '../pages/tutorial/tutorial';
@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
      <button ion-item menuClose> Home</button>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button ion-item menuClose (click)="rateUs()">
        Rate Us
      </button>
      <button ion-item menuClose (click)="invite()">
      Invite Friends
    </button>
      <button ion-item menuClose (click)="logout()">
      Logout
    </button>

      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = WelcomePage;
  deviceID:any;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Profile', component: 'ProfilePage' },
    { title: 'Change Password', component: 'ChangepasswordPage' },
    // { title: 'Invite Friends', component: 'InvitefriendsPage' },
  // { title: 'Rate This App', component: 'RateusPage' },
   // { title: 'home', component: 'HomePage' }
  ]

  constructor(private translate: TranslateService, public platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public keyboard: Keyboard,public push: Push, public alertCtrl: AlertController,public appRate: AppRate,public appCtrl: App,   public loadingCtrl: LoadingController,public storage: Storage,public socialSharing:SocialSharing,public androidPermissions: AndroidPermissions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // window.Keyboard.disableScroll(true);
      this,keyboard.disableScroll(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
     
      this.initPushNotification();
      // console.log('Device UUID is: ' + this.device.uuid);
    });
    this.initTranslate();
  }

  initPushNotification()
{
// to check if we have permission
this.push.hasPermission()
.then((res: any) => {
if (res.isEnabled) {
console.log('We have permission to send push notifications');
} else {
console.log('We don\'t have permission to send push notifications');
}
});

// to initialize push notifications
const options: PushOptions = {
android: {
senderID: '841332537316'},
ios: {
alert: 'true',
badge: true,
sound: 'false'
},
windows: {}
};
const pushObject: PushObject = this.push.init(options);
pushObject.on('notification').subscribe((notification: any) =>{
console.log('Received a notification', notification);
//Notification Display Section
let confirmAlert = this.alertCtrl.create({
title: 'New Notification',
message: JSON.stringify(notification),
buttons: [{
text: 'Ignore',
role: 'cancel'
}, {
text: 'View',
handler: () => {
//TODO: Your logic here
//self.nav.push(DetailsPage, {message: data.message});
}
}]
});
confirmAlert.present();
//
});
pushObject.on('registration').
subscribe((registration: any) => 
console.log('Device registered', registration));
pushObject.on('error').
subscribe(error => 
console.error('Error with Push plugin', error));
}

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  rateUs(){
    console.log("clicked");
    this.appRate.preferences.storeAppURL = {
      android: 'https://play.google.com/store/apps/details?id=com.rytefix.rytefixpartner&hl=en',
    };
    this.appRate.promptForRating(true);
  }

  logout(){


    let alert = this.alertCtrl.create({
      title: 'logout',
      message: 'Are you sure to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.set('UserData', {mobile: "loggedout" , password: "loggedout", type: ""})
    .then(
      () => console.log('item removed!'),
      error => console.error('Error storing item', error)
    );
    console.log('removed');
  
    let loader = this.loadingCtrl.create({
      content: "Logging out..",
      duration: 3000
    });
    loader.present();
  
    setTimeout(() => {
      this.appCtrl.getRootNav().setRoot(WelcomePage);
      }, 1000);
          }
        }
      ]
    });
    alert.present();

    
  }

  invite(){

    this.socialSharing.share('Invite', 'Welcome to rytefix','', 'https://play.google.com/store/apps/details?id=com.rytefix.rytefixpartner&hl=en').then(() => {
      // Success!
    }).catch(() => {
      // Error!
      
    });
  }
}
