import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public call: CallNumber,public emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  async contactUs():Promise<any>{
    try{
      await this.call.callNumber('9884115691',true);
    }
    catch(e){
      console.error(e);
    }
  }

  EmailUs(){
    let email = {
      to: 'support@rytefix.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Your Subject',
      body: ' Enter your Query with Username' ,
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
