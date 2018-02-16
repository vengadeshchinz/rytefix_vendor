import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "John",
        "profilePic": "assets/img/speakers/bear.png",
        "about": "Display Issue.",
        "gadget":"mobile",
        "Make":"samsung",
        "Model":"s8",
        "Software":"OS Corrupted",
        "Hardware":"",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2018-01-18",
        "mobile":"967584313432"
      },
      {
        "name": "Kanna",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "HardDisk fault",
        "gadget":"Laptop",
        "Make":"Lenovo",
        "Model":"AS2345f",
        "Software":"",
        "Hardware":"Hard Disk Failure",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2017-07-18",
        "mobile":"9087456321"
      },
      {
        "name": "Donald",
        "profilePic": "assets/img/speakers/duck.jpeg",
        "about": "Os Currupted",
        "gadget":"mobile",
        "Make":"Redmi",
        "Model":"A1",
        "Software":"",
        "Hardware":"",
        "Others":"Hanging issue",
        "PickupStatus":"no",
        "Postedon":"2018-01-18",
        "mobile":"8940576321"
      },
      {
        "name": "Suyambu",
        "profilePic": "assets/img/speakers/eagle.png",
        "about": "Heating issue.",
        "gadget":"mobile",
        "Make":"samsung",
        "Model":"j4",
        "Software":"Camera corrupted",
        "Hardware":"",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2018-01-18",
        "mobile":"967584313432"
      },
      {
        "name": "Jo",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Camera Not opening.",
        "gadget":"mobile",
        "Make":"samsung",
        "Model":"s8",
        "Software":"OS Corrupted",
        "Hardware":"",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2018-01-18",
        "mobile":"7449807632"
      },
      {
        "name": "Ram",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Touch not working.",
        "gadget":"mobile",
        "Make":"samsung",
        "Model":"s8",
        "Software":"OS Corrupted",
        "Hardware":"",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2018-01-18",
        "mobile":"967584313432"
      },
      {
        "name": "Paul",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "OS currupted.",
        "gadget":"mobile",
        "Make":"samsung",
        "Model":"s8",
        "Software":"OS Corrupted",
        "Hardware":"",
        "Others":"",
        "PickupStatus":"yes",
        "Postedon":"2018-01-18",
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
