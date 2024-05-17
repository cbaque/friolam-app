import { ModalController, NavController, Platform } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewmapPage } from './viewmap/viewmap.page';
import { ServerService } from '../service/server.service';
import { interval } from 'rxjs';
import { JobPage } from '../job/job.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { jsPDF } from "jspdf";
import { EditJobComponent } from '../job/edit-job/edit-job.component';
@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit, OnDestroy {

  pet:number = 1;
  chkServiceTimer:any;
  data:any;
	dataArray: any;
	loading: any = 2;
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController,
    public server: ServerService,
    public platform: Platform,
		private launchNavigator: LaunchNavigator
    ) { }

  ngOnInit() {
		this.loading = 1;
		// this.loadData();
  }

	/*ngAfterViewInit() {
		console.log('destroy 1');
	}*/

	ngOnDestroy() {
		console.log('destroy');
		this.chkServiceTimer.unsubscribe();
	}

	reload() {

	}

  ionViewWillEnter()
  {
    this.platform.ready().then(() => {
			this.loadData();
      // this.chkServiceTimer = interval(1500).subscribe(() => {
        this.loadData();
      // });
    });
  }

  ionViewDidLeave(){
		console.log('destroy 1');
    // this.chkServiceTimer.unsubscribe();
  }

  viewWork(service)
  {
    // localStorage.setItem('serviceView',JSON.stringify(service));
    // this.navCtrl.navigateForward('/tabs/proyect-details');
		this.addJob(service);
  }

  

	async addJob(dataInfo) {
    const modal = await this.modalController.create({
      component: JobPage,
			componentProps: { value: dataInfo.service },
      animated:true,
      backdropDismiss:true,
    });

    modal.onDidDismiss().then(data=>{
      if (data.data === 'success') {
        this.ionViewWillEnter()
      }
    });

    return await modal.present();
  }

	async callRoute(data) {
		// console.log('hey');
		const coords = await this.server.getGeolocationShow();
		if (coords === null) {
			this.server.presentToast('Problemas para obtener tu ubicacion actual','danger','top');
			return;
		}
		const coordinatesCurrent = coords.lat+','+coords.lng;
			const options: LaunchNavigatorOptions = {
				start: coordinatesCurrent,
				app: this.launchNavigator.APP.GOOGLE_MAPS,
				launchModeGoogleMaps:  'turn-by-turn',
				extras: {navigate: 'yes' },
			};
      
			// eslint-disable-next-line max-len
			this.launchNavigator.navigate(`${data.service.subclient.comuna},${data.service.subclient.direccion},${data.service.subclient.numero}`, options)
				.then(
					success => console.log('Launched navigator'),
					error => console.log('Error launching navigator', error)
				);
	}

	async viewDetails(service) {

    const modal = await this.modalController.create({
      component: ViewmapPage,
      animated:true,
      mode:'ios',
      cssClass: 'my-custom-modal-info-order-css',
      backdropDismiss:true,
      componentProps: {
        'odata': JSON.stringify(service.service)
      }
    });

    modal.onDidDismiss().then(data=>{
     
    })

    return await modal.present();
  }

	public getItems(ev): any{
    // Reset items back to all of the items
    this.data=this.dataArray;
    // set val to the value of the ev target
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.data = this.data.filter((item) => (item.service.service_name.toLowerCase().indexOf(val.toLowerCase()) > -1));
    }
  }

  public descargarInfoPDF(srv: any) {
    const doc = new jsPDF();

    // Agregar la información del trabajo al PDF
    doc.text(`Sub cliente: ${srv.service.subclient.razon_social}`, 10, 10);
    doc.text(`Nombre fantasia: ${srv.service.fantasia}`, 10, 20);
    doc.text(`Servicio: ${srv.service.service_name}`, 10, 30);
    doc.text(`Cliente: ${srv.service.client.name}`, 10, 40);
    doc.text(`Fecha del servicio: ${srv.service.created_at}`, 10, 50);
    doc.text(`Observaciones: ${srv.service.observations}`, 10, 60);

    // Guardar y descargar el PDF
    doc.save('info_trabajo_terminado.pdf');
  }

  loadData()
  {
		this.loading = 2;
    this.server.chkServices(localStorage.getItem('user_id')).subscribe((data:any) => {
        if (data.data !== 'fail') {
          this.data = data.data;
					this.dataArray = this.data;
					this.loading = 1;
        }else {
          this.server.presentToast("Algo ha ocurrido, por favor intenta más tarde.","danger","top");
        }
    });
  }
 

  async TripAcepted() {

    const modal = await this.modalController.create({
      component: ViewmapPage,
      animated:true,
      mode:'ios',
      cssClass: 'my-custom-modal-info-order-css',
      backdropDismiss:true, 
      breakpoints: [0,0.5,0.8,1],
      initialBreakpoint: 0.8,
      componentProps: {
        'odata': []
      }
    });

    modal.onDidDismiss().then(data=>{
     
    })

    return await modal.present();
  }

  whatsappLink(phone,comm_id)
  {
    location.href = "https://wa.me/56"+phone+"?text="+encodeURIComponent('Hola, ingresa a este link para revisar tu guía: https://dash.friolam.cl/servicio-publico/' + comm_id);
    
  }

  async edit(data: any) {
    const modal = await this.modalController.create({
      component: EditJobComponent,
			componentProps: { data: data.service } ,
      animated:true,
      backdropDismiss:true,
    });

    return await modal.present();
  }
}
