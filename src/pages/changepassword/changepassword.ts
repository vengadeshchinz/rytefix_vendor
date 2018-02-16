import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { MenufaqProvider } from '../../providers/menufaq/menufaq';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import {TabsPage} from '../tabs/tabs';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  private changepw:FormGroup;
  public password: any;
  id:any;
  public confirmpassword:any;
  public submit:boolean=false;
 show:boolean=false;
  type:any="password";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public passwordapi:MenufaqProvider,private formBuilder: FormBuilder,public toastCtrl: ToastController,public storage: Storage) {
      this.changepw=this.formBuilder.group({
        password:['',Validators.required],
        confirmpassword:['',Validators.required],
      });
      this.GetuserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  GetuserData(){
    
    this.storage.get('UserData')
    .then(
    data => {
      this.id = data.userid;
      console.log("user id",this.id);
    },
    error => console.error(error)
  
    );
  }
  showPw(){
    if(this.show==false){
      this.show=true;
      this.type="text";
    }
    else{
      this.show=false;
      this.type="password";
    }
  }

 chPassword(){
    if(this.submit==false){
      this.submit=true;
    }
    else 
    {
     this.gotoSubmit();
    }
   
  }
  gotoSubmit(){
    if(this.submit==true){
    console.log("password",this.password);
    console.log("confirmpassword",this.confirmpassword);
    let data={"password":this.password,"confpw":this.confirmpassword,"id":this.id};
     if(this.password == this.confirmpassword)
     {
       this.passwordapi.changePassword(data).subscribe(data =>{
         console.log("password",this.password);
         console.log("password",data);
         this.presentToast();
         this.navCtrl.setRoot(HomePage);
        }),error =>{
          console.log(error);
          
        }
      }
     }
     else{
       this.submit=false;
     }
   }
   presentToast() {
     let toast = this.toastCtrl.create({
       message: 'Your password was changed successfully',
       duration: 3000
     });
     toast.present();
   }

   gotoTabspage(){
    this.navCtrl.push(TabsPage);
  }
}
