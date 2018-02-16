import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the ViewresponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewresponse',
  templateUrl: 'viewresponse.html',
})
export class ViewresponsePage {

   responseData:any;
   userid:any;
   bookingid:any;
   view:any;
   problem:any;
   QuotedData:any;
   vendorquotation:any;
   filePath:any;
   Audio:any;
   
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceState:ServicestateProvider,public storage: Storage,public media: Media,public file: File,public platform: Platform,public transfer: FileTransfer) {

    this.responseData=this.navParams.get("data");
    this.QuotedData=this.navParams.get("problem");
    this.vendorquotation = this.QuotedData.data;
  }

  ionViewDidLoad() {

    this.responseData=this.navParams.get("data");
    this.QuotedData=this.navParams.get("problem");
    this.vendorquotation = this.QuotedData.data;
    console.log('ionViewDidLoad ViewresponsePage');
    
    console.log("responseData",this.responseData);
    console.log("ProblemData",this.QuotedData.data);
    this.GetuserData();
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
          this.userid = data.userid;
          this.bookingid = this.responseData.booking_id;
          console.log("userID",this.userid);
          // this.getQuoteproblem(this.userid,this.bookingid);
          // this.getQuotes(this.userid);
        },
        error => console.error(error)
      
        );
      }

  //     getQuoteproblem(uid,bid){

  //       console.log("userID", uid);
  //       console.log("bookingID", bid);
  //       this.serviceState.getProblem(uid,bid)
  //       .subscribe(data =>{
  //         let view = data;
  //         console.log(view.vendorquotation);
  //         this.vendorquotation = view.vendorquotation;
  //          this.problem = view.problem;
  //         //  console.log(this.bid);
  //       })
  //     //  console.log(this.bid);
  // }
}
