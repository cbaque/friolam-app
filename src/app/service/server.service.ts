import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, ToastController } from '@ionic/angular'; 
import { EventsService } from './events.service';
 
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  // url = "http://127.0.0.1:8000/api/"; // LOCAL
  // url = "https://dash.friolam.cl/api/"; // PROD
  url = "http://friolam.test/api/"; // LOCAL
  geoLatitude = null;
  geoLongitude=null;
 
  constructor(
    private http: HttpClient,
    private geolocation: Geolocation,
    private events: EventsService,  
    public modalController: ModalController,
    public toastController: ToastController
    ) {  
    }

  get windowRef() {
    return window
  }

 
  /**
   * Obtenemos informacion principal
   * @param city_id 
   * @returns 
   */
  getAdmin()
  {
    return this.http.get(this.url+'getAdmin')
    .pipe(map(results => results));
  }

  homepage(user_id)
  { 
    return this.http.get(this.url+'homepage/'+user_id)
             .pipe(map(results => results));
  }

  welcome()
  {
  	return this.http.get(this.url+'welcome')
  	    	   .pipe(map(results => results));
  }

  /**
   * Funciones de ubicacion y Geolocalizacion
   */
  getGeolocation(){
      
    this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude; 
      //this.geoAccuracy = resp.coords.accuracy; 
     localStorage.setItem('current_lat',this.geoLatitude);
     localStorage.setItem('current_lng',this.geoLongitude);

     }).catch((error) => {
      //  Fail
      console.log(error);
     });
  }

	getGeolocationShow(){ 
    return this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => { 
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
			return { lat: this.geoLatitude, lng: this.geoLongitude  };
     }).catch((error) => { 
			return null;
     });
  }
  
  GeocodeFromCoords(lat,lng,apikey)
  {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key="+apikey)
    .pipe(map(results => results)); 
  }

  GeocodeFromAddress(address,apikey)
  {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apikey)
    .pipe(map(results => results)); 
  }
  
  /**
   * Inicion de sesion
   * @param data 
   * @returns 
   */
  
  login(data)
  {
    return this.http.post(this.url+'login',data)
             .pipe(map(results => results));
  }

  loginfb(data)
  {
    return this.http.post(this.url+'loginfb',data)
             .pipe(map(results => results));
  }

  async chkLog(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != null){
        this.chkUser({'user_id' : localStorage.getItem('user_id'),'role' : localStorage.getItem('role')}).subscribe((req:any) => {
          if (req.msg != 'not_exist') {
            localStorage.setItem('user_id',req.data.id);
            localStorage.setItem('role',req.role);
            localStorage.setItem('user_dat', JSON.stringify(req.data));
            resolve(true);
          }else {
            resolve(false);
          }
        });
      }else {
        resolve(false);
      }
    });
  }

  /**
   * Registro
   * @param data 
   * @returns 
   */
  signup(data)
  {
    return this.http.post(this.url+'signup',data)
             .pipe(map(results => results));
  } 
  
  signupWithfb(data)
  {
    return this.http.get(data).pipe(map(results => results));
  }

  SignPhone(data)
  {
    return this.http.post(this.url+'SignPhone',data)
      .pipe(map(results => results));
  }

  getFantasia(userId: number) {
    return this.http.get<any>(`${this.url}user/${userId}/fantasia`)
        .pipe(map(results => results));
  }

  updateFantasia(userId: number, value: string) {
    const data = {
        fantasia: value
    };
    return this.http.post<any>(`${this.url}update-fantasia/${userId}`, data)
        .pipe(map(results => results));
  }

  
  /**
   * Recuperacion de password
   * @param data 
   * @returns 
   */
  forgot(data)
  {
    return this.http.post(this.url+'forgot',data)
             .pipe(map(results => results));
  }

  verify(data)
  {
    return this.http.post(this.url+'verify',data)
             .pipe(map(results => results));
  }

  updatePassword(data)
  {
    return this.http.post(this.url+'updatePassword',data)
             .pipe(map(results => results));
  }

  
  /**
   * Informacion de usuario
   * @param data 
   * @returns 
   */
  chkUser(data)
  {
    return this.http.post(this.url+'chkUser',data)
      .pipe(map(results => results));
  }

  userInfo(id)
  {
    return this.http.get(this.url+'userinfo/'+id)
             .pipe(map(results => results));
  }

  updateInfo(data,id)
  {
    return this.http.post(this.url+'updateInfo/'+id,data)
             .pipe(map(results => results));
  }

  /**
   * Informacion de ciudad de trabajo
   * @param data 
   * @returns 
   */
  GetNearbyCity(data)
  {
    return this.http.get(this.url+'GetNearbyCity?lid='+localStorage.getItem('lid')+data)
    .pipe(map(results => results));
  }

  updateCity(data)
  {
    return this.http.get(this.url+'updateCity?'+data).pipe(
      map(results => results)
    );
  }

  /**
   * Paginas de Quienes somos, Como trabajamos, etc.
   * @returns 
   */
  pages()
  {
    return this.http.get(this.url+'pages?lid='+localStorage.getItem('lid')).pipe(
      map(results => results)
    );
  }


  chkServices(user)
  {
    return this.http.get(this.url+'chkServices/'+user).pipe(
      map(results => results)
    );
  }

  ChangeService(data)
  {
    return this.http.post(this.url+'ChangeService',data)
    .pipe(map(results => results));
  }

  EditService(data, id)
  {
    return this.http.put(this.url+'EditService/'+id,data)
    .pipe(map(results => results));
  }

  /**
   * Control de notificacion Toast
   * @param txt 
   * @param color 
   */
  async presentToast(txt,color,pos) {
    const toast = await this.toastController.create({
      message: txt,
      position : pos,
      color:color,
      mode:'ios',
      duration: 3000
    });
    // Print
    toast.present();
  }

}