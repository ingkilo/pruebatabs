import { Component, NgZone } from '@angular/core';
import { ModalController, Events} from 'ionic-angular';
import { Http } from '@angular/http';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';
import { ModalTwoPage } from '../modal-two/modal-two';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [MenuServiceProvider],
})
export class AboutPage {
  datos;
  contar: number;
  constructor(private zone: NgZone,
                public http: Http, 
                public menuservice: MenuServiceProvider,
                private modalCtrl: ModalController,
                private variables: VariablesGlobalesProvider,
                public events: Events) {

  }


  ionViewWillEnter(){
    this.cargardatos(); 
  }

  cargardatos(){
  this.menuservice.getAllPreparar()
  .then( 
    data=>{
      if(data[0]==undefined){
          this.datos=null;
          this.contar=0; 
      }else{
        this.datos =data;
        this.contar= this.datos.length;
      }   
      this.zone.run(() => { this.datos });  
      this.variables.setBadge2(this.contar);
      this.events.publish("contadorTab", this.contar);       
    })
    .catch( error=>{console.log(error)})
  }

  openModal(varid) {
    let myModal = this.modalCtrl.create(ModalTwoPage,{ idPedidoa: varid});
    myModal.present();
  }

  reset(){
    this.menuservice.updateReset();
    this.cargardatos(); 
  }


}
