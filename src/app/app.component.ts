import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { VariablesGlobalesProvider } from '../providers/variables-globales/variables-globales';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuServiceProvider } from '../providers/menu-service/menu-service';

@Component({
  templateUrl: 'app.html',
  providers: [MenuServiceProvider]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public platform: Platform,
     statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController,
   private variables: VariablesGlobalesProvider, private menuservice: MenuServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pushsetup();
  }

  pushsetup(){
    const options: PushOptions = {
      android: {
          senderID: '735248500316'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {}
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   pushObject.on('notification').subscribe((notification: any) => {
    console.log('message', notification.message);
    if (notification.additionalData.foreground)   {
      
      let youralert = this.alertCtrl.create({
        title: notification.title,
        message: notification.message
      });
      youralert.present();
    }else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      //self.nav.push(DetailsPage, {message: data.message});
      alert(notification.title+": "+notification.message);
    }
   });
   
   pushObject.on('registration').subscribe((registration: any) => {
   //this.variables.setFcm(registration.registrationId);
   
   this.menuservice.addfmc(registration)
   .then( 
     data=>{
      console.log(data)         
   })
   .catch( error=>{console.log(error)})
    //alert('usuario registrado con token id'+ JSON.stringify(registration))
  
   });
   
   pushObject.on('error').subscribe(error => alert('error notificacion Push'+ error));
  }


}
