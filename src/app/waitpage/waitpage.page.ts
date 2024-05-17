import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../service/events.service';
import { ServerService } from '../service/server.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-waitpage',
  templateUrl: './waitpage.page.html',
  styleUrls: ['./waitpage.page.scss'],
})
export class WaitpagePage implements OnInit {

  constructor(
    public server: ServerService,
    public events: EventsService,
    public route: ActivatedRoute,
    public nav: NavController,
    public statusBar: StatusBar,
    public platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString("#FFFFFF");
    this.statusBar.styleDefault();

    this.platform.ready().then(() => {
      this.route.queryParams.subscribe( params => {
        // Obtenemos primera información
        this.server.getAdmin().subscribe((response:any) => { 
        
          this.events.publish('text', response.data.text);
          this.events.publish('admin', response.data.admin);

          localStorage.setItem('app_text', JSON.stringify(response.data.text));
          localStorage.setItem('admin', JSON.stringify(response.data.admin));

          /**
           * Podemos validar Login
           */
          this.server.chkLog().then((req) => {
            if(req){
              if (params.redirect) {
                this.RedirectPage(params.redirect);
              }else {
                this.nav.navigateRoot('/tabs/home');
              }
            }else {
              this.nav.navigateRoot('/login');
            }
          });
        });
          
      });
    });
  }
  
  RedirectPage(page)
  {
    setTimeout(() => {
      this.nav.navigateRoot(page);
    }, 2500);
  }

}
