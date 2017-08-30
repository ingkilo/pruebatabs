import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalOnePage } from './modal-one';

@NgModule({
  declarations: [
    ModalOnePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalOnePage),
  ],
})
export class ModalOnePageModule {}
