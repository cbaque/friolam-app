import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Platform, ToastController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements AfterViewInit {
	@ViewChild('imageCanvas') canvas: ElementRef;
  canvasElement: any;
  saveX: number;
  saveY: number;
  selectedColor = '#000000';
  drawing = false;
  lineWidth = 5;
  imageBanner: '';
  getData: any;
  receivingParty: '';
  releasingParty: '';
  canvasPosition: any;
  ctx: any;
  constructor(private plt: Platform,
		private base64ToGallery: Base64ToGallery,
		private toastCtrl: ToastController,private screenOrientation: ScreenOrientation, 
		private navParams: NavParams,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private modalController: ModalController) {
			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
		 }

		 ngAfterViewInit() {
			this.canvasElement = this.canvas.nativeElement;
			this.canvasElement.width =  800;
			this.canvasElement.height = 350; //160,210
		}

		ionViewDidEnter() {
			this.canvasPosition = this.canvasElement.getBoundingClientRect();
			this.ctx = this.canvasElement.getContext('2d');
		}

		startDrawing(ev) {
			this.drawing = true;
			this.saveX = ev.touches[0].pageX - this.canvasPosition.x;
			this.saveY = ev.touches[0].pageY - this.canvasPosition.y;
		}

		endDrawing() {
			this.drawing = false;
		}

		selectColor(color) {
			this.selectedColor = color;
		}

		setBackground() {
			const  background = new Image();
			background.src = './assets/imgs/profile.png';
			this.ctx = this.canvasElement.getContext('2d');
			background.onload = () => {
				this.ctx.drawImage(background, 0, 0, this.canvasElement.width, this.canvasElement.height);
			};
		}

		moved(ev) {
			if (!this.drawing) { return; };
			let currentX;
			let currentY;
			if (this.plt.is('desktop')) {
				currentX = ev.pageX - this.canvasPosition.x;
				currentY = ev.pageY - this.canvasPosition.y;
			}
			else {
				currentX = ev.touches[0].pageX - this.canvasPosition.x;
				currentY = ev.touches[0].pageY - this.canvasPosition.y;
			}

			this.ctx.lineJoin = 'round';
			this.ctx.strokeStyle = this.selectedColor;
			this.ctx.lineWidth = this.lineWidth;

			this.ctx.beginPath();
			this.ctx.moveTo(this.saveX, this.saveY);
			this.ctx.lineTo(currentX, currentY);
			this.ctx.closePath();
			this.ctx.stroke();
			this.saveX = currentX;
			this.saveY = currentY;
		}

		async exportCanvasImage() {
			const dataUrl = this.canvasElement.toDataURL();
			this.imageBanner = dataUrl;
			this.modalController.dismiss(this.imageBanner);
		}

		clear(){
			this.ctx = this.canvasElement.getContext('2d');
			this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		}


		public closeModal(flag): void {
			this.modalController.dismiss(null);
		}
}
