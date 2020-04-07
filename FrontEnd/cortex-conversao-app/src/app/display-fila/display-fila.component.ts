import { Component, OnInit } from '@angular/core';
import { FilaConversor, FilaConversorApi } from '../shared/sdk';

@Component({
  selector: 'app-display-fila',
  templateUrl: './display-fila.component.html',
  styleUrls: ['./display-fila.component.css']
})
export class DisplayFilaComponent implements OnInit {


  listaFila: FilaConversor[];

  constructor(private conversorSrv:FilaConversorApi) { 

  }

  ngOnInit() {
    this.carregaItens();
  }

  carregaItens() {
    this.conversorSrv.find({'order' : 'posicao'})
      .subscribe((result:FilaConversor[]) => {
        console.log('Result-Fila: ' , result);
        this.listaFila = result;
      })
  }

}
