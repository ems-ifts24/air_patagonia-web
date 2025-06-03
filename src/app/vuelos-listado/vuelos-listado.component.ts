import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VueloServiceService, Vuelo, Aeropuerto } from '../core/services/vuelo-service.service';
// Importo el servicio de vuelos para obtener el array de vuelos
// Importo la interface Vuelo para tipar el array de vuelos
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vuelos-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vuelos-listado.component.html',
  styleUrls: ['./vuelos-listado.component.css']
})
export class VuelosListadoComponent implements OnInit {
  vuelos: Vuelo[] = [];
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';
  listadoVuelosParaFiltrar: Vuelo[] = [];
  aeropuertos: Aeropuerto[] = [];
  // aeropuertos: { codigo: string; nombre: string; ciudad: string }[] = [];

  constructor(private vueloService: VueloServiceService) {}

  ngOnInit() {
    // Obtener la lista de aeropuertos del servicio
    this.aeropuertos = this.vueloService.getAeropuertos();
    
    // Obtener los vuelos del servicio
    this.vuelos = this.vueloService.getVuelos();
    
    // Con los 3 puntos adelante se crea una copia del array de vuelos para filtrar
    this.listadoVuelosParaFiltrar = [...this.vuelos];
  }

  descargarExcel(): void {
    // Transformar los datos porque ahora el array de vuelos tiene objetos anidados
    // Creo un nuevo array con los datos de avion y aeropuerto para usar en el Excel
    const datosParaExcel = this.vuelos.map(vuelo => ({
      'Vuelo': vuelo.vuelo,
      'Avión': `${vuelo.avion.marca} ${vuelo.avion.modelo}`,
      'Origen': `${vuelo.origen.codigo} - ${vuelo.origen.nombreCorto}`,
      'Destino': `${vuelo.destino.codigo} - ${vuelo.destino.nombreCorto}`,
      'Fecha Partida': vuelo.fechaPartida,
      'Fecha Arribo': vuelo.fechaArribo,
      'Estado': vuelo.estado
    }));

    // Convierte el array de objetos (this.vuelos) a una hoja de cálculo
    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);

    // Crea un nuevo libro de Excel vacío
    const libro = XLSX.utils.book_new();

    // Agrega la hoja de cálculo al libro con el nombre "Vuelos"
    XLSX.utils.book_append_sheet(libro, hoja, 'Vuelos');

    // Genera el archivo Excel con el nombre "vuelos.xlsx" y lo descarga
    XLSX.writeFile(libro, 'vuelos.xlsx');
  }

  filtrarVuelos() {
    // se restauran todos los vuelos
    this.vuelos = [...this.listadoVuelosParaFiltrar];
    
    // filtra x origen si hay un origen seleccionado
    if (this.origenSeleccionado) {
      this.vuelos = this.vuelos.filter(vuelo => 
        vuelo.origen.codigo === this.origenSeleccionado
      );
    }
    
    // filtra x destino si hay un destino seleccionado
    if (this.destinoSeleccionado) {
      this.vuelos = this.vuelos.filter(vuelo => 
        vuelo.destino.codigo === this.destinoSeleccionado
      );
    }
  }

  // limpiar filtros
  limpiarFiltros() {
    this.origenSeleccionado = '';
    this.destinoSeleccionado = '';
    this.filtrarVuelos();  //invoco a funcion de filtrar
  }
}