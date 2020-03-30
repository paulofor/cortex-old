import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConversorMoedaBcComponent } from './conversor-moeda-bc/conversor-moeda-bc.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversorMoedaBcComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
