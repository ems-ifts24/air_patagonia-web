import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VueloServiceService, Vuelo } from '../core/services/vuelo-service.service';
import { FormsModule } from '@angular/forms';
// Importo el servicio de vuelos para obtener el array de vuelos
// Importo la interface Vuelo para tipar el array de vuelos

@Component({
  selector: 'app-vuelos-vista-general',
  imports: [FormsModule],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrls: ['./vuelos-vista-general.component.css']
})
export class VuelosVistaGeneralComponent implements OnInit {
  todosLosVuelos: Vuelo[] = [];
  vuelos: Vuelo[] = [];
  inputBusqueda: string = '';

  constructor(
    private router: Router,
    private vueloService: VueloServiceService
  ) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    // Obtener los vuelos del servicio
    this.todosLosVuelos = this.vueloService.getVuelos();
    this.vuelos = [...this.todosLosVuelos];
  }

  esEditable(estado: string): boolean {
    return estado !== 'Eliminado' && estado !== 'En vuelo' && estado !== 'Cancelado';
  }

  crearVuelo() {
    this.router.navigate(['app/vuelos-gestion']);
  }

  editarVuelo(idVuelo: string) {
    this.router.navigate(['app/vuelos-gestion', idVuelo]);
  }

  eliminarVuelo(idVuelo: string): void {
    if (!confirm('¿Esta seguro de que desea eliminar este vuelo?')) {
      return;
    }

    const resultado = this.vueloService.marcarVueloComoEliminado(idVuelo);

    alert(resultado.mensaje);

    if (resultado.exito) {
      this.vuelos = this.vueloService.getVuelos();
    }
  }

  filtrarVuelos() {
    if (this.inputBusqueda && this.inputBusqueda.trim() !== '') {
      const busqueda = this.inputBusqueda.toLowerCase().trim();
      this.vuelos = this.vuelos.filter(vuelo =>
        vuelo.vuelo.toLowerCase().includes(busqueda)
        || vuelo.avion.marca.toLowerCase().includes(busqueda)
        || vuelo.avion.modelo.toLowerCase().includes(busqueda)
        || vuelo.origen.codigo.toLowerCase().includes(busqueda)
        || vuelo.destino.codigo.toLowerCase().includes(busqueda)
        || vuelo.origen.nombreCorto.toLowerCase().includes(busqueda)
        || vuelo.destino.nombreCorto.toLowerCase().includes(busqueda)
        || vuelo.estado.toLowerCase().includes(busqueda)
      );
    }
    else {
      this.vuelos = [...this.todosLosVuelos];
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
