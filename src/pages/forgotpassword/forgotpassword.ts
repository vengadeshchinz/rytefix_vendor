import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  otp:any;
  password:any;
  confirmpassword:any;
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceState:ServicestateProvider,public alertCtrl: AlertController) {

    this.data = this.navParams.get("data");
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  verify(){

    if(this.password == this.confirmpassword){
      this.serviceState.forgotpasschange(this.data.mobile,this.otp,this.password)
      .subscribe(data =>{

        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Password sccessfully changed ',
          buttons: [
            {
              text: 'OK',
              
              handler: data => {
                this.navCtrl.push('LoginPage');
              }
            }
          ]
        });
        alert.present();
       
      })
    }else{
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Password Mismatch',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
