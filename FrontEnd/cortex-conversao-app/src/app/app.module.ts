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

import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { SocketConnection } from './shared/sdk/sockets/socket.connections';
import { SocketDriver } from './shared/sdk/sockets/socket.driver';
import { SDKModels, LoopBackAuth, ConversorApi, SDKBrowserModule } from './shared/sdk';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    ConversorMoedaBcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FormsModule,
    HttpClientModule ,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    //MatInputModule,
    //MatButtonModule,

    SDKBrowserModule.forRoot(),
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    //MatAutocompleteModule,
    //ReactiveFormsModule,
    //MatCheckboxModule,
    //FormsModule,
    //MatButtonModule
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
