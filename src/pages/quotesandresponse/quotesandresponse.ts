import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { Quote } from '@angular/compiler';
import { CallNumber } from '@ionic-native/call-number';
import { ViewresponsePage } from '../viewresponse/viewresponse';
import { LoadingController } from 'ionic-angular';
import { EditQuotePage } from '../edit-quote/edit-quote';
import { User } from '../../providers/providers';





/**
 * Generated class for the QuotesandresponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotesandresponse',
  templateUrl: 'quotesandresponse.html',
})
export class QuotesandresponsePage {

  userid:any;
  quotes:any;
  problem:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public serviceState:ServicestateProvider,private callNumber: CallNumber,public loadingCtrl: LoadingController,
  public user: User,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesandresponsePage');
    //to get userid from local storage
    this.GetuserData();
    // api service call to get quotes and response
    
  }

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.userid = data.userid;
          console.log("userID",this.userid);
          this.getQuotes(this.userid);
        },
        error => console.error(error)
      
        );
      }

      getQuotes(uid){
        console.log("load");
          this.serviceState.quoteAndResponse(uid)
            .subscribe(data =>{
              this.quotes=data.offers;
              console.log(this.quotes);
            })
      }

      call(item){
        let  details: { userid: string , bookingid: string} = {
          userid: this.userid,
          bookingid : item.booking_id
        }

        this.callNumber.callNumber(item.mobile, true)
        .then(() => console.log('Launched dialer!'))
         .catch(() => console.log('Error launching dialer'));

// updating call status to the server
        this.user.updateCallStatus(details).subscribe((resp) => {
          
          // alert( details);

        }, (err) => {
          // error
          console.log(err);
    
        });
    
      }


      getQuoteproblem(uid,bid){
        
                this.serviceState.getProblem(uid,bid)
                .subscribe(data =>{
                  this.problem = data;
                   console.log(this.problem);
                  //  console.log(this.bid);
                })
              //  console.log(this.bid);
          }

      openView(item){
        
        this.getQuoteproblem(this.userid,item.booking_id);

        let loader = this.loadingCtrl.create({
          content: "Fetching..",
          duration: 3000
        });
        loader.present();
    
        setTimeout(() => {
          this.navCtrl.push(ViewresponsePage,{"data":item,"problem":this.problem});
                }, 1000);
      }

      editQuote(item){
        this.getQuoteproblem(this.userid,item.booking_id);

        let loader = this.loadingCtrl.create({
          content: "Fetching..",
          duration: 3000
        });
        loader.present();
    
        setTimeout(() => {
          this.navCtrl.push(EditQuotePage,{"data":this.problem.data});
                }, 1000);
      }

       chat(){
         console.log("chat");
       } 
       
       

}
