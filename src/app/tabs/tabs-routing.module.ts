import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../account/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'job',
        loadChildren: () => import('../job/job.module').then( m => m.JobPageModule)
      },
      {
        path: 'works',
        loadChildren: () => import('../works/works.module').then( m => m.WorksPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'team',
        loadChildren: () => import('../team/team.module').then( m => m.TeamPageModule)
      },
      {
        path: 'contracts',
        loadChildren: () => import('../contracts/contracts.module').then( m => m.ContractsPageModule)
      },
      {
        path: 'proyect-details',
        loadChildren: () => import('../proyect-details/proyect-details.module').then( m => m.ProyectDetailsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
