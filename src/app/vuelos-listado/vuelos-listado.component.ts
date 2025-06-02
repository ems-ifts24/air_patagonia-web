import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';// libreria para trabajar con EXCEL

@Component({
  selector: 'app-vuelos-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vuelos-listado.component.html',
  styleUrl: './vuelos-listado.component.css'
})
export class VuelosListadoComponent {
   //Enlace de datos
    vuelos = [
    { vuelo: 'AP1978', modelo: '747', fechaPartida: '25/05/2025', fechaArribo: '25/05/2025', estado: 'Finalizado',origen:'AEP',destino:'USH' },
    { vuelo: 'AP1979', modelo: '738', fechaPartida: '30/05/2025', fechaArribo: '30/05/2025', estado: 'Programado',origen:'SAL',destino:'TUC'},
    { vuelo: 'AP1979', modelo: '999', fechaPartida: '26/06/2025', fechaArribo: '27/06/2025', estado: 'Programado',origen:'AEP',destino:'IGR'},
    { vuelo: 'AP1979', modelo: '532', fechaPartida: '10/05/2025', fechaArribo: '10/05/2025', estado: 'En curso',origen:'EZE',destino:'ROS'},
    { vuelo: 'AP1979', modelo: '523', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'Reprogramado',origen:'REL',destino:'USH'},
    { vuelo: 'AP1979', modelo: '747', fechaPartida: '27/05/2025', fechaArribo: '27/05/2025', estado: 'En curso',origen:'EZE',destino:'USH'},
    { vuelo: 'AP1979', modelo: '253', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'Reprogramado',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '744', fechaPartida: '08/05/2025', fechaArribo: '09/05/2025', estado: 'En curso',origen:'COR',destino:'ROS'},
    { vuelo: 'AP1979', modelo: '855', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'Cancelado',origen:'JUJ',destino:'CRD'},
  ];
  

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


  //
  // Filtrado de reporte
  origenSeleccionado: string = '';
  destinoSeleccionado: string = '';

  // se usan los 3 puntos para hacer una copia del array, sino apuntaria al mismo array
  listadoVuelosParaFiltrar = [...this.vuelos];

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
}