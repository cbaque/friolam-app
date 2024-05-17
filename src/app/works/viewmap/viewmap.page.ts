import { ModalController } from '@ionic/angular';
import { Component,Input, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google:any;


@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.page.html',
  styleUrls: ['./viewmap.page.scss'],
})
export class ViewmapPage implements OnInit {

  @ViewChild('map',{static:false}) mapElement: ElementRef;
  @Input() odata: any;

  map: any;
  lat: any;
  lng: any;
  admin:any;
  data:any;
  constructor(
    public modalController: ModalController
  ) { }

  ngAfterViewInit() { 
    this.lat = localStorage.getItem('current_lat');
    this.lng = localStorage.getItem('current_lng');
    this.data = JSON.parse(this.odata);
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.data);
      this.injectMap().then(() => { 
        // Mapa Cargado
        const icon = {
          url: 'assets/d.png', // image url
          scaledSize: new google.maps.Size(50, 50), // scaled size
        };
  
        var latlng = new google.maps.LatLng(this.lat, this.lng);

        let marker = new google.maps.Marker({
          position: latlng,
          map: this.map,
          icon: icon
        }); 
      });
    }, 800);

  }

  
  private injectMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      resolve(true);
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
