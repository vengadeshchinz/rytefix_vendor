import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import {ServicestateProvider} from '../../providers/servicestate/servicestate';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  
  public currentItems:any[];
  public offers:any;
  public data:any;
  assignedOffers: string[];
  errorMessage: string;
  userid:any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,public serviceState:ServicestateProvider,public storage: Storage,) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

    this.GetuserData();
    // this.getAssignedServices();
  }

  getAssignedServices(userid){
    console.log("load");
      this.serviceState.getAssignedServices(userid)
        .subscribe(data =>{
          this.assignedOffers=data;
          console.log(this.assignedOffers);
        })
  }

  GetuserData(){
    
        this.storage.get('UserData')
        .then(
        data => {
          this.userid = data.userid;
          console.log("user data",this.userid);
          this.getAssignedServices(this.userid);
        },
        error => console.error(error)
      
        );
      }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
