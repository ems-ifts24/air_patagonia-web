import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Empleado } from '../core/services/vuelo-service.service';

@Component({
  selector: 'app-vuelos-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vuelos-gestion.component.html',
  styleUrl: './vuelos-gestion.component.css'
})
export class VuelosGestionComponent implements OnInit { // Implementa OnInit

  titleCreacion = 'CREACION';
  titleModificacion = 'MODIFICACION';

  listaEmpleadosParaAsignar: Empleado[] = [];
  rolesDisponibles: string[] = [
    'Piloto',
    'Copiloto',
    'Tripulante',
    'Jefe de Cabina',
  ];

  // inyecto el servicio
  constructor(private router: Router, private vueloService: VueloServiceService) { }

  ngOnInit(): void {
    const empleadosDelServicio = this.vueloService.getEmpleados();
    this.listaEmpleadosParaAsignar = empleadosDelServicio.map(emp => ({
      ...emp, // Copia todas las propiedades del empleado original
    }));
  }

  cancelarModificacion() {
    this.router.navigate(['app/vuelos']);
  }
}
