import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPage } from './job.page';

const routes: Routes = [
  {
    path: '',
    component: JobPage
  },  {
    path: 'signature',
    loadChildren: () => import('./signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'machines',
    loadChildren: () => import('./machines/machines.module').then( m => m.MachinesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPageRoutingModule {}
