import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import {MenufaqProvider} from '../../providers/menufaq/menufaq';
import { ProfilelocationPage } from '../profilelocation/profilelocation';
import { Storage } from '@ionic/storage';
import {TabsPage} from '../tabs/tabs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile:any;
  make:any;
  username:any;
  street:any;
  area:any;
  city:any;
  pincode:any;
  profiledata:any={};
  profilepic:any;
  id:any;
  public updateprofile: FormGroup;
  submit: boolean=false;
  imageURI:any;
  imageFileName:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public profileapi:MenufaqProvider,
    public toastCtrl: ToastController,public storage: Storage, private transfer: FileTransfer,
    private camera: Camera,public loadingCtrl: LoadingController,) {
      this.GetuserData();
      
  
 this.updateprofile=this.formBuilder.group({
  username:['',Validators.required],
  street:['',Validators.required],
  area:['',Validators.required],
  city:['',Validators.required],
  pincode:['',Validators.required],
 
 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.imageFileName = 'image'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.jpg';
      // this.account.image = this.imageFileName;
      console.log(this.imageFileName);
    }, (err) => {
      console.log(err);
      this.presentToast1(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
   
    console.log('image name',this.imageFileName);
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileName,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
    params : {'fileName': this.imageFileName}
      
    }
  
    fileTransfer.upload(this.imageURI, 'http://sunrisetechs.com/images/image.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      loader.dismiss();
      this.presentToast1("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast1(err);
    });
  }

  presentToast1(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  GetuserData(){
    
    this.storage.get('UserData')
    .then(
    data => {
      this.id = data.userid;
      console.log("user id",this.id);
      this.getMyprofile(this.id);
    },
    error => console.error(error)
  
    );
  }

  gotoTabspage(){
    this.navCtrl.push(TabsPage);
  }

  profileUpadate(){
    if(this.submit==false){
      this.submit=true;
    }
    else 
    {
     this.gotoUpdate();
    }
   
  }
  gotoUpdate(){
    if(this.submit==true){
      console.log("change data")
      let data={'id':this.id,'username':this.username,'street':this.street,'area':this.area,'pincode':this.pincode,'city':this.city,'profile_pic':this.imageFileName}
      console.log(data);
      this.profileapi.updateProfile(data).subscribe(data =>{
        this.uploadFile();
        this.presentToast();
        this.navCtrl.push(ProfilelocationPage);
    console.log(data);
      }),error =>{
        console.log(error);
      }
    }
    
  }
  getMyprofile(id){
    let data={'id':id}
    this.profileapi.getProfile(data)
      .subscribe(data =>{
        this.profile=data;
        this.profiledata=this.profile.data;
         console.log(this.profiledata.password);
      
  })
 
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Your Profile was Updated successfully',
      duration: 3000
    });
    toast.present();
  }
}
