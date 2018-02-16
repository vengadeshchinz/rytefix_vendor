import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SubmitQuoteModelPage } from '../submit-quote-model/submit-quote-model';
import { Storage } from '@ionic/storage';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { User } from '../../providers/providers';
import { Items } from '../../providers/providers';
import { MainPage } from '../pages';
import { Media, MediaObject } from '@ionic-native/media';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  item: any;
  testRadioOpen:boolean;
  testRadioResult:any;
  credits:any;
  credit1:any;
  intcredits:any;
  walletBalance:any;
  intwallet:any;
  mobile:any;
  userid:any;
  password:any;
  username:any;
  bookingId:any;
  filePath:any;
   Audio:any;


  constructor(public navCtrl: NavController, navParams: NavParams, items: Items,public alertCtrl: AlertController,public modalCtrl : ModalController,public storage: Storage,public serviceState:ServicestateProvider,public user: User,public toastCtrl: ToastController,public media: Media,public platform: Platform) {
    // this.item = navParams.get('item') || items.defaultItem;
    this.item = navParams.get('item');
    console.log(this.item);
    this.credits = this.item.credit2;
    this.bookingId = this.item.booking_id;
    this.credit1 = parseInt(this.item.credit1);
    this.intcredits = parseInt(this.credits);
    console.log("credits",this.credits);
    console.log("credit1",this.credit1);
    console.log("bookingId",this.bookingId);
    this.GetuserData();
  }

  public submitQuote(){
     let details =this.item;
     const modalPage = this.modalCtrl.create('SubmitQuoteModelPage',{data: details});
     modalPage.present(); 

  }

  playAudio(file) {
    let audioname = JSON.stringify(file);
    if (this.platform.is('ios')) {
      this.filePath = 'http://rytefix.in/images/audio/'+file;
      this.Audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      console.log();
      this.filePath = 'http://rytefix.in/images/audio/'+file;
      console.log(this.filePath);
      this.Audio = this.media.create(this.filePath);
    }
    this.Audio.play();
    this.Audio.setVolume(0.8);
  }

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          console.log(data);
          this.mobile = data.mobile;
          this.username = data.name;
          this.password = data.password;
          this.userid = data.userid;
          this.walletBalance = data.walletbalance;
          this.intwallet = parseInt(this.walletBalance);
          // console.log("user data",this.walletBalance);
          // console.log("user data",this.mobile);
          // console.log("user data",this.userid);
          // console.log("user data",this.username);
          // console.log("user data",this.password);
        },
        error => console.error(error)
      
        );
      }

  creditCheck(){

    if(this.intwallet <= 0){
      
                  let alert = this.alertCtrl.create({
                    title: 'Your wallet is empty !',
                    subTitle: 'Please recharge your wallet to submit quote',
                    buttons: ['OK']
                  });
                  alert.present();
                 }else{

                   if(this.intwallet < this.intcredits){

                    let alert = this.alertCtrl.create({
                      title: 'Insufficient Balance !',
                      subTitle: 'Please recharge your wallet to submit quote',
                      buttons: ['OK']
                    });
                    alert.present();
                   }else{
                    this.submitQuote();
                   }
                  
                 }
  }

  public decline(){

    console.log("credit 1",this.credit1);
    if(this.credit1 != 0){

      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: ' '+this.credit1+' credits will be credited to your account',
        buttons: [
          {
            text: 'OK',
            handler: data => {



      let alert1 = this.alertCtrl.create({
        title: 'Reason to decline',
        inputs: [
          {
            name: 'Reason',
            placeholder: 'Enter your Reason'
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
            text: 'Decline',
            handler: data => {
              if (data.Reason !="") {
                console.log("declined");
                // refund update to server 
                let bid;
                let cid;
                this.serviceState.creditRefund(this.userid,this.credit1,this.item.customer,this.item.booking_id).subscribe(data =>{
                
                  console.log(data);
               }),error =>{
                 console.log(error);
               }
  
                let walletbalance = this.intwallet - this.credit1;
                console.log('total wallet balance', walletbalance);
                let id = this.userid;
                let bookingId = this.bookingId;
                let walletData = JSON.stringify({id,walletbalance,bookingId});
                // update wallet and user details in local storage
                this.storage.set('UserData', {mobile: this.mobile,name:this.username , password: this.password, type: 'vendor',userid:this.userid,walletbalance:walletbalance})
                .then(
                  () => console.log('Stored item!'),
                  error => console.error('Error storing item', error)
                );
                // update wallet and decline status in server storage
                this.user.updateCreditWallet(walletData).subscribe((resp) => {
                  
                                console.log("sucess");
                              }, (err) => {
                                console.log("error");
                                // Unable to log in
                              });
                              this.navCtrl.push(MainPage);
                
              } else {
                // invalid login
                let toast = this.toastCtrl.create({
                  message: "Enter your reason to decline quote",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                return false;
              }
            }
          }
        ]
      });
      alert1.present();

            }
          }]
      });
      alert.present();
    }else {

      let alert1 = this.alertCtrl.create({
        title: 'Reason to decline',
        inputs: [
          {
            name: 'Reason',
            placeholder: 'Enter your Reason'
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
            text: 'Decline',
            handler: data => {
              if (data.Reason !="") {
                console.log("declined");
                let id = this.userid;
              let bookingId = this.bookingId;
              let Data = JSON.stringify({id,bookingId});
              //refund update to server
              let cid ;
              let bid;
              this.serviceState.creditRefund(this.userid,this.credit1,this.item.customer,this.item.booking_id).subscribe(data =>{
                
                console.log(data);
             }),error =>{
               console.log(error);
             }

              // update walletBalance and decline status in server storage
              this.user.declineQuote(Data).subscribe((resp) => {
                
                              console.log("sucess");
                            }, (err) => {
                              console.log("error");
                              // Unable to log in
                            });
                            this.navCtrl.push(MainPage);
              } else {

                let toast = this.toastCtrl.create({
                  message: "Enter your reason to decline quote",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                return false;
              }
            }
          }
        ]
      });
      alert1.present();
    }
    
  }


}
