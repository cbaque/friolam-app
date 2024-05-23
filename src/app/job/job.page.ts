import { LoadingController, ModalController, Platform, NavParams } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ServerService } from '../service/server.service'; 
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { SignaturePage } from './signature/signature.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MachinesPage } from './machines/machines.page';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})

export class JobPage implements OnInit { 
  	@Input() odata:any;
 
	// Disable camale case for use api structure
	signatureString: string;
	authForm: FormGroup;

	
  	data: IDataService = {
		code_error: '',
		created_at: '',
		factura: '',
		fantasia:'',
		id: 0,
		observations: '',
		fixDetail: '',
		service_name: '',
		status: 0,
		client: {
			email: '',
			id: 0,
			img: '',
			logo: '',
			name: '',
			phone: '',
			qr_code: '',
			status: 0
		},
		subclient: {
			canal: 0,
			canal2: '',
			ciclo: 0,
			fantasia: '',
			client_basis: '',
			client_sap: '',
			comuna: '',
			direccion: '',
			id: 0,
			numero: '',
			phone: undefined,
			razon_social: '',
			rut: '',
			subcanal: 0,
			subcanal2: ''
		}
	};
	// Information service block
	errorMessages={
		request:[
			{type: 'required', message: 'Solicitud requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		nameSupervisor:  [
			{type: 'required', message: 'Nombre requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
	};

	
	arrayListPushMachines: Array<any> = [];
  constructor(
    public server: ServerService,
    public platform: Platform,
    public modalController: ModalController,
    public loadingController: LoadingController,
		public formBuilder: FormBuilder,
		private navParams: NavParams,
		private screenOrientation: ScreenOrientation
  ) {
		this.signatureString = ''; 
		this.data = this.navParams.get('value'); 
		
		// Rellenamos al Form
		this.authForm = this.formBuilder.group({
      		request: new FormControl (this.data.factura,Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(35)])),
			model: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
			serie: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(35)])),
			acivo: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(35)])),
			// Subclient block
			nameSocial: new FormControl (this.data.subclient.razon_social,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),		
			fantasia: new FormControl(this.data.fantasia),
			rut: new FormControl (this.data.subclient.rut,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
			adress: new FormControl (this.data.subclient.direccion,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
			comuna: new FormControl (this.data.subclient.comuna,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
			phone: new FormControl (this.data.subclient.phone,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
			// Problem Description
			fixDetail: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(150)])),
			problemDescription: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(150)])),
			total: new FormControl ('',Validators.compose([Validators.minLength(1), Validators.maxLength(35)])),
			nameSupervisor: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
    	});
	 }

	ngOnInit() {
		
	}
 
	/**
	 * Agregado de Mantenimiento
	 */
	async agregarMantenimiento() {
		const modal = await this.modalController.create({
		  component: MachinesPage,
		  animated:true,
		  backdropDismiss:true,
		  mode:'md'
		});
	
		modal.onDidDismiss().then(data=>{
		  if (data.role === 'add_machine') {
			this.arrayListPushMachines.push(data.data);
		  }
		});
	
		return await modal.present();
	}
	
	/**
	 * Actualizacion del servicio
	 * @returns 
	 */
	async sendService(){ 
		if(this.signatureString === '') {
			this.server.presentToast('Firma requerida', 'warning','top');
			return;
		}

		if (this.arrayListPushMachines.length == 0) {
			this.server.presentToast("Debes agregar un equipo",'danger','top');
			return;
		}
		
		const dataSend = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			id_service: this.data.id,
			status: 5,
			userId:  localStorage.getItem('user_id'),
			real_lat: localStorage.getItem('current_lat'),
			real_lng: localStorage.getItem('current_lng'),
			data: {
				request: this.authForm.value.request,
				fantasia: this.authForm.value.fantasia,
				phone: this.authForm.value.phone,
				total: this.authForm.value.total,
				nameSupervisor: this.authForm.value.nameSupervisor,
				machines: this.arrayListPushMachines,
				signature: this.signatureString['data']
			}
		};
	
		const loading = await this.loadingController.create({});
		await loading.present();

		this.server.ChangeService(dataSend).subscribe((req:any) => {
			loading.dismiss();
			if (req.data == true) {
				this.server.presentToast("El servicio ha cambiado con éxito.","success","top");
				this.modalController.dismiss('success','change_service');
			}else {
				this.server.presentToast("Ha ocurrido un problema, por favor, intente más tarde.", "danger","top");
				this.modalController.dismiss('fail','change_service');
			}
		});
	}

	/**
	 * Agregado de Firma
	 * @returns 
	 */
	async signature() {
		const modal = await this.modalController.create({
			component: SignaturePage,
			animated:true,
			mode:'ios',
			backdropDismiss:true,
		});

		modal.onDidDismiss().then((data: any)=>{
			if (data !== null) {
				this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
				this.signatureString = data;
			}
    	});
		return await modal.present();
	}


	/**
	 * Close Modal
	 */
	closeModal()
	{
		this.modalController.dismiss();
	}

	// updateFantasia() {
	// 	const userId = this.data.subclient.id;
	// 	const newValue = this.authForm.value.fantasia;
	 
	// 	this.server.updateFantasia(userId, newValue).subscribe(response => {
	// 		if (response && response.success) {
	// 			// Después de una actualización exitosa, verifica si realmente cambió en la base de datos
	// 			this.server.getFantasia(userId).subscribe(currentValue => {
	// 				if (currentValue === newValue) {
	// 					// El valor en la base de datos coincide con el newValue, por lo que se actualizó con éxito
	// 					this.server.presentToast("Fantasía actualizada con éxito.", "success", "top");
	// 				} else {
	// 					// El valor en la base de datos no coincide con el newValue, por lo que no se actualizó correctamente
	// 					this.server.presentToast("La fantasía no se actualizó correctamente en la base de datos.", "warning", "top");
	// 				}
	// 			});
	// 		} else {
	// 			this.server.presentToast("Error al actualizar la fantasía.", "danger", "top");
	// 		}
	// 	});
	// }

}

export interface IDataService {
	code_error: string;
	created_at: string;
	factura: string;
	fantasia: string;
	id: number;
	observations: string;
	fixDetail: string;
	service_name: string;
	status: number;
	client: {
		email: string;
		id: number;
		img: string;
		logo: string;
		name: string;
		phone: string;
		qr_code: string;
		status: number;
	};
	subclient: {
		canal: number;
		fantasia: string;
		canal2: string;
		ciclo: number;
		client_basis: string;
		client_sap: string;
		comuna: string;
		direccion: string;
		id: number;
		numero: string;
		phone: any;
		razon_social: string;
		rut: string;
		subcanal: number;
		subcanal2: string;

		
	};
}