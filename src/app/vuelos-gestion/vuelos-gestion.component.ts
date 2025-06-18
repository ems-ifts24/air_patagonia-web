import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { IAsignacion, IPuestoTripulante, ITripulanteDTO } from '../core/models/empleado.model';
import { IVuelo, IAvion, IAeropuerto, IVueloEstado } from '../core/models/vuelo.model';

@Component({
  selector: 'app-vuelos-gestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vuelos-gestion.component.html',
  styleUrl: './vuelos-gestion.component.css'
})
export class VuelosGestionComponent implements OnInit {

  modoEdicion: boolean = false;
  titleGestion: string = 'CREACIÓN';

  filtroEmpleado: string = '';
  empleados: ITripulanteDTO[] = [];
  empleadosFiltrados: ITripulanteDTO[] = [];
  puestosTripulante: IPuestoTripulante[] = [];
  estadosVuelo: IVueloEstado[] = [];
  listaAeropuertos: IAeropuerto[] = [];
  listaAviones: IAvion[] = [];

  vuelo: IVuelo | null = null;


  // inyecto el servicio
  constructor(private _router: Router,
    private _activeRouter: ActivatedRoute,
    private _apiService: ApiService) { }

  ngOnInit(): void {
    this.getTripulantesParaVuelo();
    this.getPuestosTripulante();
    this.getEstadosVuelo();
    this.getAviones();
    this.getAeropuertos();
    
    // Solo para Editar un vuelo :: Obtener el ID del vuelo de la URL
    this._activeRouter.params.subscribe(params => {
      this._apiService.getVueloById(params['id']).subscribe({
        next: (vuelo: IVuelo) => {
          this.vuelo = vuelo;
        },
        error: (error) => {
          if(error.mensaje){
            alert(error.mensaje);
          }
          console.error('Error al obtener el vuelo:', error);
        }
      });
    });

    if (this.vuelo) {
      this.modoEdicion = true;
      this.titleGestion = 'MODIFICACIÓN';
    }
  }

  // ------------
  // Inicio Pedidos HTTP para llenar los combos y lista de empleados disponibles
  // ------------

  getTripulantesParaVuelo(idVuelo?: string) {
    console.log('Buscando empleados disponibles y asignados al vuelo.');
    this._apiService.getTripulantesParaVuelo(idVuelo).subscribe({
      next: (empleados: ITripulanteDTO[]) => {
        console.log(`Se obtuvieron ${empleados.length} empleados.`);
        this.empleados = empleados;

        // Creo un nuevo array para no modificar el original
        this.empleadosFiltrados = [...this.empleados];
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los empleados:', error);
      }
    });
  }

  getPuestosTripulante() {
    console.log('Busco todos los puestos de tripulantes.');
    this._apiService.getPuestosTripulante().subscribe({
      next: (puestoTripulante: IPuestoTripulante[]) => {
        console.log(`Se obtuvieron ${puestoTripulante.length} puestos de tripulantes.`);
        this.puestosTripulante = puestoTripulante;
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los puestos de tripulantes:', error);
      }
    });
  }

  getEstadosVuelo() {
    console.log('Busco todos los estados de vuelo.');
    this._apiService.getEstadosVuelo().subscribe({
      next: (estadosVuelo: IVueloEstado[]) => {
        console.log(`Se obtuvieron ${estadosVuelo.length} estados de vuelo.`);
        this.estadosVuelo = estadosVuelo;
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los estados de vuelo:', error);
      }
    });
  }

  getAeropuertos() {
    console.log('Busco todos los aeropuertos.');
    this._apiService.getAeropuertos().subscribe({
      next: (aeropuertos: IAeropuerto[]) => {
        console.log(`Se obtuvieron ${aeropuertos.length} aeropuertos.`);
        this.listaAeropuertos = aeropuertos;
        // this.aeropuertosPartida = [...this.listaAeropuertos];
        // this.aeropuertosArribo = [...this.listaAeropuertos];
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los aeropuertos:', error);
      }
    });
  }

  getAviones() {
    console.log('Busco todos los aviones.');
    this._apiService.getAviones().subscribe({
      next: (aviones: IAvion[]) => {
        console.log(`Se obtuvieron ${aviones.length} aviones.`);
        this.listaAviones = aviones;
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los aviones:', error);
      }
    });
  }

  asignarTripulante(idVuelo: string, empleado: ITripulanteDTO) {
    console.log('Asignando tripulante al vuelo.');

    const asignacion: IAsignacion = {
      vuelo: {
        idVuelo: idVuelo
      },
      empleado: {
        idEmpleado: empleado.idEmpleado
      },
      puesto: {
        idPuestoTripulante: empleado.puestoTripulante?.idPuestoTripulante ?? ''
      }
    };

    this._apiService.asignarTripulanteVuelo(idVuelo, asignacion).subscribe({
      next: () => {
        console.log('Tripulante asignado al vuelo.');
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al asignar tripulante al vuelo:', error);
      }
    });
  }

  quitarTripulante(idVuelo: string, idTripulante: string) {
    console.log('Quitando tripulante del vuelo.');
    this._apiService.quitarTripulanteVuelo(idVuelo, idTripulante).subscribe({
      next: () => {
        console.log('Tripulante quitado del vuelo.');
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al quitar tripulante del vuelo:', error);
      }
    });
  }
  // ------------
  // Fin Pedidos HTTP
  // ------------


  cancelarModificacion() {
    this._router.navigate(['app/vuelos']);
  }

  aplicarFiltroEmpleados(): void {
    if (!this.filtroEmpleado) { // si no hay busqueda se muestra todo el listado
      this.empleados = [...this.empleadosFiltrados];
      return;
    }

    const busqueda = this.filtroEmpleado.toLowerCase();
    this.empleados = this.empleadosFiltrados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(busqueda) ||
      empleado.apellido.toLowerCase().includes(busqueda) ||
      (empleado.nroDocumento && empleado.nroDocumento.toLowerCase().includes(busqueda))
    );
  }
}
