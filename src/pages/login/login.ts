import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
//import { Device } from '@ionic-native/device';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupPage } from '../signup/signup';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  name:any;
  account: { mobile: string, password: string, type:string, deviceId:string, name:string} = {
    mobile: '',
    password: '',
    type: '',
    deviceId:"",
    name:''
  };

  mobile:any;
  password:any;
  userdata:any;
  deviceID:any;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public storage: Storage,    
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
   // public device: Device,
    public nativeStorage: NativeStorage,
    public alertCtrl: AlertController,
    public serviceState:ServicestateProvider,
    public push: Push,
    public platform: Platform,
    public menuCtrl: MenuController) {

      // console.log('Device UUID is: ' + this.device.uuid);
      // this.account.deviceId = this.device.uuid;
      this.initPushNotification();

      this.menuCtrl.swipeEnable( false )
      // alert('Device UUID is: ' + this.device.uuid);


    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
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

  ionViewDidLoad(){
    
        this.GetuserData();
    
      }

      forgotpassword(){

        let alert = this.alertCtrl.create({
          title: 'Forgot Password',
          inputs: [
            {
              name: 'mobile',
              placeholder: 'Enter Mobile Number'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'send OTP',
              handler: data => {
                this.serviceState.forgotpassotp(data.mobile)
                .subscribe(data =>{
                 
                })
                this.navCtrl.push(ForgotpasswordPage,{"data":data});
              }
            }
          ]
        });
        alert.present();
      }


  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.mobile = data.mobile;
          this.password = data.password;
          this.deviceID = data.deviceId;
          console.log("user data",data);
          try{

            this.LoginCheck(this.mobile,this.password);
            
          }catch (e) {
            console.log(e);
          }
          
        },
        error => console.error(error)
      
        );
      }

  // Attempt to login in through our User service
  LoginCheck(mobile,password){
    
        if(mobile == "loggedout" && password == "loggedout"){
          
                console.log("logged out");
              }else{
                
              let  account: { mobile: string, password: string, type:string } = {
                  mobile: mobile,
                  password: password,
                  type: 'vendor'
                };
                this.account.mobile = mobile;
                this.account.password = password;
                this.account.type = 'vendor';
                this.login(account);
                // this.presentLoading();
                            
              }
      }

      login(account){

        this.user.login(account).subscribe((resp) => {
          // this.navCtrl.push(MainPage);
          this.userdata = resp;
          console.log(this.userdata.data);
          this.storage.set('UserData', {mobile: this.account.mobile,name:this.userdata.data.username , password: this.account.password, type: this.account.type,userid:this.userdata.data.id,walletbalance:this.userdata.data.rf_wallet_bal,deviceId:this.deviceID})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
          this.presentLoading();
        }, (err) => {
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: 'Unable to login Wrong username or password !',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
      // Attempt to login in through our User service
      doLogin() {
        this.user.login(this.account).subscribe((resp) => {
          // this.navCtrl.push(MainPage);
          this.userdata = resp;
          console.log(this.userdata.data);
          this.storage.set('propicture',{profile: this.userdata.data.profile_pic,area: this.userdata.data.area}).then(
            ()=> console.log('picture saved'),
            error => console.error('not saved',error),
          );

          this.storage.set('UserData', {mobile: this.account.mobile , password: this.account.password, type: this.account.type,userid:this.userdata.data.id,walletbalance:this.userdata.data.rf_wallet_bal,deviceId:this.account.deviceId,name:this.userdata.data.username })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
          this.presentLoading();
        }, (err) => {
          // this.navCtrl.push(MainPage);
          // this.presentLoading();
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: 'Unable to login Wrong username or password !',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "verifying..",
      duration: 3000
    });
    loader.present();

    setTimeout(() => {
      this.navCtrl.push(MainPage);
    }, 1000);
  }

  signup(){

    this.navCtrl.push('SignupPage');
  }
}
