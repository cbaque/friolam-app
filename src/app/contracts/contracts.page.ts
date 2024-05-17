import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
})
export class ContractsPage implements OnInit {

  kmInicial: number;
  kmFinal: number;
  diferenciaKm: number;
  fotoKmInicial: string;
  fotoKmFinal: string;

  constructor(private storage: Storage, public platform: Platform,) {}
 

  async ngOnInit() {
    await this.storage.create();

		this.platform.ready().then(() => { 
			// Cargar los valores guardados en el almacenamiento local
			this.storage.get('kmInicial').then((val) => {
				this.kmInicial = val;
			}).catch((error) => {
				console.log(error);
			});

			this.storage.get('kmFinal').then((val) => {
				this.kmFinal = val;
			});
			this.storage.get('diferenciaKm').then((val) => {
				this.diferenciaKm = val;
			});
			this.storage.get('fotoKmInicial').then((val) => {
				this.fotoKmInicial = val;
			});
			this.storage.get('fotoKmFinal').then((val) => {
				this.fotoKmFinal = val;
			});
    });

  }

  // Función para guardar el kilometraje inicial o final en el almacenamiento local
  guardarKilometraje(tipo: string) {
    if (tipo === 'inicial') {
      this.storage.set('kmInicial', this.kmInicial);
      this.storage.set('fotoKmInicial', this.fotoKmInicial);
    } else if (tipo === 'final') {
      this.storage.set('kmFinal', this.kmFinal);
      this.storage.set('fotoKmFinal', this.fotoKmFinal);
    }
  }

  // Función para enviar la diferencia de kilometraje al servidor
  enviarDiferenciaKm() {
    // Calcular la diferencia de kilometraje
    this.diferenciaKm = this.kmFinal - this.kmInicial;
    // Guardar la diferencia de kilometraje en el almacenamiento local
    this.storage.set('diferenciaKm', this.diferenciaKm);
    // Enviar la diferencia de kilometraje al servidor
    // ...
  }

  // Funcion para tomar captura del Kilometraje
  tomarFotoKmInicial()
  {

  }
}
