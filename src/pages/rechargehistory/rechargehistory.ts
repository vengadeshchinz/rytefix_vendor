import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RechargehistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rechargehistory',
  templateUrl: 'rechargehistory.html',
})
export class RechargehistoryPage {

  userid:any;
  topupHistory:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public serviceState:ServicestateProvider) {

    this.GetuserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargehistoryPage');
    this.GetuserData();
  }

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.userid = data.userid;
          console.log("user data",this.userid);
          this.getHistory(this.userid);
        },
        error => console.error(error)
      
        );
      }

      getHistory(uid){

        this.serviceState.TopupHistory(uid).subscribe(data =>{
          // this.presentToast();
          
          this.topupHistory = data;
          console.log("Topup history",this.topupHistory);
        }),error =>{
          console.log(error);
        }
      }

}
