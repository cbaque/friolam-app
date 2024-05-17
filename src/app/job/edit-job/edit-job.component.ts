import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { SignaturePage } from '../signature/signature.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MachinesPage } from '../machines/machines.page';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {

  @Input() data:any;

  signatureString: string;
	authForm: FormGroup;
  
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
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private screenOrientation: ScreenOrientation,
    public server: ServerService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.createForm();
    this.addPushMachine();
  }

  closeModal() {
		this.modalController.dismiss();
	}

  createForm() {
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
      nameSupervisor: new FormControl ( this.data.comm.nameSupervisor ,Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
      });    
  }

  addPushMachine() {
    let data = this.data.machine;
    data.forEach(element => {

      this.arrayListPushMachines.push(element);
      
    });
  }

  async sendService() {
		// if(this.signatureString === '') {
		// 	this.server.presentToast('Firma requerida', 'warning','top');
		// 	return;
		// }

		if (this.arrayListPushMachines.length == 0) {
			this.server.presentToast("Debes agregar un equipo",'danger','top');
			return;
		}
		
		const dataSend = {
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
				// signature: this.signatureString['data']
        signature: null
			}
		};
	
		const loading = await this.loadingController.create({});
		await loading.present();

		this.server.EditService(dataSend, this.data.id ).subscribe((req:any) => {
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

  async agregarMantenimiento() {
    const modal = await this.modalController.create({
		  component: MachinesPage,
      //componentProps: { data: this.data.machine } ,
		  animated:true,
		  backdropDismiss:true,
		  mode:'md'
		});
	
		modal.onDidDismiss().then(data=>{
		  if (data.role === 'add_machine') {
			console.log(data.data);
			this.arrayListPushMachines.push(data.data);
		  }
		});
	
		return await modal.present();
  }

  async editMantenimiento(data) {
    console.log('mantenimiento', data)
    const modal = await this.modalController.create({
		  component: MachinesPage,
      componentProps: { data } ,
		  animated:true,
		  backdropDismiss:true,
		  mode:'md'
		});
	
		modal.onDidDismiss().then(data=>{
		  if (data.role === 'add_machine') {
        console.log(data.data)

        const index = this.arrayListPushMachines.findIndex(item => item.id === data.data.id);
        if (index !== -1) {
          this.arrayListPushMachines.splice(index, 1, data.data);
        } else {
            this.arrayListPushMachines.push(data.data);
        }

		  }
		});
	
		return await modal.present();
  }

  async signature() {
    const modal = await this.modalController.create({
			component: SignaturePage,
			animated:true,
			mode:'ios',
			backdropDismiss:true,
		});

		modal.onDidDismiss().then((data: any)=>{
			console.log(data);
			if (data !== null) {
				this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
				this.signatureString = data;
			}
    	});
		return await modal.present();
  }

}
