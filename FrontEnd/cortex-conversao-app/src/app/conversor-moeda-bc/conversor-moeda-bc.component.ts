import { Component, OnInit } from '@angular/core';
import { Conversor, ConversorApi } from '../shared/sdk';

@Component({
  selector: 'app-conversor-moeda-bc',
  templateUrl: './conversor-moeda-bc.component.html',
  styleUrls: ['./conversor-moeda-bc.component.css']
})
export class ConversorMoedaBcComponent implements OnInit {


  conversor : Conversor;

  constructor(private conversorSrv : ConversorApi) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('conversor' , this.conversor);
  }

}
