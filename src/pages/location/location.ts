import { Component,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import {MenufaqProvider} from '../../providers/menufaq/menufaq';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { MainPage } from '../pages';
import { Storage } from '@ionic/storage';
declare var google:any;
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  map:any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  infoWindow:any;
  alertbtn: any;
  resbtn: any;
  marker: any;
  mapview: any;
  owner: any;
  address: any;
  othersAddress: any;
  ownerbtn: any;
  LastLng1: any;
    LastLat1: any;
    currentlat:any;
    currentlng:any;
    id:any;
    responseData:any;
    @ViewChild('map') mapElement:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public locationapi:MenufaqProvider,private geolocation: Geolocation,private platform:Platform,public storage: Storage) {
      this.responseData=this.navParams.get("data");
      console.log(this.responseData);
      console.log(this.responseData.id);
      this.mapload();
      this.GetuserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');

    this.mapload();
    console.log("data");
  }
  GetuserData(){
    
    this.storage.get('UserData')
    .then(
    data => {
      this.id = data.userid;
      // console.log("user id",this.id);
    },
    error => console.error(error)
  
    );
  }
 
  addMarker() {
    console.log("test");
    let marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
   
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
     google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
     this.othersAddress = "This is your current position";
     });
     this.lastLatLng(marker);
     
  }

  mapload() {
    // this.loadMap(13.08648395538330,80.27350616455078 );
    let geocoder = new google.maps.Geocoder();
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;
      console.log(pos);
      console.log(pos.coords.latitude + ',' + pos.coords.longitude)
   this.currentlat=pos.coords.latitude;
   this.currentlng=pos.coords.longitude;
     // this.gotoMylocation(this.currentlat,this.currentlng);
      let latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let request = { latLng: latlng };
      // console.log(this.LastLat1+','+this.LastLng1);
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {

           console.log(results[0]);
          //   this.alertbtn="N";
          //  this.resbtn="";
        this.othersAddress = results[0].formatted_address;
         // console.log(this.othersAddress);

        }
        else {

          console.log('Cannot determine address at this location.' + status);
        }
      });
      this.loadMap(pos.coords.latitude, pos.coords.longitude);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });

  }
  loadMap(lat, long) {
   
  
    console.log("lat and lang")
    let latLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
   
  }
  lastLatLng(marker) {
    console.log("map drag")
    let geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(marker,'dragend', () => {
        this.LastLat1= marker.position.lat();
        this.LastLng1= marker.position.lng();

      console.log("map move");
      //this.LastLat1 = this.map.getCenter().lat();
      //this.LastLng1 = this.map.getCenter().lng();
      var coord = new Array();
      coord.push(this.LastLat1, this.LastLng1);
      console.log(coord[0] + ',' + coord[1]);
      let latlng = new google.maps.LatLng(this.LastLat1, this.LastLng1);
      let request = { latLng: latlng };
      console.log(this.LastLat1 + ',' + this.LastLng1);
      geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {

          this.othersAddress = results[0].formatted_address;
          console.log(this.othersAddress);
         // this.getGustAddress(results[0], coord);

        }
        else {
        
          this.othersAddress = "Cannot determine address at this location.";
          console.log(this.othersAddress);
          console.log('Cannot determine address at this location.' + status);
        }
      });
    });
  }
  gotoMylocation(lat,lng){
    console.log("current location")
    let data={'id':this.id,'lat': this.currentlat,'lng': this.currentlng}
    console.log(this.currentlat, this.currentlng);
    this.locationapi.getMylocation(data).subscribe(data =>{
  console.log(data);
    }),error =>{
      console.log(error);
    } 
}
changeMylocation(){
  console.log("change location")
  let chdata={'id':this.responseData.id,'lat': this.LastLat1,'lng': this.LastLng1}
  console.log("current",this.LastLat1, this.LastLng1);
  this.locationapi.changeLocation(chdata).subscribe(data =>{
console.log(chdata);
this.navCtrl.push('LoginPage');
  }),error =>{
    console.log(error);
  } 
}
}
