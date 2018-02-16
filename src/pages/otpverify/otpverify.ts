import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { User } from '../../providers/providers';
import { AlertController } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { LoginPage } from '../login/login';
import { LocationPage } from '../location/location';
import { Storage } from '@ionic/storage';
//import { Device } from '@ionic-native/device';
/**
 * Generated class for the OtpverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otpverify',
  templateUrl: 'otpverify.html',
})
export class OtpverifyPage {

  responseData:any;
  userData:any;
  otp:any;
  serverData:any;
  deviceID:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public alertCtrl: AlertController,public serviceState:ServicestateProvider,public toastCtrl: ToastController,public storage: Storage,
  //  public device: Device
  ) {

    // this.deviceID = this.device.uuid;
    this.responseData=this.navParams.get("data");
    console.log(this.responseData);

    this.user.userInfo(this.responseData).subscribe((resp)=>{
      this.userData = resp;
      console.log("userInfo", this.userData);

      this.storage.set('UserData', {mobile: this.userData.data.mobile,name:this.userData.data.username , password: this.userData.data.password, type: this.userData.data.type,userid:this.userData.data.id,walletbalance:this.userData.data.rf_wallet_bal,deviceId:this.deviceID})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
      // this.otpAlert();
    }, (err) => {

      console.log("error");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpverifyPage');
  }

  otpverify(){

    console.log("otp",this.otp);
    console.log("otp",this.userData.data.id);
    this.serviceState.verifyOTP(this.userData.data.id,this.otp)
 .subscribe(data =>{
   if (data.status == 'Invalid OTP'){
     let toast = this.toastCtrl.create({
                message: data.status,
                duration: 3000,
                position: 'top'
              });
              toast.present();
   }else{
    this.navCtrl.push(LocationPage,{"data":this.userData.data});
   }   
 })
  }
}
