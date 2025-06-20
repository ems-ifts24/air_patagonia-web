import { Component, OnInit } from '@angular/core';
import { PasajeroService, Pasajero } from '../core/services/pasajero-gestion.service';

@Component({
  selector: 'app-pasajeros-gestion',
  imports: [],
  templateUrl: './pasajeros-gestion.component.html',
  styleUrl: './pasajeros-gestion.component.css'
})
export class PasajerosGestionComponent implements OnInit {

  titleGestion = 'Gestión de Pasajeros';
  pasajeros: Pasajero[] = [];
  pasajerosFiltrados: Pasajero[] = [];

  filtroPasajero: string = '';

  modoEdicion: boolean = false;
  modoCreacion: boolean = false;

  pasajeroSeleccionado: Pasajero = this.nuevoPasajero();

  constructor(private pasajeroService: PasajeroService) {}

  ngOnInit(): void {
    this.cargarPasajeros();
  }

  cargarPasajeros(): void {
    this.pasajeros = this.pasajeroService.getPasajeros();
    this.pasajerosFiltrados = [...this.pasajeros];
  }

  aplicarFiltroPasajeros(): void {
    const filtro = this.filtroPasajero.toLowerCase();
    this.pasajerosFiltrados = this.pasajeros.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.apellido.toLowerCase().includes(filtro) ||
      p.dni.includes(filtro) ||
      p.email?.toLowerCase().includes(filtro)
    );
  }

  editarPasajero(pasajero: Pasajero): void {
    this.pasajeroSeleccionado = { ...pasajero };
    this.modoEdicion = true;
    this.modoCreacion = false;
  }

  eliminarPasajero(id: number): void {
    this.pasajeroService.eliminarPasajero(id);
    this.cargarPasajeros();
  }

  guardarPasajero(): void {
    if (this.modoEdicion) {
      this.pasajeroService.editarPasajero(this.pasajeroSeleccionado);
    } else {
      this.pasajeroService.agregarPasajero(this.pasajeroSeleccionado);
    }

    this.cancelarModificacion();
    this.cargarPasajeros();
  }

  cancelarModificacion(): void {
    this.modoEdicion = false;
    this.modoCreacion = false;
    this.pasajeroSeleccionado = this.nuevoPasajero();
  }

  nuevoPasajero(): Pasajero {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      dni: '',
      email: ''
    };
  }
}
