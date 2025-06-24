import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { IVuelo } from '../core/models/vuelo.model';

// Importo el servicio de vuelos para obtener el array de vuelos
// Importo la interface Vuelo para tipar el array de vuelos

@Component({
  selector: 'app-vuelos-vista-general',
  imports: [FormsModule],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrls: ['./vuelos-vista-general.component.css']
})
export class VuelosVistaGeneralComponent implements OnInit {
  todosLosVuelos: IVuelo[] = [];
  vuelosFiltrados: IVuelo[] = [];
  inputBusqueda: string = '';

  constructor(
    private router: Router,
    private _apiService: ApiService
  ) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    console.log('ngOnInit :: VuelosVistaGeneralComponent');
    this.obtenerTodosLosVuelos();

    // Muevo esta asignación dentro del método obtenerTodosLosVuelos porque como es una respuesta asincrona
    // no se llena el array de vuelosFiltrados en el orden esperado
    // this.vuelosFiltrados = [...this.todosLosVuelos];
  }

  private obtenerTodosLosVuelos() {
    console.log('Busco todos los vuelos.');
    this._apiService.getVuelos().subscribe({
      next: (vuelos: IVuelo[]) => {
        console.log(`Se obtuvieron ${vuelos.length} vuelos.`);
        this.todosLosVuelos = vuelos;

        // Los tres puntos adelante hacen una copia del array original
        this.vuelosFiltrados = [...this.todosLosVuelos];
      },
      error: (error) => {
        if(error.mensaje){
          alert(error.mensaje);
        }
        console.error('Error al obtener todos los vuelos:', error);
      }
    });
  }

  esEditable(estado: string): boolean {
    return estado === 'Programado' || estado === 'Reprogramado' || estado === 'Demorado';
  }

  crearVuelo() {
    this.router.navigate(['app/vuelos-gestion']);
  }

  editarVuelo(idVuelo: string) {
    this.router.navigate(['app/vuelos-gestion', idVuelo]);
  }

  eliminarVuelo(idVuelo: string): void {
    if (confirm('¿Esta seguro de que desea eliminar este vuelo?')) {
      this._apiService.deleteVuelo(idVuelo).subscribe({
        next: () => {
          console.log('Vuelo eliminado correctamente.');
          this.obtenerTodosLosVuelos();
        },
        error: (error) => {
          console.error('Error al eliminar el vuelo:', error);
          alert('Falló la eliminación del vuelo: ' + error.mensaje);
        }
      });

      return;
    }

    alert('Operación cancelada.');
  }

  filtrarVuelos() {
    if (this.inputBusqueda && this.inputBusqueda.trim() !== '') {
      const busqueda = this.inputBusqueda.toLowerCase().trim();
      this.vuelosFiltrados = this.todosLosVuelos.filter((vuelo: IVuelo) =>
        vuelo.aliasVuelo.toLowerCase().includes(busqueda)
        || vuelo.avion.fabricante.toLowerCase().includes(busqueda)
        || vuelo.avion.modelo.toLowerCase().includes(busqueda)
        || vuelo.aeropuertoPartida.codigoIATA.toLowerCase().includes(busqueda)
        || vuelo.aeropuertoArribo.codigoIATA.toLowerCase().includes(busqueda)
        || vuelo.aeropuertoPartida.nombreCorto.toLowerCase().includes(busqueda)
        || vuelo.aeropuertoArribo.nombreCorto.toLowerCase().includes(busqueda)
        || vuelo.estado.descripcion.toLowerCase().includes(busqueda)
      );
    }
    else {
      this.vuelosFiltrados = [...this.todosLosVuelos];
    }
  }

  limpiarBusqueda() {
    document.getElementById('inputBusqueda')?.focus();
    // uso HTMLInputElement para tipar el elemento, para que no marque error
    // de esta forma le dice a typeScript confiá que el elemento es un input y tiene la propiedad value
    (document.getElementById('inputBusqueda') as HTMLInputElement).value = '';
    this.inputBusqueda = '';
    this.filtrarVuelos();
  }
}
