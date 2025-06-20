import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Vuelo } from '../core/services/vuelo-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  vuelos: Vuelo[] = [];
  fechaActual: string = '';
  constructor(private vueloService: VueloServiceService) { }

  ngOnInit(): void {
    this.fechaActual = this.vueloService.getHoyFormateado(); // me traigo la fecha actual
    this.vuelos = this.vueloService.getVuelos();
    this.vuelos = this.vuelos.filter(vuelo => vuelo.fechaPartida === this.fechaActual); // filtro los vuelos que coincidan con la fecha actual
  }
}
