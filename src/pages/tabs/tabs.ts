import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactusPage } from '../contactus/contactus';

import{FaqPage} from '../faq/faq';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = FaqPage;
  tab3Root: any = ContactusPage;

  tab1Title = "Home";
  tab2Title = "FAQ";
  tab3Title = "Contact Us";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    
  }
}
