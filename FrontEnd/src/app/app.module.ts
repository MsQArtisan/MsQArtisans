import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const config: SocketIoConfig = { url: 'http://localhost:3010', options: {} };

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access token');
    },
    whitelistedDomains: ['localhost: 5000']
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    // SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS, 
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    })
  ],
  providers: [  
    Geolocation,
    StatusBar,
    SocialSharing,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    HttpClient,
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
