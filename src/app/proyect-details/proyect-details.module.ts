import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectDetailsPageRoutingModule } from './proyect-details-routing.module';

import { ProyectDetailsPage } from './proyect-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectDetailsPageRoutingModule
  ],
  declarations: [ProyectDetailsPage]
})
export class ProyectDetailsPageModule {}
