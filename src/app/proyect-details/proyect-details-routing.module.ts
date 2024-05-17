import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectDetailsPage } from './proyect-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectDetailsPageRoutingModule {}
