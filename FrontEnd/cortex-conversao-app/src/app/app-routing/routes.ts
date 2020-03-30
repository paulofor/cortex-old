import { Routes } from '@angular/router';
import { ConversorMoedaBcComponent } from '../conversor-moeda-bc/conversor-moeda-bc.component';






export const routes : Routes = [
    { path: 'home' , component: ConversorMoedaBcComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]