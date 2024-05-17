import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  constructor(
    public platform: Platform,
    public server: ServerService,
    public toastController: ToastController,
    public nav: NavController,
    public loadingController: LoadingController,
    public events: EventsService
  ) { }

  ngOnInit() {}

  async login(data) {
    const loading = await this.loadingController.create({
      message: 'Validando.',
    });
    await loading.present();

    this.server.login(data).subscribe((response: any) => {
      if(response.msg === 'done'){
        localStorage.setItem('user_id',response.data.id);
        localStorage.setItem('role',response.role);
        localStorage.setItem('user_dat', JSON.stringify(response.data));
        const navigationExtras: NavigationExtras = {
          queryParams: {
            redirect: '/tabs/home'
          }
        };
        this.nav.navigateForward(['/waitpage'], navigationExtras);

      }else if (response.msg === 'error') {
        this.server.presentToast(response.req,'danger','top');
      }else{
        this.server.presentToast(response.req,'danger','top');
      }
      loading.dismiss();
    });
  }

  createAccount() {
    this.nav.navigateForward('/signup');
  }
}
