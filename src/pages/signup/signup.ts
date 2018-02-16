import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoginPage } from '../login/login';
import { OtpverifyPage } from '../otpverify/otpverify';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TermsPage } from '../terms/terms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, confirmPassword: string, mobile: string, area: string, city: string, password: string, gadget:string, pincode:string, image:string } = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    area: '',
    city: '',
    confirmPassword: '',
    gadget: '',
    pincode:'',
    image:'user_avatar.png'
  };
  serverData:any;
  userData:any;
  terms: boolean;
  imageURI:any;
imageFileName:any;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private camera: Camera,) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
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
      this.account.image = this.imageFileName;
      console.log(this.imageFileName);
    }, (err) => {
      console.log(err);
      this.presentToast(err);
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
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
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

  doSignup() {
    // Attempt to login in through our User service
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    console.log(JSON.stringify(this.account.gadget));
    if (this.account.name!="" && this.account.password !="" && this.account.mobile !=""&& this.account.area!="" && this.account.city!="" && this.account.confirmPassword!="" && this.account.email!=""&& this.account.pincode!=""){

      
      if(!EMAIL_REGEXP.test(this.account.email)){
        let alert = this.alertCtrl.create({
          title: 'Warning',
          subTitle: 'Invaild Email address !',
          buttons: ['OK']
        });
        alert.present();
      }else{

        if(this.account.mobile.length < 10){
          let alert = this.alertCtrl.create({
            title: 'Warning',
            subTitle: 'Please enter vaild mobile number !',
            buttons: ['OK']
          });
          alert.present();
        }
        else{

          
          if(this.account.password.length <=5) {

            let alert = this.alertCtrl.create({
              title: 'Warning',
              subTitle: 'Password should be minimum 6 characters !',
              buttons: ['OK']
            });
            alert.present();
           }
           else{
            if(this.terms == true){

              if (this.account.image == 'user_avatar.png'){
                let toast = this.toastCtrl.create({
                  message: 'please attach your profile image',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }
              else{

                console.log(this.account);
               this.user.signup(this.account).subscribe((resp) => {
              this.serverData = resp;
              console.log(this.serverData.message);
               if (this.serverData.message == 'Mobile Number already exist. Please login'){
                 let toast = this.toastCtrl.create({
                message: this.serverData.message,
                duration: 3000,
                position: 'top'
              });
              toast.present();

              }else{
                console.log('success');
                this.presentLoading();
               }
              
            }, (err) => {
        
              // Unable to sign up
              // let toast = this.toastCtrl.create({
              //   message: this.signupErrorString,
              //   duration: 3000,
              //   position: 'top'
              // });
              // toast.present();
            });
              }
              
            }
            else{

              let alert = this.alertCtrl.create({
                title: 'Warning',
                subTitle: 'Please check terms and condition !',
                buttons: ['OK']
              });
              alert.present();
             
            }
            
           } 
        }

          
      }
    }
    else {

      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Please enter all the details !',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "creating user..",
      duration: 4000
    });
    loader.present();

    setTimeout(() => {
      console.log(this.account);
      this.uploadFile();
      this.navCtrl.push(OtpverifyPage,{"data":this.account});
    }, 4000);
  }

  login(){
    this.navCtrl.push('LoginPage');
  }

  termspage(){
    this.navCtrl.push(TermsPage);
  }
 
}
