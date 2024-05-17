
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../service/events.service';
import { ServerService } from '../service/server.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JobPage } from '../job/job.page';


import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Swiper, SwiperOptions } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  swiperParams: SwiperOptions = {
    slidesPerView: 1.5,
    spaceBetween: 50,
  };
  
  data:any;  
  constructor(
    public server: ServerService,
    public events: EventsService,
    public route: ActivatedRoute,
    public nav: NavController,
    public statusBar: StatusBar,
    public platform: Platform,
    public modalController: ModalController
  ) { 
    const swiper = new Swiper('.my-swiper', this.swiperParams);
  }

  ngOnInit() {
  
  }

  ngAfterViewInit() { 
    
  }
 
  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.server.chkLog().then((req) => {
        if(req){ 
          /** Log!! */
          this.loadData();
        }else {
          this.nav.navigateRoot('/login');
        }
      });
      
    });
  }

  /**
   * Carga inicial
   */
  loadData()
  {
    this.server.homepage(localStorage.getItem('user_id')).subscribe((data:any) => {
      console.log(data);
      this.data = data.data;
    });
  }

  /**
   * Vista de pagina de tareas
   * @param page 
   */
  viewRoute(page) 
  {
    this.nav.navigateForward('/tabs/'+page);
  }

}
