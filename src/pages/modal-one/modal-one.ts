import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';
import { VariablesGlobalesProvider } from '../../providers/variables-globales/variables-globales';
/**
 * Generated class for the ModalOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-one',
  templateUrl: 'modal-one.html',
  providers: [MenuServiceProvider],
})
export class ModalOnePage {
  datos;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              private menuservice: MenuServiceProvider,
              private zone: NgZone,
              private variables: VariablesGlobalesProvider) {
  }

  ionViewDidLoad(){
    this.cargardatos();
  }

  cargardatos(){
    this.menuservice.getPedidoDetalle(this.navParams.get('idPedido'))
    .then( 
      data=>{
        if(data[0]==undefined){
          this.datos=null;
      }else{
        this.datos =data;
      } 
      this.zone.run(() => { this.datos });           
    })
    .catch( error=>{console.log(error)})
   }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  confirmar(){
    this.menuservice.updateConfirmar({ id: this.navParams.get('idPedido'), fmc:this.variables.getFcm() });
    this.viewCtrl.dismiss('actualiza');
    this.menuservice.mensajes({ mensaje: "se ha confirmado pedido", titulo:"Nuevo estado" })
  }

}
