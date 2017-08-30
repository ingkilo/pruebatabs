import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MenuServiceProvider } from '../../providers/menu-service/menu-service';

/**
 * Generated class for the ModalTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-two',
  templateUrl: 'modal-two.html',
  providers: [MenuServiceProvider],
})
export class ModalTwoPage {
  datos;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private menuservice: MenuServiceProvider,
              private zone: NgZone) {
  }

  ionViewDidLoad(){
    this.cargardatos();
  }

  cargardatos(){
    this.menuservice.getPedidoDetalle(this.navParams.get('idPedidoa'))
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

}
