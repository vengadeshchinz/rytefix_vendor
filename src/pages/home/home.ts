import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ListMasterPage } from '../list-master/list-master';
import { RfwalletPage } from '../rfwallet/rfwallet';
import { RftabsPage } from '../rftabs/rftabs';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { ServicestatementPage } from '../servicestatement/servicestatement';
import { QuotesandresponsePage } from '../quotesandresponse/quotesandresponse';
import { AlertController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { App, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  name:any;
  userdata: any;
  username:any;
  area:any;
  profile_pic:any = 'user_avatar.png';
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage, public toastCtrl: ToastController,public storage: Storage,public alertCtrl: AlertController,public appCtrl: App,   public loadingCtrl: LoadingController,public firebase: Firebase,public push: Push) {

    this.getData();
  //  this.initPushNotification();
 }

//   initPushNotification(){

// this.push.hasPermission()
// .then((res: any) => {
// if (res.isEnabled) {
// console.log('We have permission to send push notifications');
// } else {
// console.log('We don\'t have permission to send push notifications');
// }
// });

// // to initialize push notifications
// const options: PushOptions = {
// android: {
// senderID: '448214794901'},
// ios: {
// alert: 'true',
// badge: true,
// sound: 'false'
// },
// windows: {}
// };
// const pushObject: PushObject = this.push.init(options);
// pushObject.on('notification').subscribe((notification: any) =>{
// console.log('Received a notification', notification);
// //Notification Display Section
// let confirmAlert = this.alertCtrl.create({
// title: 'New Notification',
// message: JSON.stringify(notification),
// buttons: [{
// text: 'Ignore',
// role: 'cancel'
// }, {
// text: 'View',
// handler: () => {
// //TODO: Your logic here
// //self.nav.push(DetailsPage, {message: data.message});
// }
// }]
// });
// confirmAlert.present();
// //
// });
// pushObject.on('registration').
// subscribe((registration: any) => 
// console.log('Device registered', registration));
// pushObject.on('error').
// subscribe(error => 
// console.error('Error with Push plugin', error));
//   }


  ionViewDidLoad() {

    this.getData();
    console.log('ionViewDidLoad HomePage');
    
}

getData(){
  this.storage.get('UserData')
    .then(
    data => {
      this.userdata = data;
      this.username = this.userdata.name;
      console.log("user data",this.userdata);
    },
    error => console.error(error)

    );
    this.storage.get('propicture')
    .then(
    data => {
      this.profile_pic = data.profile;
      this.area = data.area;
      console.log("user data",this.profile_pic);
    },
    error => console.error(error)

    );
}

remove(){
  // this.storage.remove("UserData");
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
  

  // this.navCtrl.push(WelcomePage);
}

sellingAndBuy(){

  let alert = this.alertCtrl.create({
    title: 'Coming soon',
    subTitle: 'This feature will be launched soon',
    buttons: [
      {
        text: 'OK',
        handler: data => {
        }
      }]
  });
  alert.present();
}

toast(){

  let toast = this.toastCtrl.create({
    message: " name: " + this.name,
    duration: 9000,
    position: 'bottom'
  });
  toast.present();
}
newServiceRequest(){

  this.navCtrl.push(ListMasterPage);
}

rfwallet(){
  this.navCtrl.setRoot(RftabsPage);
}

serviceStatement(){

  this.navCtrl.push(ServicestatementPage);
}

QuotesAndResponse(){
  this.navCtrl.push(QuotesandresponsePage);
}

}
