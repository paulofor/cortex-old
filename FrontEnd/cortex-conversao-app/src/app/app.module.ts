import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { ConversorMoedaBcComponent } from './conversor-moeda-bc/conversor-moeda-bc.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';


import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { SocketConnection } from './shared/sdk/sockets/socket.connections';
import { SocketDriver } from './shared/sdk/sockets/socket.driver';
import { SDKModels, LoopBackAuth, ConversorApi, SDKBrowserModule } from './shared/sdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DisplayFilaComponent } from './display-fila/display-fila.component';
import { DisplayCacheComponent } from './display-cache/display-cache.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    ConversorMoedaBcComponent,
    SideBarComponent,
    DisplayFilaComponent,
    DisplayCacheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SDKBrowserModule.forRoot(),
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //MatMomentDateModule
  ],
  providers: [
    HttpClient, 
    SocketConnection  , 
    SocketDriver,
    SDKModels,
    LoopBackAuth,

    { provide: LOCALE_ID, useValue: 'pt-BR' } ,
    ConversorApi

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
