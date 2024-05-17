import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

// ModalBox
import { JobPageModule } from './job/job.module';
import { MachinesPageModule } from './job/machines/machines.module';
import { ViewmapPageModule } from './works/viewmap/viewmap.module';

import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Storage } from '@ionic/storage'; 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // ModalBox
    JobPageModule,
    MachinesPageModule,
    ViewmapPageModule,
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    Base64ToGallery,
    StatusBar, 
    LaunchNavigator,
    Storage,
    ScreenOrientation,
    Screenshot,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}