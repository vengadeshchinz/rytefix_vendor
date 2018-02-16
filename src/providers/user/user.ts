import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login.php', accountInfo).share();
    // let seq = this.api.post('notificationapi.php', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res.data);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  userInfo(accountInfo: any) {
    let seq = this.api.post('userInfo.php', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
       console.log("success");
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }


  updateWallet(walletinfo:any){

    console.log(walletinfo);
    let seq = this.api.post('rechargeWallet.php', walletinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  updateCreditWallet(walletinfo:any){
    
        console.log(walletinfo);
        let seq = this.api.post('updateWallet.php', walletinfo).share();
    
        seq.subscribe((res: any) => {
          // If the API returned a successful response, mark the user as logged in
          console.log(res);
        }, err => {
          console.error('ERROR', err);
        });
        
    
        return seq;
      }

      declineQuote(details:any){
        
            console.log(details);
            let seq = this.api.post('declineQuote.php', details).share();
        
            seq.subscribe((res: any) => {
              // If the API returned a successful response, mark the user as logged in
              console.log(res);
            }, err => {
              console.error('ERROR', err);
            });
            
        
            return seq;
          }

     updateCallStatus(details:any){

      let seq = this.api.post('updateCallStatus.php',details).share();

      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark status is updated
       console.log(res);
      }, err => {
        console.error('ERROR', err);
      });
  
      return seq;
     }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    console.log("register data: " , accountInfo);
    let seq = this.api.post('register.php', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
      else{
        console.log(res);
        this._loggedIn(res.message);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
