import { Component, OnInit,ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { ServerService } from '../../service/server.service';
import { NavController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 

  data:any;
  action:any;
  text:any;
  count: any;
  role:any;
  constructor(
    public events: EventsService, 
    public server : ServerService,
    private nav: NavController,
    public loadingController: LoadingController
  ) { 
    this.role = localStorage.getItem('role');
    this.text = JSON.parse(localStorage.getItem('app_text'));
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.server.chkLog().then((req) => {
      if(req){ 
        this.loadData();
      }else {
        this.nav.navigateRoot('/login');
      }
    });
  } 

  async loadData()
  {
    this.server.userInfo(localStorage.getItem('user_id')+"?role="+localStorage.getItem('role')).subscribe((response:any) => { 
      if (response.data != 'error') { 
        this.data = response.data;
        console.log(this.data);
        this.events.publish('user', response.data);
      }else {
        this.server.presentToast("Ha ocurrido un problema, por favor intente más tarde y/o contacte al administrador",'danger','top');
      }
    });
  }  

  logout()
  {
    localStorage.setItem('user_id',null); 
    localStorage.setItem('role',null);
    localStorage.setItem('user_dat', null);
    
    localStorage.removeItem('user_id'); 
    localStorage.removeItem('role');
    localStorage.removeItem('user_dat');
    this.nav.navigateForward('/login');
  }
}
