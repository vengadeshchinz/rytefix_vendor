import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';

/**
 * Generated class for the ServicestatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicestatement',
  templateUrl: 'servicestatement.html',
})
export class ServicestatementPage {

  userid: any;
  fromdate:any;
  todate:any;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public serviceState:ServicestateProvider  ) {
  }

  ionViewDidLoad() {
    this.GetuserData();
    console.log('ionViewDidLoad ServicestatementPage');
  }

  search(){
    console.log(this.fromdate);
    console.log(this.todate);
    this.serviceState.getStatement(this.userid,this.fromdate,this.todate)
    .subscribe(data =>{
      this.data=data.offers;
console.log(this.data);
     console.log(this.fromdate);
console.log(this.todate);
   });
  }

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.userid = data.userid;
          console.log("user data",this.userid);
        },
        error => console.error(error)
      
        );
      }

}
