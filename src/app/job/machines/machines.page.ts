import { LoadingController, ModalController, Platform, NavParams } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.page.html',
  styleUrls: ['./machines.page.scss'],
})
export class MachinesPage implements OnInit {

	@Input() data:any;

  authForm: FormGroup;
  errorMessages={
		model:[
			{type: 'required', message: 'Modelo requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		serie:[
			{type: 'required', message: 'Serie requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		acivo:[
			{type: 'required', message: 'Campo requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		fixDetail:[
			{type: 'required', message: 'Nombre requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		nameSupervisor:  [
			{type: 'required', message: 'Nombre requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		fantasia: [
			{type: 'required', message: 'Nombre requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],
		problemDescription: [
			{type: 'required', message: 'Nombre requerido'},
			{type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
		],		
	};
  maintanceOne: Array<any> = [
		{isChecked: false, description: 'Limpieza Condensador', codeString: 'limpieza_cond' },
		{isChecked: false, description: 'Cambio procesador', codeString: 'cambio_proces' },
		{isChecked: false, description: 'Cambio Termostato', codeString: 'cambio_term' },
		{isChecked: false, description: 'Cambio Burlet', codeString: 'cambio_burlet' },
		{isChecked: false, description: 'Cambio Ventilador', codeString: 'cambio_vent' },
		{isChecked: false, description: 'Cambio Cordon electrico', codeString: 'cambio_cordon_el' },
		{isChecked: false, description: 'Mantención General', codeString: 'mantencion_general' }
	];
	maintanceTwo: Array<any> = [
		{isChecked: false, description: 'Cambio Compresor', codeString: 'cambio_comp' },
		{isChecked: false, description: 'Carga de gas CO2', codeString: 'carga_gas_co2' },
		{isChecked: false, description: 'Carga de gas R-134', codeString: 'carga_gas_134' },
		{isChecked: false, description: 'Carga de gas R-404', codeString: 'Carga de gas R-404' },
		{isChecked: false, description: 'Carga de gas R-290', codeString: 'carga_gar_290' },
		{isChecked: false, description: 'Se solicita cambio de cooler - Por filtración de gas y motocompresor con perdida de rendimiento', 
		codeString: 'cambio_cooler', isRed: true },
	];

	postMix: Array<any> = [
		{ isChecked: false, description: 'MANOMETROS', codeString: 'manometros' },
		{ isChecked: false, description: 'BANCO HIELO', codeString: 'banco_hielo' },
		{ isChecked: false, description: 'VALVULA ALIVIO DEL CARBONATADOR', codeString: 'valvula_alivio' },
		{ isChecked: false, description: 'DIFUSORES DE BOQUILLAS', codeString: 'difusores_boquillas' },
		{ isChecked: false, description: 'FILTROS DE AGUAS', codeString: 'filtros_aguas' },
		{ isChecked: false, description: 'POSIBLES FUGAS DE AGUAS', codeString: 'fugas_aguas' },
		{ isChecked: false, description: 'POSIBLES FUGAS DE CO2', codeString: 'fugas_co2' },
		{ isChecked: false, description: 'POSIBLES FUGAS DE JARABE', codeString: 'fugas_jarabe' },
		{ isChecked: false, description: 'LIMPIAR CONDENSADOR', codeString: 'limpiar_condensador' },
		{ isChecked: false, description: 'LIMPIAR DRENAJES', codeString: 'limpiar_drenajes' },
		{ isChecked: false, description: 'LIMPIAR CUERPO Y GABINETE', codeString: 'limpiar_cuerpo_gabinete' },
		{ isChecked: false, description: 'ESTADO CUBA', codeString: 'estado_cuba' },
		{ isChecked: false, description: 'CONTROL BRIX', codeString: 'control_brix' },
		{ isChecked: false, description: 'INSTALACION ELECTRICA LOCAL', codeString: 'instalacion_electrica' },
		{ isChecked: false, description: 'ROTACION DE PRODUCTOS (FECHAS)', codeString: 'rotacion_productos' },
		{ isChecked: false, description: 'N° DE CILINDROS DE CO2', codeString: 'num_cilindros_co2' },
		{ isChecked: false, description: 'IDENTIFICACION MANGUERAS', codeString: 'identificacion_mangueras' },
		{ isChecked: false, description: 'SANITIZADO', codeString: 'sanitizado' },
		{ isChecked: false, description: 'ESTADO DE LOGOS', codeString: 'estado_logos' },
		{ isChecked: false, description: 'BUENO', codeString: 'bueno' },
		{ isChecked: false, description: 'REGULAR', codeString: 'regular' },
		{ isChecked: false, description: 'MALO', codeString: 'malo' },
		{ isChecked: false, description: 'REGULACION FLUJO AGUA Y JARABE', codeString: 'regulacion_flujo' }
	]

  arrayListPushMaintenceOne: Array<any> = [];
  arrayListPushMaintenceTwo: Array<any> = [];
  arraypostmix: Array<any> = [];
  constructor(
		public formBuilder: FormBuilder,
    public modalController: ModalController,
    public loadingController: LoadingController,
  ) {
    // Rellenamos al Form
		this.authForm = this.formBuilder.group({
      name_machine: new FormControl ('', Validators.compose([Validators.minLength(3), Validators.maxLength(10)])),
      model: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
      serie: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(35)])),
      acivo: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(35)])),
      fixDetail: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(150)])),
      problemDescription: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(150)])),
      nameSupervisor: new FormControl ('',Validators.compose([Validators.minLength(3), Validators.maxLength(35)])),
	  id : new FormControl(),
    });
  }

  setValuesForm() {
	this.authForm.get('name_machine').setValue(this.data.name_machine);
	this.authForm.get('model').setValue(this.data.model);
	this.authForm.get('serie').setValue(this.data.serie);
	this.authForm.get('acivo').setValue(this.data.acivo);
	this.authForm.get('fixDetail').setValue(this.data.fixDetail);
	this.authForm.get('problemDescription').setValue(this.data.problemDescription);
	this.authForm.get('id').setValue(this.data.id);
	this.authForm.updateValueAndValidity();
  }

  setValuesMaintanceOne() {
	for (let i = 0; i < this.maintanceOne.length; i++) {
		const foundItem = this.data.maintanceListOne.find(item => item.codeString === this.maintanceOne[i].codeString);
		if (foundItem) {
			this.maintanceOne[i].isChecked = foundItem.isChecked;
		}
	}
  }

  setValuesMaintanceTwo() {
	for (let i = 0; i < this.maintanceTwo.length; i++) {
		const foundItem = this.data.maitanceListTwo.find(item => item.codeString === this.maintanceTwo[i].codeString);
		if (foundItem) {
			this.maintanceTwo[i].isChecked = foundItem.isChecked;
		}
	}
  }

  ngOnInit() {
	if (this.data) {
		this.setValuesForm();
		this.setValuesMaintanceOne();
		this.setValuesMaintanceTwo();
	}
  }


  onChange(item, event) {
		if (event.detail.checked) {
		  // Si el checkbox está seleccionado, añade el elemento a la lista
		  this.arrayListPushMaintenceOne.push(item);
		} else {
		  // Si el checkbox no está seleccionado, elimina el elemento de la lista
		  const index = this.arrayListPushMaintenceOne.findIndex(i => i.codeString === item.codeString);
		  if (index > -1) {
			this.arrayListPushMaintenceOne.splice(index, 1);
		  }
		}
	}
	  
	onChange2(item, event) {
		if (event.detail.checked) {
		  // Si el checkbox está seleccionado, añade el elemento a la lista
		  this.arrayListPushMaintenceTwo.push(item);
		} else {
		  // Si el checkbox no está seleccionado, elimina el elemento de la lista
		  const index = this.arrayListPushMaintenceTwo.findIndex(i => i.codeString === item.codeString);
		  if (index > -1) {
			this.arrayListPushMaintenceTwo.splice(index, 1);
		  }
		}
	}


	onChangePostMix(item, event) {
		if (event.detail.checked) {
		  this.arraypostmix.push(item);
		} else {
		  const index = this.arraypostmix.findIndex(i => i.codeString === item.codeString);
		  if (index > -1) {
			this.arraypostmix.splice(index, 1);
		  }
		}
	}

  addMachine()
  {

    const dataSend = { 
      name_machine : this.authForm.value.name_machine,
      model: this.authForm.value.model,
      serie: this.authForm.value.serie,
      acivo: this.authForm.value.acivo,
      problemDescription: this.authForm.value.problemDescription,
      fixDetail: this.authForm.value.fixDetail,
      postmix: this.arraypostmix,
      maintanceListOne: this.arrayListPushMaintenceOne,
      maitanceListTwo: this.arrayListPushMaintenceTwo,
	  id: this.authForm.value.id
	};
	console.log( this.arraypostmix );
	return false;

    this.modalController.dismiss(dataSend,'add_machine');
  }

  /**
	 * Close Modal
	 */
	closeModal()
	{
		this.modalController.dismiss();
	}

}
