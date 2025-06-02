import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';// libreria para trabajar con EXCEL

@Component({
  selector: 'app-vuelos-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vuelos-listado.component.html',
  styleUrl: './vuelos-listado.component.css'
})
export class VuelosListadoComponent {
   //Enlace de datos
    vuelos = [
    { vuelo: 'AP1978', modelo: '747', fechaPartida: '25/05/2025', fechaArribo: '25/05/2025', estado: 'Finalizado',origen:'AEP',destino:'USH' },
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    { vuelo: 'AP1979', modelo: '737', fechaPartida: '26/05/2025', fechaArribo: '26/05/2025', estado: 'En curso',origen:'AEP',destino:'USH'},
    
    
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

}