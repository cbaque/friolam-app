import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobPageRoutingModule } from './job-routing.module';
 
import { JobPage } from './job.page';
import { ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './edit-job/edit-job.component';

@NgModule({
  imports: [
    CommonModule,
		ReactiveFormsModule ,
    FormsModule,
    IonicModule,
    JobPageRoutingModule,
    
  ],
  declarations: [JobPage, EditJobComponent]
})
export class JobPageModule {}
