import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vuelos-vista-general',
  imports: [],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrl: './vuelos-vista-general.component.css'
})
export class VuelosVistaGeneralComponent {
  vuelos: any[] = [
    {
      id: '1',
      vuelo: 'AP1234',
      modelo: '747',
      origen: 'Buenos Aires',
      destino: 'Bariloche',
      partida: '25/05/2025',
      arribo: '25/05/2025',
      estado: 'Finalizado'
    },
    {
      id: '2',
      vuelo: 'AP1235',
      modelo: 'A320',
      origen: 'Córdoba',
      destino: 'Ushuaia',
      partida: '26/05/2025',
      arribo: '26/05/2025',
      estado: 'En vuelo'
    },
    {
      id: '3',
      vuelo: 'AP1236',
      modelo: '737',
      origen: 'Rosario',
      destino: 'El Calafate',
      partida: '27/05/2025',
      arribo: '27/05/2025',
      estado: 'Programado'
    },
    {
      id: '4',
      vuelo: 'AP1237',
      modelo: '787',
      origen: 'Mendoza',
      destino: 'Bariloche',
      partida: '28/05/2025',
      arribo: '28/05/2025',
      estado: 'Programado'
    },
    {
      id: '5',
      vuelo: 'AP1238',
      modelo: 'A330',
      origen: 'Buenos Aires',
      destino: 'Ushuaia',
      partida: '29/05/2025',
      arribo: '29/05/2025',
      estado: 'En vuelo'
    },
    {
      id: '6',
      vuelo: 'AP1239',
      modelo: '777',
      origen: 'Córdoba',
      destino: 'El Calafate',
      partida: '30/05/2025',
      arribo: '30/05/2025',
      estado: 'Programado'
    },
    {
      id: '7',
      vuelo: 'AP1240',
      modelo: '747',
      origen: 'Rosario',
      destino: 'Bariloche',
      partida: '31/05/2025',
      arribo: '31/05/2025',
      estado: 'Programado'
    },
    {
      id: '8',
      vuelo: 'AP1241',
      modelo: 'A320',
      origen: 'Mendoza',
      destino: 'Ushuaia',
      partida: '01/06/2025',
      arribo: '01/06/2025',
      estado: 'En vuelo'
    },
    {
      id: '9',
      vuelo: 'AP1242',
      modelo: '737',
      origen: 'Buenos Aires',
      destino: 'El Calafate',
      partida: '02/06/2025',
      arribo: '02/06/2025',
      estado: 'Programado'
    },
    {
      id: '10',
      vuelo: 'AP1243',
      modelo: '787',
      origen: 'Córdoba',
      destino: 'Bariloche',
      partida: '03/06/2025',
      arribo: '03/06/2025',
      estado: 'Programado'
    }
  ];

  constructor(private router: Router) { }

  crearVuelo(){
    this.router.navigate(['app/vuelos-gestion']);
  }

  editarVuelo(idVuelo: string){
    alert("Editar vuelo: " + idVuelo);
  }

  eliminarVuelo(idVuelo: string){
    alert("Eliminar vuelo: " + idVuelo);
  }
}
