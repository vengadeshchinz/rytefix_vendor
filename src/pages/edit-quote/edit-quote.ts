import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { AlertController } from 'ionic-angular';
import { MainPage } from '../pages';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-edit-quote',
  templateUrl: 'edit-quote.html',
})
export class EditQuotePage {
  price:any = "";
  userid:any;
  bookingid:any;
  customerid:any;
  timeRequired:any = "";
  Warranty:any ="";
  pickup:any ="";
  description:any; 
  responseData:any;
  secprice:any;
  SecQualityprice:any;
// for audio
  recording: boolean = false;
  filePath: string;
  fileName: string;
  Audio: MediaObject;
  audioList: any[] = [];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceState:ServicestateProvider,public alertCtrl: AlertController,public media: Media,public file: File,public platform: Platform,public transfer: FileTransfer) {
    this.responseData=this.navParams.get("data");
    this.userid = this.responseData.vendor;
    this.bookingid = this.responseData.booking_id;
    this.customerid = this.responseData.customer;
    this.timeRequired = this.responseData.time_period;
    this.description = this.responseData.description;
    this.pickup = this.responseData.pickup;
    this.price = this.responseData.exactprice;
    this.SecQualityprice = this.responseData.second_quality_price;
    this.Warranty = this.responseData.warranty;
    console.log(this.responseData);



    platform.ready().then(()=>{
      platform.registerBackButtonAction(()=>this.onBackPressed());
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditQuotePage');
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
   fileTransfer.upload(this.filePath,'http://rytefix.in/images/audio.php',options)
   .then((data) => {
     console.log(data);
   }, (err) => {
     // error
     console.log(err);
     alert('error');
   })

  }
  sendQuote(){
    
        if(this.price !="" && this.Warranty !="" && this.pickup !="" && this.timeRequired != ""){
    
          let data = {'uid':this.userid,'price':this.price,'tdate':this.timeRequired,'pickup':this.pickup,'description':this.description,'warranty':this.Warranty,'customerid':this.customerid,'id':this.bookingid,'second_quality_price':this.SecQualityprice,'audio':this.fileName}
          try{
    
            this.serviceState.sendQuote(data).subscribe(data =>{
              // this.presentToast();
    
              let alert = this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Your quote has been saved successfully',
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

      onBackPressed(){
        localStorage.removeItem("audiolist");
      }

}
