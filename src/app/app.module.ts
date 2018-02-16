import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {HttpModule} from '@angular/http';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ListMasterPage } from '../pages/list-master/list-master';
import { PaypalPage } from '../pages/paypal/paypal';
import { RfwalletPage } from '../pages/rfwallet/rfwallet';
import{FaqPage} from '../pages/faq/faq';
import {LocationPage} from '../pages/location/location';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { RechargehistoryPage } from '../pages/rechargehistory/rechargehistory';
import { RftabsPage } from '../pages/rftabs/rftabs';
import { ServicestateProvider } from '../providers/servicestate/servicestate';
import { ServicestatementPage } from '../pages/servicestatement/servicestatement';
import { QuotesandresponsePage } from '../pages/quotesandresponse/quotesandresponse';
import { CallNumber } from '@ionic-native/call-number';
import { ViewresponsePage } from '../pages/viewresponse/viewresponse';
import { EmailComposer } from '@ionic-native/email-composer';
import { EditQuotePage } from '../pages/edit-quote/edit-quote';
import { Keyboard } from '@ionic-native/keyboard';
import { Firebase } from '@ionic-native/firebase';
import { ContactusPage } from '../pages/contactus/contactus';
//import { Device } from '@ionic-native/device';
import { MenufaqProvider } from '../providers/menufaq/menufaq';
import { AppRate } from '@ionic-native/app-rate';

import { Geolocation } from '@ionic-native/geolocation';
import {  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
 // CameraPosition,
  //MarkerOptions,
 // Marker
} from '@ionic-native/google-maps'
import { OtpverifyPage } from '../pages/otpverify/otpverify';
import { ProfilelocationPage } from '../pages/profilelocation/profilelocation';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { CredithistoryPage } from '../pages/credithistory/credithistory';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TermsPage } from '../pages/terms/terms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TutorialPage } from '../pages/tutorial/tutorial';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    ListMasterPage,
    PaypalPage,
    RfwalletPage,
    RechargehistoryPage,
    RftabsPage,
    ServicestatementPage,
    QuotesandresponsePage,
    ViewresponsePage,
    EditQuotePage,
    ContactusPage,
    FaqPage,
    LocationPage,
    OtpverifyPage,
    ProfilelocationPage,
    ForgotpasswordPage,
    CredithistoryPage,
    TermsPage,
    TutorialPage
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage,
    ListMasterPage,
    PaypalPage,
    RfwalletPage,
    RechargehistoryPage,
    RftabsPage,
    ServicestatementPage,
    QuotesandresponsePage,
    ViewresponsePage,
    EditQuotePage,
    ContactusPage,
    FaqPage,
    LocationPage,
    OtpverifyPage,
    ProfilelocationPage,
    ForgotpasswordPage ,
    CredithistoryPage  ,
    TermsPage,
    TutorialPage
    

  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    NativeStorage,
    SplashScreen,
    StatusBar,
    PayPal,
    CallNumber,
    EmailComposer,
    MediaCapture ,
    Keyboard,
    Firebase,
    Push,
    //Device,
    AppRate,
    Geolocation,
    GoogleMaps,
    AppRate,
    SocialSharing,
    Media,
    File,
    FileTransfer,
    AndroidPermissions,
    
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiServiceProvider,
    ServicestateProvider,
    MenufaqProvider,
  ]
})
export class AppModule { }
