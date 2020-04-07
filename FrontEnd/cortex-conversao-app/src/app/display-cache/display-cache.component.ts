import { Component, OnInit } from '@angular/core';
import { ConversorApi, Conversor } from '../shared/sdk';

@Component({
  selector: 'app-display-cache',
  templateUrl: './display-cache.component.html',
  styleUrls: ['./display-cache.component.css']
})
export class DisplayCacheComponent implements OnInit {


  listaCache: Conversor[];

  constructor(private conversorSrv:ConversorApi) { 

  }

  ngOnInit() {
    this.carregaItens();
  }

  carregaItens() {
    this.conversorSrv.find({'order' : 'dataHoraCriacao desc'})
      .subscribe((result:Conversor[]) => {
        console.log('Result-Conversor: ' , result);
        this.listaCache = result;
      })
  }

}
