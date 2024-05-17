
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../service/events.service';
import { ServerService } from '../service/server.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  pet:number = 1;
  
  data:any;
  newOrdersCount: number = 0;
  ruteOrderCount: number = 0;
  constructor(
    public server: ServerService,
    public events: EventsService,
    public route: ActivatedRoute,
    public nav: NavController,
    public statusBar: StatusBar,
    public platform: Platform,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.server.chkLog().then((req) => {
        if(req){ 
          /** Log!! */
        }else {
          this.nav.navigateRoot('/login');
        }
      });
      
    });
  }

   /**
   * Carga de informacion
   */
   async loadData()
   {
     
   }

  /**
   * Actualizamos info en espera
   */
  async update()
  {
    const loading = await this.loadingController.create({});
    await loading.present();

    this.pet = 1;
    this.data = [];
    
    this.loadData();
    loading.dismiss();
  }


}
