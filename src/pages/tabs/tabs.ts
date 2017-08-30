import { Component,  NgZone } from '@angular/core';
import { Events} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';

@Component({
  templateUrl: 'tabs.html',
  providers: [MenuServiceProvider]
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  datos;
  constructor(private zone: NgZone,
              public events: Events,
              private menuservice: MenuServiceProvider,) {
    
    events.subscribe("contadorTab", (contar)=>{
      this.cargartab();
      setInterval(()=>{this.cargartab();},80000);
    });
               
  }

  cargartab(){
    this.menuservice.getCountTabs()
    .then( 
      data=>{
        if(data[0]==undefined){
          this.datos=null;
      }else{
        this.datos =data[0];
      } 
      this.zone.run(() => { this.datos });           
    })
    .catch( error=>{console.log(error)})
    /*this.zone.run(() => {  this.badge1=this.variables.getBadge1(); 
      this.badge2=this.variables.getBadge2(); */
  
  }

  
}
