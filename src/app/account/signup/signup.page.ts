import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email:any = "";
  password:any = "";
  confirm_password:any = "";
  constructor(
    public platform: Platform,
    public server : ServerService,
    public toastController: ToastController,
    public nav: NavController, 
    public loadingController: LoadingController,
    public events: EventsService
  ) { }

  ngOnInit() {
  }

  login() {
    this.nav.navigateRoot('/login');
  }

}
