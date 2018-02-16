import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
 import { Http,Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the MenufaqProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenufaqProvider {

  constructor(public http: Http) {
    console.log('Hello MenufaqProvider Provider');
  }

  getFaq(){
    return this.http.get('http://sunrisetechs.com/api/vendorapi.php?action=getfaqData')
    .map(res =>{ 
      console.log(res.json());
      return res.json()
    })
  }

  getProfile(data){
    let data1=JSON.stringify(data)
    return this.http.get('http://sunrisetechs.com/api/venresnewapi.php?action=viewprofile&uid='+data.id)
    .map(res =>{ 
      console.log(res.json());
      return res.json()
    })
  }

  updateProfile(data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data1= JSON.stringify(data);
    return this.http.post('http://sunrisetechs.com/api/updateapi.php?action=updateprofile&id='+data.id+'&username='+data.username+'&area='+data.area+'&street='+data.street+'&pincode='+data.pincode+'&city='+data.city+'&profile_pic='+data.profilepic,options)
    .map (result =>{
      return result.json()})
  }

  changePassword(data)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
     let data1= JSON.stringify(data);
   
  return this.http.post('http://sunrisetechs.com/api/updateapi.php?action=changepassword&id='+data.id+'&password='+data.password+'&confirm_password='+data.confpw,options)
        .map(res =>{ 
      console.log(res.json());
      return res.json()
    })
  }
  getMylocation(data)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    console.log("apidata",data);
    return this.http.post('http://sunrisetechs.com/api/vendorapi.php?action=getLocation&latitude='+data.lat+'&longitude='+data.lng+'&id='+data.id,options)
    .map (result =>{
      //console.log(data)
      return result.json()})
  }
  changeLocation(chdata){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    console.log("api",chdata)
    let data1= JSON.stringify(chdata);
    return this.http.post('	http://sunrisetechs.com/api/updateapi.php?action=updatelatlon&id='+chdata.id+'&latitude='+chdata.lat+'&longitude='+chdata.lng,options)
    .map (result =>{
      console.log("api",chdata)
      return result.json()})
  }
}
