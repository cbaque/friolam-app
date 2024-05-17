import { Platform } from '@ionic/angular';
import { Component, Renderer2,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './service/events.service';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  apiKey: any;
  admin:any;

  constructor( 
    public platform: Platform,
    public server : ServerService,
    public events: EventsService,
    public statusBar: StatusBar, 
    public renderer: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    

    this.events.subscribe('admin', (type) => {  
      this.admin = type;
    });

    if(localStorage.getItem('admin'))
    {
      this.admin = JSON.parse(localStorage.getItem('admin'));
    } 
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#FFFFFF");
      this.statusBar.styleDefault();      

      this.server.welcome().subscribe((res:any) => {

        this.events.publish('admin', res.data.admin);
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        this.server.getGeolocation();
        
        this.apiKey  = res.data.admin.ApiKey_google;
        this.injectSDK().then((res) => {
          // Obtenemos la Geolocalicacion
          if (!localStorage.getItem("address") || localStorage.getItem("address") == 'null') {
            // this.server.getGeolocation();
          }
        });
      });
    });

  }

  private injectSDK(): Promise<any> {

    return new Promise((resolve, reject) => {

        window['mapInit'] = () => {
            resolve(true);
        }

        let script = this.renderer.createElement('script');
        script.id = 'googleMaps';
        if(this.apiKey){
            script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit&libraries=places&key=' + this.apiKey;
        } else {
            script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit&libraries=places';       
        }

        this.renderer.appendChild(this._document.body, script);

    });
  }
}
