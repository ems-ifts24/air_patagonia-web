import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VueloServiceService } from '../core/services/vuelo-service.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vuelos-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vuelos-listado.component.html',
  styleUrl: './vuelos-listado.component.css'
})
export class VuelosListadoComponent implements OnInit {
  vuelos: any[] = [];
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';
  listadoVuelosParaFiltrar: any[] = [];

  constructor(private vueloService: VueloServiceService) {}

  ngOnInit() {
    // Obtener los vuelos del servicio y mapear al formato esperado
    const vuelosServicio = this.vueloService.getVuelos();
    this.vuelos = vuelosServicio.map(vuelo => ({
      vuelo: vuelo.vuelo,
      modelo: vuelo.modelo,
      fechaPartida: vuelo.fechaPartida,
      fechaArribo: vuelo.fechaArribo,
      estado: vuelo.estado,
      origen: vuelo.origen,
      destino: vuelo.destino
      // origen: vuelo.origen.match(/\(([^)]+)\)/)?.[1] || vuelo.origen, // Extraer código IATA
      // destino: vuelo.destino.match(/\(([^)]+)\)/)?.[1] || vuelo.destino // Extraer código IATA
    }));
    
    this.listadoVuelosParaFiltrar = [...this.vuelos];
  }

  descargarExcel(): void {
    // Convierte el array de objetos (this.vuelos) a una hoja de cálculo
    const hoja = XLSX.utils.json_to_sheet(this.vuelos);

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
        vuelo.origen === this.origenSeleccionado
      );
    }
    
    // filtra x destino si hay un destino seleccionado
    if (this.destinoSeleccionado) {
      this.vuelos = this.vuelos.filter(vuelo => 
        vuelo.destino === this.destinoSeleccionado
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