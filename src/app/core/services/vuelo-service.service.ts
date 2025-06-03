import { Injectable } from '@angular/core';

export interface Aeropuerto {
  codigo: string;
  nombre: string;
  ciudad: string;
  nombreCorto: string;
}

export interface Vuelo {
  id: string;
  vuelo: string;
  avion: Avion;
  origen: Aeropuerto;
  destino: Aeropuerto;
  fechaPartida: string;
  fechaArribo: string;
  estado: string;
}

export interface Avion {
  id: string;
  marca: string;
  modelo: string;
}

export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  rol: string;
  asignado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VueloServiceService {

  // Propiedad privada para almacenar la lista de vuelos que se inicializan en el constructor
  private vuelos: Vuelo[] = [];

  constructor() {
    this.initializeVuelos();
  }

  // Aeropuertos
  // Propiedad privada para almacenar la lista de aeropuertos
  private aeropuertos: Aeropuerto[] = [
    { codigo: 'EZE', nombre: 'Aeropuerto Internacional Ministro Pistarini', ciudad: 'Buenos Aires', nombreCorto: 'Bs. As.' },
    { codigo: 'AEP', nombre: 'Aeropuerto Jorge Newbery', ciudad: 'Ciudad de Buenos Aires', nombreCorto: 'CABA' },
    { codigo: 'COR', nombre: 'Aeropuerto Internacional Ingeniero Ambrosio L.V. Taravella', ciudad: 'Córdoba', nombreCorto: 'Córdoba' },
    { codigo: 'MDZ', nombre: 'Aeropuerto Internacional Gobernador Francisco Gabrielli', ciudad: 'Mendoza', nombreCorto: 'Mendoza' },
    { codigo: 'ROS', nombre: 'Aeropuerto Internacional Rosario Islas Malvinas', ciudad: 'Rosario', nombreCorto: 'Rosario' },
    { codigo: 'SAL', nombre: 'Aeropuerto Internacional Martín Miguel de Güemes', ciudad: 'Salta', nombreCorto: 'Salta' },
    { codigo: 'TUC', nombre: 'Aeropuerto Internacional Teniente General Benjamín Matienzo', ciudad: 'San Miguel de Tucumán', nombreCorto: 'Tucumán' },
    { codigo: 'BRC', nombre: 'Aeropuerto Internacional Teniente Luis Candelaria', ciudad: 'San Carlos de Bariloche', nombreCorto: 'Bariloche' },
    { codigo: 'USH', nombre: 'Aeropuerto Internacional Malvinas Argentinas', ciudad: 'Ushuaia', nombreCorto: 'Ushuaia' },
    { codigo: 'IGR', nombre: 'Aeropuerto Internacional Cataratas del Iguazú', ciudad: 'Puerto Iguazú', nombreCorto: 'Iguazú' },
    { codigo: 'REL', nombre: 'Aeropuerto Almirante Marcos A. Zar', ciudad: 'Trelew', nombreCorto: 'Trelew' },
    { codigo: 'CRD', nombre: 'Aeropuerto Internacional General Enrique Mosconi', ciudad: 'Comodoro Rivadavia', nombreCorto: 'Rivadavia' },
    { codigo: 'JUJ', nombre: 'Aeropuerto Internacional Gobernador Horacio Guzmán', ciudad: 'San Salvador de Jujuy', nombreCorto: 'Jujuy' },
    { codigo: 'FTE', nombre: 'Aeropuerto Internacional Comandante Armando Tola', ciudad: 'El Calafate', nombreCorto: 'Calafate' },
    { codigo: 'PSS', nombre: 'Aeropuerto Internacional Libertador General José de San Martín', ciudad: 'Posadas', nombreCorto: 'Posadas' },
    { codigo: 'NQN', nombre: 'Aeropuerto Internacional Presidente Perón', ciudad: 'Neuquén', nombreCorto: 'Neuquén' },
    { codigo: 'AFA', nombre: 'Aeropuerto Suboficial Ayudante Santiago Germano', ciudad: 'San Rafael', nombreCorto: 'San Rafael' },
    { codigo: 'RGL', nombre: 'Aeropuerto Internacional Piloto Civil Norberto Fernández', ciudad: 'Río Gallegos', nombreCorto: 'Río Gallegos' },
    { codigo: 'MDQ', nombre: 'Aeropuerto Internacional Astor Piazzolla', ciudad: 'Mar del Plata', nombreCorto: 'Mar del Plata' },
    { codigo: 'ASU', nombre: 'Aeropuerto Internacional Silvio Pettirossi', ciudad: 'Asunción', nombreCorto: 'Asunción' },
    { codigo: 'LIM', nombre: 'Aeropuerto Internacional Jorge Chávez', ciudad: 'Lima', nombreCorto: 'Lima' },
    { codigo: 'MAO', nombre: 'Aeropuerto Internacional Eduardo Gomes', ciudad: 'Manaus', nombreCorto: 'Manaus' },
    { codigo: 'PUQ', nombre: 'Aeropuerto Presidente Carlos Ibáñez del Campo', ciudad: 'Punta Arenas', nombreCorto: 'Punta Arenas' },
    { codigo: 'MVD', nombre: 'Aeropuerto Internacional de Carrasco', ciudad: 'Montevideo', nombreCorto: 'Montevideo' },
    { codigo: 'GRU', nombre: 'Aeropuerto Internacional de São Paulo/Guarulhos', ciudad: 'São Paulo', nombreCorto: 'São Paulo' },
    { codigo: 'GIG', nombre: 'Aeropuerto Internacional Antônio Carlos Jobim', ciudad: 'Río de Janeiro', nombreCorto: 'Río de Janeiro' },
    { codigo: 'SCL', nombre: 'Aeropuerto Internacional Arturo Merino Benítez', ciudad: 'Santiago de Chile', nombreCorto: 'Santiago de Chile' }
  ];

  // Método para obtener la lista de aeropuertos, los 3 puntos adelante crean una copia del array
  getAeropuertos(): Aeropuerto[] {
    return [...this.aeropuertos];
  }

  private getAeropuertoByCodigo(codigo: string): Aeropuerto | undefined {
    return this.aeropuertos.find(a => a.codigo === codigo);
  }

  // Aviones
  private aviones: any[] = [
    { id: 'AV001', marca: 'Boeing', modelo: '737-800' },
    { id: 'AV002', marca: 'Airbus', modelo: 'A320neo' },
    { id: 'AV003', marca: 'Boeing', modelo: '787-9 DM' },
    { id: 'AV004', marca: 'Airbus', modelo: 'A350-900' },
    { id: 'AV005', marca: 'Embraer', modelo: 'E190' },
    { id: 'AV006', marca: 'Boeing', modelo: '777-300ER' },
    { id: 'AV007', marca: 'Airbus', modelo: 'A330-200' },
    { id: 'AV008', marca: 'Bombardier', modelo: 'CRJ900' },
    { id: 'AV009', marca: 'Airbus', modelo: 'A220-300' },
    { id: 'AV010', marca: 'Boeing', modelo: '747-8' }
  ];

  private getAvionById(id: string): any | undefined {
    return this.aviones.find(avion => avion.id === id);
  }

  // Empleados
  private empleados: Empleado[] = [
    { id: 'E001', nombre: 'Ezequiel', apellido: 'Lopez', dni: '38705210', rol: '' , asignado: false},
    { id: 'E002', nombre: 'Ana', apellido: 'Gomez', dni: '34567890', rol: '' , asignado: false},
    { id: 'E003', nombre: 'Carlos', apellido: 'Ruiz', dni: '30123456', rol: '' , asignado: false},
    { id: 'E004', nombre: 'Laura', apellido: 'Fernandez', dni: '28901234', rol: '' , asignado: false},
    { id: 'E005', nombre: 'Pedro', apellido: 'Martinez', dni: '32765432', rol: '' , asignado: false}
  ];

  public getEmpleados(): Empleado[] {
    return [...this.empleados];
  }

  // Vuelos
  private initializeVuelos(): void {
    this.vuelos = [
      {
        id: '1',
        vuelo: 'AP1234',
        avion: this.getAvionById('AV001')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: '25/05/2025',
        fechaArribo: '25/05/2025',
        estado: 'En vuelo'
      },
      {
        id: '2',
        vuelo: 'AP1235',
        avion: this.getAvionById('AV002')!,
        origen: this.getAeropuertoByCodigo('AEP')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: '26/05/2025',
        fechaArribo: '26/05/2025',
        estado: 'Programado'
      },
      {
        id: '3',
        vuelo: 'AP1236',
        avion: this.getAvionById('AV003')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: '27/05/2025',
        fechaArribo: '27/05/2025',
        estado: 'Programado'
      },
      {
        id: '4',
        vuelo: 'AP1237',
        avion: this.getAvionById('AV004')!,
        origen: this.getAeropuertoByCodigo('MDZ')!,
        destino: this.getAeropuertoByCodigo('BRC')!,
        fechaPartida: '28/05/2025',
        fechaArribo: '28/05/2025',
        estado: 'Programado'
      },
      {
        id: '5',
        vuelo: 'AP1238',
        avion: this.getAvionById('AV005')!,
        origen: this.getAeropuertoByCodigo('AEP')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: '29/05/2025',
        fechaArribo: '29/05/2025',
        estado: 'En vuelo'
      },
      {
        id: '6',
        vuelo: 'AP1239',
        avion: this.getAvionById('AV006')!,
        origen: this.getAeropuertoByCodigo('COR')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: '30/05/2025',
        fechaArribo: '30/05/2025',
        estado: 'Programado'
      },
      {
        id: '7',
        vuelo: 'AP1240',
        avion: this.getAvionById('AV007')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('BRC')!,
        fechaPartida: '31/05/2025',
        fechaArribo: '31/05/2025',
        estado: 'Programado'
      },
      {
        id: '8',
        vuelo: 'AP1241',
        avion: this.getAvionById('AV008')!,
        origen: this.getAeropuertoByCodigo('MDZ')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: '01/06/2025',
        fechaArribo: '01/06/2025',
        estado: 'En vuelo'
      },
      {
        id: '9',
        vuelo: 'AP1242',
        avion: this.getAvionById('AV009')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: '02/06/2025',
        fechaArribo: '02/06/2025',
        estado: 'Programado'
      },
      {
        id: '10',
        vuelo: 'AP1243',
        avion: this.getAvionById('AV010')!,
        origen: this.getAeropuertoByCodigo('PSS')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: '03/06/2025',
        fechaArribo: '03/06/2025',
        estado: 'Programado'
      },
      {
        id: '11',
        vuelo: 'AP1244',
        avion: this.getAvionById('AV001')!,
        origen: this.getAeropuertoByCodigo('NQN')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: '04/06/2025',
        fechaArribo: '04/06/2025',
        estado: 'Programado'
      },
      {
        id: '12',
        vuelo: 'AP1245',
        avion: this.getAvionById('AV002')!,
        origen: this.getAeropuertoByCodigo('AFA')!,
        destino: this.getAeropuertoByCodigo('MDZ')!,
        fechaPartida: '05/06/2025',
        fechaArribo: '05/06/2025',
        estado: 'Programado'
      },
      {
        id: '13',
        vuelo: 'AP1246',
        avion: this.getAvionById('AV003')!,
        origen: this.getAeropuertoByCodigo('RGL')!,
        destino: this.getAeropuertoByCodigo('EZE')!,
        fechaPartida: '06/06/2025',
        fechaArribo: '06/06/2025',
        estado: 'Programado'
      },
      {
        id: '14',
        vuelo: 'AP1247',
        avion: this.getAvionById('AV004')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: '07/06/2025',
        fechaArribo: '07/06/2025',
        estado: 'Programado'
      },
      {
        id: '15',
        vuelo: 'AP1248',
        avion: this.getAvionById('AV005')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: '08/06/2025',
        fechaArribo: '08/06/2025',
        estado: 'Programado'
      },
      {
        id: '16',
        vuelo: 'AP1249',
        avion: this.getAvionById('AV006')!,
        origen: this.getAeropuertoByCodigo('BRC')!,
        destino: this.getAeropuertoByCodigo('MDZ')!,
        fechaPartida: '09/06/2025',
        fechaArribo: '09/06/2025',
        estado: 'Programado'
      },
      {
        id: '17',
        vuelo: 'AP1250',
        avion: this.getAvionById('AV007')!,
        origen: this.getAeropuertoByCodigo('FTE')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: '10/06/2025',
        fechaArribo: '10/06/2025',
        estado: 'Programado'
      },
      {
        id: '18',
        vuelo: 'AP1251',
        avion: this.getAvionById('AV008')!,
        origen: this.getAeropuertoByCodigo('USH')!,
        destino: this.getAeropuertoByCodigo('RGL')!,
        fechaPartida: '11/06/2025',
        fechaArribo: '11/06/2025',
        estado: 'Programado'
      },
      {
        id: '19',
        vuelo: 'AP1252',
        avion: this.getAvionById('AV009')!,
        origen: this.getAeropuertoByCodigo('PSS')!,
        destino: this.getAeropuertoByCodigo('ROS')!,
        fechaPartida: '12/06/2025',
        fechaArribo: '12/06/2025',
        estado: 'Programado'
      }
    ];
  }

  getVuelos(): Vuelo[] {
    return [...this.vuelos];
  }

  getVueloById(id: string): Vuelo | undefined {
    return this.vuelos.find(vuelo => vuelo.id === id);
  }
}