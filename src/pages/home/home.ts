import { Component, NgZone } from '@angular/core';
import { ModalController, Events} from 'ionic-angular';
import { Http } from '@angular/http';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';
import { ModalOnePage } from '../modal-one/modal-one';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuServiceProvider],
})
export class HomePage {
  datos;
  delmodal:string;
  contar: number;

  constructor(private zone: NgZone,
                public http: Http, 
                public menuservice: MenuServiceProvider,
                private modalCtrl: ModalController,
                private variables: VariablesGlobalesProvider,
                public events: Events
               
  ) {

          
    

  }

  ionViewWillEnter(){
    this.cargardatos(); 
  }

  cargardatos(){
  this.menuservice.getAllPedido()
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
      this.variables.setBadge1(this.contar);             
      this.events.publish("contadorTab", this.contar);
    })
    .catch( error=>{console.log(error)})
    
  }

  openModal(varid) {
    
    
    let myModal = this.modalCtrl.create(ModalOnePage,{ idPedido: varid});
    myModal.onDidDismiss(data => {
      this.delmodal = data;
      if(data =='actualiza'){
        this.updatedatos();
      }
      
    });
    myModal.present();
  }

  updatedatos(){ 
    this.cargardatos(); 
  }

  
}
