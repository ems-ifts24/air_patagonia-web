import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { IAsignacion, IPuestoTripulante, ITripulanteDTO } from '../core/models/empleado.model';
import { IVuelo, IAvion, IAeropuerto, IVueloEstado, IVueloDTO } from '../core/models/vuelo.model';
import { VueloConvertService } from '../core/services/vuelo-convert.service';

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
  fechaActual: Date = new Date();

  filtroEmpleado: string = '';
  empleados: ITripulanteDTO[] = [];
  empleadosFiltrados: ITripulanteDTO[] = [];
  puestosTripulante: IPuestoTripulante[] = [];
  estadosVuelo: IVueloEstado[] = [];
  listaAeropuertos: IAeropuerto[] = [];
  listaAviones: IAvion[] = [];

  // Evito problemas al usar objeto nulo inicializandolo con valores por default
  vuelo: IVuelo = {
    idVuelo: '',
    aliasVuelo: '',
    estado: { nombre: 'PROGRAMADO', descripcion: 'Programado' },
    avion: { idAvion: '', fabricante: '', modelo: '', autonomia: 0, matricula: '', estadoAvion: '' },
    aeropuertoPartida: { idAeropuerto: '', codigoIATA: '', ciudad: '', nombreAeropuerto: '', nombreCorto: '', pais: '', estadoAeropuerto: '' },
    aeropuertoArribo: { idAeropuerto: '', codigoIATA: '', ciudad: '', nombreAeropuerto: '', nombreCorto: '', pais: '', estadoAeropuerto: '' },
    fechaPartida: this.fechaActual,
    fechaArribo: this.fechaActual
  };


  // inyecto servicios
  constructor(private _router: Router,
    private _activeRouter: ActivatedRoute,
    private _apiService: ApiService,
    private _vueloConvertService: VueloConvertService) { }

  ngOnInit(): void {
    this.obtenerPuestosTripulante();
    this.obtenerEstadosVuelo();
    this.obtenerAviones();
    this.obtenerAeropuertos();
    
    // Solo para Editar un vuelo :: Obtener el ID del vuelo de la URL
    this._activeRouter.params.subscribe((params: any) => {
      if(params['id']){
        this.titleGestion = 'MODIFICACIÓN';
        this.modoEdicion = true;
        
        this._apiService.getVueloById(params['id']).subscribe({
          next: (vuelo: IVuelo) => {
            this.vuelo = vuelo;
            this.obtenerTripulantesParaVuelo(this.vuelo.idVuelo);
          },
          error: (error) => {
            if(error.mensaje){
              alert(error.mensaje);
            }
            console.error('Error al obtener el vuelo:', error);
          }
        });
      } else {
        this.obtenerTripulantesParaVuelo();
      }
    });
  }


  crearVueloDTO() {
    console.log('Creando vuelo.');
    if (!this.esFormularioValido()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    if (!this.esFechaValida()) {
      alert('La fecha de arribo debe ser posterior a la fecha de partida');
      return;
    }
   
    const vueloDTO: IVueloDTO = this._vueloConvertService.convertirVueloAVueloDTO(this.vuelo);
    this._apiService.createVueloDTO(vueloDTO).subscribe({
      next: (vuelo: IVuelo) => {
        console.log('Vuelo creado.', vuelo);
        this._router.navigate(['app/vuelos']);
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al crear el vuelo:', error);
      }
    });
  }

  actualizarVuelo() {
    if (!this.esFormularioValido()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    if (!this.esFechaValida()) {
      alert('La fecha de arribo debe ser posterior a la fecha de partida');
      return;
    }
    console.log('Actualizando vuelo.');
    const vueloDTO: IVueloDTO = this._vueloConvertService.convertirVueloAVueloDTO(this.vuelo);
    this._apiService.updateVuelo(this.vuelo.idVuelo, vueloDTO).subscribe({
      next: (vuelo: IVuelo) => {
        console.log('Vuelo actualizado.', vuelo);
        this._router.navigate(['app/vuelos']);
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al actualizar el vuelo:', error);
      }
    });
  }

  toggleAsignacion(empleado: ITripulanteDTO) {
    if (this.esTripulanteAsignado(empleado)) {
      this.quitarTripulante(empleado);
    } else {
      this.asignarTripulante(empleado);
    }
  }

  onPuestoChange(empleado: ITripulanteDTO, nuevoPuesto: IPuestoTripulante | null) {
    if (!nuevoPuesto) return;
    
    let esNuevo = (empleado.puestoTripulante == null || empleado.puestoTripulante == undefined);
    console.log('Cambiando puesto del tripulante: ' + empleado.puestoTripulante?.puesto + ' a ' + nuevoPuesto.puesto);

    empleado.puestoTripulante = nuevoPuesto;

    if (esNuevo){
      this.asignarTripulante(empleado);
    }else{
      this.actualizarTripulante(empleado);
    }
  }

  asignarTripulante(empleado: ITripulanteDTO) {
    console.log('Asignando tripulante {} al vuelo con id: {}', empleado, this.vuelo.idVuelo);
    const asignacion: IAsignacion = this._vueloConvertService.convertirTripulanteDTOAAignacion(empleado);
    asignacion.vuelo.idVuelo = this.vuelo.idVuelo; // fuerzo el id del vuelo porque no viene en el DTO
    this._apiService.asignarTripulanteVuelo(this.vuelo.idVuelo, asignacion).subscribe({
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

  actualizarTripulante(empleado: ITripulanteDTO) {
    console.log('Actualizando tripulante {} del vuelo con id: {}', empleado, this.vuelo.idVuelo);
    const asignacion: IAsignacion = this._vueloConvertService.convertirTripulanteDTOAAignacion(empleado);
    asignacion.vuelo.idVuelo = this.vuelo.idVuelo; // fuerzo el id del vuelo porque no viene en el DTO
    this._apiService.actualizarTripulanteVuelo(this.vuelo.idVuelo, empleado.idEmpleado, asignacion).subscribe({
      next: () => {
        console.log('Tripulante actualizado al vuelo.');
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al actualizar tripulante del vuelo:', error);
      }
    });
  }

  quitarTripulante(empleado: ITripulanteDTO) {
    console.log('Quitando tripulante {} del vuelo con id: {}', empleado, this.vuelo.idVuelo);

    this._apiService.quitarTripulanteVuelo(this.vuelo.idVuelo, empleado.idEmpleado).subscribe({
      next: () => {
        console.log('Tripulante quitado del vuelo.');
        this.obtenerTripulantesParaVuelo(this.vuelo.idVuelo);
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al quitar tripulante del vuelo:', error);
      }
    });
  }

  // -------------------------------
  // Inicia validación de formulario
  // -------------------------------
  esFormularioValido(): boolean {
    return (
      this.vuelo.avion?.idAvion !== '' &&
      this.vuelo.aeropuertoPartida?.idAeropuerto !== '' &&
      this.vuelo.aeropuertoArribo?.idAeropuerto !== '' &&
      this.vuelo.estado?.nombre !== ''
    );
  }
  esFechaValida(): boolean {
    return (
      this.vuelo.fechaPartida !== null &&
      this.vuelo.fechaArribo !== null &&
      this.vuelo.fechaPartida < this.vuelo.fechaArribo
    );
  }

  esTripulanteAsignado(empleado: ITripulanteDTO): boolean {
    return empleado.puestoTripulante !== null && empleado.puestoTripulante?.idPuestoTripulante !== '';
  }

  // -------------------------------
  // Termina validación de formulario
  // -------------------------------


  eliminarVuelo(idVuelo: string) {
    console.log('Eliminando vuelo.');
    this._apiService.deleteVuelo(idVuelo).subscribe({
      next: () => {
        console.log('Vuelo eliminado.');
        // this._router.navigate(['app/vuelos']);
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al eliminar el vuelo:', error);
      }
    });
  }

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

  // Metodo que evita mostrar el puesto asignado al empleado dos veces en el select
  filtrarPuestosTripulante(idPuesto?: string): IPuestoTripulante[] {
    if (!idPuesto)
      return [...this.puestosTripulante];
    else
      return this.puestosTripulante.filter(puesto => puesto.idPuestoTripulante !== idPuesto);
  }


  // ---------------------------------------------------------------------------
  // Inicio Pedidos HTTP para llenar los combos y lista de empleados disponibles
  // ---------------------------------------------------------------------------
  obtenerTripulantesParaVuelo(idVuelo?: string) {
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

  obtenerPuestosTripulante() {
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

  obtenerEstadosVuelo() {
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

  obtenerAeropuertos() {
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

  obtenerAviones() {
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
  // -----------------
  // Fin Pedidos HTTP
  // -----------------

}
