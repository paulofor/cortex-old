import { Routes } from '@angular/router';
import { ConversorMoedaBcComponent } from '../conversor-moeda-bc/conversor-moeda-bc.component';
import { DisplayFilaComponent } from '../display-fila/display-fila.component';
import { DisplayCacheComponent } from '../display-cache/display-cache.component';



export const routes : Routes = [
    { path: 'home' , component: ConversorMoedaBcComponent },
    { path: 'cache' , component: DisplayCacheComponent },
    { path: 'fila' , component: DisplayFilaComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]