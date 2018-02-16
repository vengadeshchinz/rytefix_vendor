import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform  } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { User } from '../../providers/providers';
import { PaypalPage } from '../paypal/paypal';
import { MainPage } from '../pages';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureAudioOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@IonicPage()
@Component({
  selector: 'page-submit-quote-model',
  templateUrl: 'submit-quote-model.html',
})
export class SubmitQuoteModelPage {

  item:any;
  price:any = "";
  timeRequired:any = "";
  Warranty:any ="";
  pickup:any ="";
  description:any;
  userid:any;
  walletBalance:any;
  credits:any;
  mobile:any;
  password:any;
  username:any;
  intwallet:any;
  SecQualityprice:any;

  recording: boolean = false;
filePath: string;
fileName: string;
Audio: MediaObject;
audioList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,
    public alertCtrl: AlertController,public storage: Storage,public serviceState:ServicestateProvider,public user: User,public mediaCapture: MediaCapture,public media: Media,public file: File,public platform: Platform,public transfer: FileTransfer) {
      this.item = this.navParams.get('data');

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitQuoteModelPage');
    this.item = this.navParams.get('data');
    console.log("items",);
    this.credits = this.item.credit2;
    console.log("credit 2 ",this.credits);
    this.GetuserData();
    console.log(this.item);
  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.Audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.Audio = this.media.create(this.filePath);
    }
    this.Audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.Audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
     this.getAudioList();
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.Audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.Audio = this.media.create(this.filePath);
    }
    this.Audio.play();
    this.Audio.setVolume(0.8);
  }

  uploadAudio(){

    const fileTransfer: FileTransferObject = this.transfer.create();
    let options = {
      fileKey: "file",
    fileName: this.fileName,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': this.fileName}
   };
   
   console.log('filepath',this.filePath);
   console.log('filename',this.fileName);
   console.log("userid",this.userid);
  //  fileTransfer.upload('<file path>', '<api endpoint>', options)
   fileTransfer.upload(this.filePath,'http://sunrisetechs.com/images/audio.php',options)
   .then((data) => {
     console.log(data);
   }, (err) => {
     // error
     console.log(err);
     alert('error');
   })

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
          console.log("user data",this.walletBalance);
        },
        error => console.error(error)
      
        );
      }

      audio(){
        let options: CaptureAudioOptions = { limit: 1 };
        this.mediaCapture.captureAudio(options)
          .then(
            (data: MediaFile[]) => console.log(data),
            (err: CaptureError) => console.error(err)
          );
      }

  closeModel(){
    localStorage.removeItem("audiolist");
    this.view.dismiss();

  }

    creditsCheck(){

      if(this.credits == "0"){

        this.sendQuote();
        // this.closeModel();

      }else{
        
         if(this.intwallet != 0){

          if(this.price !="" && this.Warranty !="" && this.pickup !="" && this.timeRequired != "" && this.description != ""){

            this.showConfirm();
          }else {
            
                  let alert = this.alertCtrl.create({
                    title: 'Warning',
                    subTitle: 'Please fill all the details',
                    buttons: [
                      {
                        text: 'OK',
                        handler: data => {
                        }
                      }]
                  });
                  alert.present();
                }
         
          

         }
       
      }
      
    }

  sendQuote(){

    if(this.price !="" && this.Warranty !="" && this.pickup !="" && this.timeRequired != "" && this.description != ""){

      let data = {'uid':this.userid,'price':this.price,'tdate':this.timeRequired,'pickup':this.pickup,'description':this.description,'warranty':this.Warranty,'customerid':this.item.customer,'id':this.item.booking_id,'second_quality_price':this.SecQualityprice,'audio':this.fileName}
      try{

        this.serviceState.sendQuote(data).subscribe(data =>{
          // this.presentToast();
          this.uploadAudio();
          let alert = this.alertCtrl.create({
            title: 'Thank you!',
            subTitle: 'Your quote has been placed successfully',
            buttons: [
              {
                text: 'OK',
                handler: data => {
                  localStorage.removeItem("audiolist");
                  this.navCtrl.push(MainPage);
                }
              }]
          });
          alert.present();
          
          // console.log(data);
        }),error =>{
          console.log(error);
        }
  
      }catch(e){
        console.log(e);
      }
     
    } else {

      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Please fill all the details',
        buttons: [
          {
            text: 'OK',
            handler: data => {
            }
          }]
      });
      alert.present();
    }
  }

  showConfirm() {
    

    let confirm = this.alertCtrl.create({
      title: 'For Quoting '+this.credits+' Rs will be debited from your wallet',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.sendQuote();
            let uid;
            let cid;
            this.serviceState.creditDebit(this.userid,this.credits,this.item.customer,this.item.booking_id).subscribe(data =>{
                
              console.log(data);
           }),error =>{
             console.log(error);
           }
            // let totalBalance = parseInt(this.walletBalance) + parseInt(this.credits);
            let totalBalance = parseInt(this.walletBalance) - parseInt(this.credits);
            console.log(totalBalance);
              let id = this.userid;
              let walletbalance = totalBalance;
              let data = JSON.stringify({id,walletbalance});
              console.log("dbUpdate",data);

              // this.storage.set('UserData', {walletbalance:walletbalance})
              this.storage.set('UserData', {mobile: this.mobile,name:this.username , password: this.password, type: 'vendor',userid:this.userid,walletbalance:walletbalance})
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
              console.log("recharge DB "+ data);
              this.user.updateCreditWallet(data).subscribe((resp) => {
  
                console.log("sucess");
              }, (err) => {
                console.log("error");
                // Unable to log in
              });
            // }
            this.closeModel();
            
            let alert = this.alertCtrl.create({
              title: 'Thank you!',
              subTitle: 'Your quote has been placed successfully',
              buttons: [
                {
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.push(MainPage);
                  }
                }]
            });
            alert.present();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
