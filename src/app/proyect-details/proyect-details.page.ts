import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ViewmapPage } from '../works/viewmap/viewmap.page';
import { ServerService } from '../service/server.service';
import { JobPage } from '../job/job.page'; 

@Component({
  selector: 'app-proyect-details',
  templateUrl: './proyect-details.page.html',
  styleUrls: ['./proyect-details.page.scss'],
})
export class ProyectDetailsPage implements OnInit {

  data:any;
  constructor(
    public server: ServerService,
    public nav: NavController,
    public modalController: ModalController,
    public platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.platform.ready().then(() => {
      this.data = JSON.parse(localStorage.getItem('serviceView'));
      console.log(this.data);
    });
  }

  back()
  {
    this.nav.back();
  }

  async viewDetails(service) {

    const modal = await this.modalController.create({
      component: ViewmapPage,
      animated:true,
      mode:'ios',
      cssClass: 'my-custom-modal-info-order-css',
      backdropDismiss:true, 
      breakpoints: [0,0.5,0.8,1],
      initialBreakpoint: 0.8,
      componentProps: {
        'odata': JSON.stringify(service)
      }
    });

    modal.onDidDismiss().then(data=>{
     
    })

    return await modal.present();
  }

  async addJob(dataInfo) {
    const modal = await this.modalController.create({
      component: JobPage,
			componentProps: { value: dataInfo },
      animated:true,
      backdropDismiss:true,
    });

    modal.onDidDismiss().then(data=>{
      if (data.data === 'success') {
        this.nav.navigateRoot('/tabs/works');
      }
    });

    return await modal.present();
  }
}
