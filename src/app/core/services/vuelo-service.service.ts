import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VueloServiceService {
  private vuelos = [
    {
      id: '1',
      vuelo: 'AP1234',
      modelo: '747',
      origen: 'Buenos Aires (EZE)',
      destino: 'Bariloche (BRC)',
      partida: '25/05/2025',
      arribo: '25/05/2025',
      estado: 'Finalizado'
    },
    {
      id: '2',
      vuelo: 'AP1235',
      modelo: 'A320',
      origen: 'Córdoba (COR)',
      destino: 'Ushuaia (USH)',
      partida: '26/05/2025',
      arribo: '26/05/2025',
      estado: 'En vuelo'
    },
    {
      id: '3',
      vuelo: 'AP1236',
      modelo: '737',
      origen: 'Rosario (ROS)',
      destino: 'El Calafate (FTE)',
      partida: '27/05/2025',
      arribo: '27/05/2025',
      estado: 'Programado'
    },
    {
      id: '4',
      vuelo: 'AP1237',
      modelo: '787',
      origen: 'Mendoza (MDZ)',
      destino: 'Bariloche (BRC)',
      partida: '28/05/2025',
      arribo: '28/05/2025',
      estado: 'Programado'
    },
    {
      id: '5',
      vuelo: 'AP1238',
      modelo: 'A330',
      origen: 'Buenos Aires (AEP)',
      destino: 'Ushuaia (USH)',
      partida: '29/05/2025',
      arribo: '29/05/2025',
      estado: 'En vuelo'
    },
    {
      id: '6',
      vuelo: 'AP1239',
      modelo: '777',
      origen: 'Córdoba (COR)',
      destino: 'El Calafate (FTE)',
      partida: '30/05/2025',
      arribo: '30/05/2025',
      estado: 'Programado'
    },
    {
      id: '7',
      vuelo: 'AP1240',
      modelo: '747',
      origen: 'Rosario (ROS)',
      destino: 'Bariloche (BRC)',
      partida: '31/05/2025',
      arribo: '31/05/2025',
      estado: 'Programado'
    },
    {
      id: '8',
      vuelo: 'AP1241',
      modelo: 'A320',
      origen: 'Mendoza (MDZ)',
      destino: 'Ushuaia (USH)',
      partida: '01/06/2025',
      arribo: '01/06/2025',
      estado: 'En vuelo'
    },
    {
      id: '9',
      vuelo: 'AP1242',
      modelo: '737',
      origen: 'Buenos Aires (EZE)',
      destino: 'El Calafate (FTE)',
      partida: '02/06/2025',
      arribo: '02/06/2025',
      estado: 'Programado'
    }
  ];

  constructor() { }

  getVuelos() {
    return [...this.vuelos];
  }

  getVueloById(id: string) {
    return this.vuelos.find(vuelo => vuelo.id === id);
  }
}
