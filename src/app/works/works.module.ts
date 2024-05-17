import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksPageRoutingModule } from './works-routing.module';

import { WorksPage } from './works.page';
import { EditJobComponent } from '../job/edit-job/edit-job.component';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksPageRoutingModule,
  ],
  declarations: [WorksPage]
})
export class WorksPageModule {}
