import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuServiceProvider {

  constructor(public http: Http) {
  }



  getAllPedido(){
    return new Promise( 
      resolve =>{
        this.http.get("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com/restaurante/public/pedido/all")
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error=>{
            console.log(error);
          }
        )

      }      
    );
  }

  getAllPreparar(){
    return new Promise( 
      resolve =>{
        this.http.get("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public/preparar/all")
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error=>{
            console.log(error);
          }
        )

      }      
    );
  }

  getPedidoDetalle(varid){
    return new Promise( 
      resolve =>{
        this.http.get("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public/pedido/datospedido/id/"+varid)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )

      }      
    );
  }

  updateConfirmar(varid){
    return new Promise( 
      resolve =>{
        this.http.put("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public/update",varid )
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )

      }      
    );
  }

  updateReset(){
    return new Promise( 
      resolve =>{
        this.http.put("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public/update/reset","")
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )

      }      
    );
  }

  getCountTabs(){
    return new Promise( 
      resolve =>{
        this.http.get("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com/restaurante/public/tabs/count")
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error=>{
            console.log(error);
          }
        )

      }      
    );
  }

  addfmc(varid){
    return new Promise( 
      resolve =>{
        this.http.post("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public//userfmc/add",varid)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )

      }      
    );
  }


  mensajes(varid){
    return new Promise( 
      resolve =>{
        this.http.post("http://ec2-34-210-104-170.us-west-2.compute.amazonaws.com:80/restaurante/public/mensajes",varid)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err=>{
            console.log(err);
          }
        )

      }      
    );
  }

  configurartiempo(){
    setInterval(()=>{this.getAllPedido();},3000);
  }


  cargardatos(){
    this.getAllPedido;
    this.configurartiempo;
  }
}
