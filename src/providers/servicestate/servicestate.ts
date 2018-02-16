import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
 import { Http,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServicestateProvider {

  apiUrl:any = 'http://sunrisetechs.com/api/vendorapi.php?action=getMyOffers&uid=8361';

  constructor(public http: Http) {
    console.log('Hello ServicestateProvider Provider');
  }

  // api call to get get assigned customers by admin

  getAssignedServices(userid){
   
      console.log("servicest userid:",userid)
    // return this.http.get("http://rytefix.in/apitest/vendorapinew.php?action=newServiceDetails&vid="+userid)
    return this.http.get("http://sunrisetechs.com/api/vendorapinew.php?action=newServiceDetails&vid="+userid)
    .map(res =>{ 
       console.log(res.json());
      return res.json()
    })
    
  }

  // api call for sending quotes to respective customer
  sendQuote(data)
  {
    console.log(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    // return this.http.post("http://rytefix.in/apitest/vendorapinew.php?action=placeQuote&uid="+data.uid +"&price="+data.price+"&tdate="+data.tdate+"&pickup="+data.pickup+"&audio='audioattached'&description="+data.description+"&warranty="+data.warranty+"&customer="+data.customerid+"&booking_id="+data.bookingid+'&second_quality_price='+data.SecQualityprice+'&audio='+data.audio,data,options)
    return this.http.post("http://sunrisetechs.com/api/vendorapinew.php?action=placeQuote&uid="+data.uid +"&price="+data.price+"&tdate="+data.tdate+"&pickup="+data.pickup+"&audio='audioattached'&description="+data.description+"&warranty="+data.warranty+"&customer="+data.customerid+"&booking_id="+data.bookingid+'&second_quality_price='+data.SecQualityprice+'&audio='+data.audio,data,options)
    .map (result =>{
      // console.log(data)
      // return result.json()
    })
  }

  // api call for getting service statement

  getStatement(uid,fdate,tdate){
    let fdata={"fdate":fdate};
    let tdata={"tdate":tdate};
       let data1= JSON.stringify(fdata);
     
       let data2= JSON.stringify(tdata);
       console.log(fdata);
       console.log(tdata);
       console.log("uid",uid);
      // return this.http.get('http://rytefix.in/apitest/vendorapi.php?action=searchStatement&uid='+uid+'&fdate='+ fdate + '&tdate=' + tdate)
      return this.http.get('http://sunrisetechs.com/api/vendorapi.php?action=searchStatement&uid='+uid+'&fdate='+ fdate + '&tdate=' + tdate)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
       
      })
    }

    // api call for getting quotes and response

    quoteAndResponse(uid){
      // return this.http.get('http://rytefix.in/apitest/vendorapi.php?action=getQuotedOffers&uid='+uid)
      return this.http.get('http://sunrisetechs.com/api/vendorapi.php?action=getQuotedOffers&uid='+uid)
    
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
     
    }

    getProblem(uid,bid){
      console.log("uid",uid);
      // return this.http.get('http://rytefix.in/apitest/venresnewapi.php?action=vendorResponse&uid='+uid+'&bid='+bid)
      return this.http.get('http://sunrisetechs.com/api/venresnewapi.php?action=vendorResponse&uid='+uid+'&bid='+bid)
      
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
     
    }
    // http://sunrisetechs.com/api/walletSystemapi.php?action=topuphistory&uid=1724

    TopupHistory(uid){
      // return this.http.get('http://rytefix.in/apitest/walletSystemapi.php?action=topuphistory&uid='+uid)
      return this.http.get('http://sunrisetechs.com/api/walletSystemapi.php?action=topuphistory&uid='+uid)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
     
    }

    verifyOTP(uid,otp){
      console.log("uid",uid);
      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=verifyOTP&id='+uid+'&user_otp='+otp)
       return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=verifyOTP&id='+uid+'&user_otp='+otp)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }
    forgotpassotp(mobile){
      console.log("mobile",mobile);
      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=forgotpassword&mobile='+mobile)
      return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=forgotpassword&mobile='+mobile)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }
    forgotpasschange(mobile,otp,password){
      console.log("mobile",mobile);
      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=update_password&mobile='+mobile+'&user_otp='+otp+'&password='+password)
      return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=update_password&mobile='+mobile+'&user_otp='+otp+'&password='+password)

      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }

    creditDebit(uid,credit,cid,bid){

      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=debit&vid='+uid+'&status=debit&credit2='+credit+'&cid='+cid+'&bid='+bid)

      return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=debit&vid='+uid+'&status=debit&credit2='+credit+'&cid='+cid+'&bid='+bid)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }

    creditRefund(uid,credit,cid,bid){
      console.log("user id ",uid);
      console.log("credit ",credit);
      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=debit&vid='+uid+'&status=refund&credit2='+credit+'&cid='+cid+'&bid='+bid)
      return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=debit&vid='+uid+'&status=refund&credit2='+credit+'&cid='+cid+'&bid='+bid)

      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }

    creditHistory(uid){
      console.log("user id ",uid);
      // return this.http.get('http://rytefix.in/apitest/updateapi.php?action=credit_history&vid='+uid)
      return this.http.get('http://sunrisetechs.com/api/updateapi.php?action=credit_history&vid='+uid)
      .map(res =>{ 
        console.log(res.json());
        return res.json()
      })
    }
}
