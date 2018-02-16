import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the RfwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rfwallet',
  templateUrl: 'rfwallet.html',
})
export class RfwalletPage {

  payment:PayPalPayment;
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  id: any;
  mobile:any;
  password:any;
  username:any;
  walletBalance:any;
  rechargeamount:any;
  paymentId:any;
  error:any;
  status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public payPal:PayPal,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public storage: Storage,public user: User,public emailComposer: EmailComposer,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RfwalletPage');
     this.GetuserData();
  }

  razorpay(amount){

    let totalBalance = parseInt(this.walletBalance) + parseInt(amount);
    let amount1 = parseInt(amount) * 100;
    var options = {
      description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      // key: 'rzp_test_PoX33SdW7bvNh3',
      key: 'rzp_live_LzjzAifJnaLBMw',
      amount: amount1,
      name: this.username,
      prefill: {
        email: '',
        contact: this.mobile,
        name: this.username
      },
      theme: {
        color: '#7c4040'
      }
    }
    
    // var successCallback = function(payment_id) {
    //   alert('payment_id: ' + payment_id);
    //   this.paymentId = payment_id;
    //    //this.rechargeDb(this.id,totalBalance,amount);
       
    // }

    var successCallback = (payment_id) => { // <- Here!
      alert('payment_id: ' + payment_id);

      this.rechargeDb(this.id,totalBalance,amount);
    };
    
    var cancelCallback = function(error) {
      alert(error.description)
      this.error = error.description; 
      this.status = 'success';
    }

    // var cancelCallback = (error) => { // <- Here!
    //   alert(error.description + ' (Error ' + error.code + ')');
    //   // this.rechargeDb(this.id,totalBalance,amount);
    // }; 

    // RazorpayCheckout.open(options, successCallback, cancelCallback)
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
    // this.rechargeDb(this.id,totalBalance,amount);
  }



  recharge(){

    console.log(this.rechargeamount);
    if (this.rechargeamount >= 100) {
      console.log(this.rechargeamount);
      //  this.makePayment(this.rechargeamount,'USD', 'topups', 'sale');
      this.razorpay(this.rechargeamount);
      // if (this.status=='success'){
      //   alert('success');
      //   // this.rechargeDb(this.id,totalBalance,amount);
      // }else{
      //   alert('error');
      // }
    } else {
      let toast = this.toastCtrl.create({
        message: "Recharge amount should be minimum 100 Rs",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return false;
    }
  
  }

  transfer(){
    let prompt = this.alertCtrl.create({
      message: "Enter the amount to transfer to bank",
      inputs: [
        {
          name: 'amount',
          placeholder: 'enter the amount'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'request',
          handler: data => {
            // alert("thanks for requesting your amount will be transfered to you within 24hrs.");

            if (data.amount <= this.walletBalance && data.amount !="") {
              console.log(this.walletBalance);
              console.log(data.amount);
               this.sendEmail(data.amount);
            } else {
              let toast = this.toastCtrl.create({
                message: "It exceeds your wallet amount",
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
    prompt.present();

  }

  recharge500(){

    this.rechargeamount = '500';
  }
  recharge1000(){
    this.rechargeamount = '1000';
  }
  recharge1500(){
    this.rechargeamount = '1500';
  }
  rechargeDb(id,walletbalance,rechargeamount){
    let data = JSON.stringify({id,walletbalance,rechargeamount});

    // this.storage.set('UserData', {walletbalance:walletbalance})
    this.storage.set('UserData', {mobile: this.mobile,name: this.username, password: this.password, type: 'vendor',userid:this.id,walletbalance:walletbalance})

    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
    console.log("recharge DB "+ data);
    this.user.updateWallet(data).subscribe((resp) => {
      // this.navCtrl.push(MainPage);
      // this.userdata = resp;
    }, (err) => {
       this.navCtrl.push(RfwalletPage);
      // this.presentLoading();
      // Unable to log in
    });
  }
  makePayment(amount,currency,description,intent) {
    // adding the previous balance and recharge amount
    let totalBalance = parseInt(this.walletBalance) + parseInt(amount);
    console.log("total Balance"+totalBalance);

    this.payment  = new PayPalPayment(amount, currency, description, intent);
		this.payPal.init({
			PayPalEnvironmentProduction:"",
			PayPalEnvironmentSandbox: 'AU4MqR4dVIiUOrPWj7AmCbywRykBqFtO4LEmbRZLRMVV3mWi_jRY0-KWa1ik7F3jCNnSg29ItwjCKBDm'
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
          // alert(`Successfully paid. Status = ${response.response.state}`);
          alert(`Recharge Successfully`);
          this.rechargeDb(this.id,totalBalance,amount);
          
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.id = data.userid;
          this.mobile = data.mobile;
          this.username = data.name;
          this.password = data.password;
          this.walletBalance = data.walletbalance;
          console.log("user data",this.walletBalance);
          console.log('username', this.username);
        },
        error => console.error(error)
      
        );
      }

      sendEmail(amount){

            let email = {
              to: 'admin@rytefix.com',
              // cc: 'erika@mustermann.de',
              // bcc: ['john@doe.com', 'jane@doe.com'],
              // attachments: [
              //   'file://img/logo.png',
              //   'res://icon.png',
              //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
              //   'file://README.pdf'
              // ],
              subject: 'Request for transfer to bank ',
              body: 'Vendor '+this.username+' has requested for Rs.'+amount+' to transfer to their account' ,
              isHtml: true
            };

            this.emailComposer.open(email);
          }
}
