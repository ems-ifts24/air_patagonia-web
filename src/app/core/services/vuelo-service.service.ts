import th from '@angular/common/locales/th';
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
  eliminado: boolean;
  tripulantes: Empleado[];
  pasajeros: Pasajero[];
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

export interface RolTripulante {
  id: string;
  nombre: string;
}

export interface EstadoVuelo {
  id: string;
  nombre: string;
}

export interface Pasajero {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
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
  public getAeropuertos(): Aeropuerto[] {
    return [...this.aeropuertos];
  }

  public getAeropuertoByCodigo(codigo: string): Aeropuerto | undefined {
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

  // Metodo para obtener la lista de aviones
  public getAviones(): Avion[] {
    return [...this.aviones];
  }

  // Metodo para obtener un avion por su id
  public getAvionById(id: string): any | undefined {
    return this.aviones.find(avion => avion.id === id);
  }

  // Empleados
  private empleados: Empleado[] = [
    { id: 'E001', nombre: 'Ezequiel', apellido: 'Lopez', dni: '38705210', rol: '', asignado: false },
    { id: 'E002', nombre: 'Valentina', apellido: 'García', dni: '33456789', rol: '', asignado: false },
    { id: 'E003', nombre: 'Carlos', apellido: 'Ruiz', dni: '30123456', rol: '', asignado: false },
    { id: 'E004', nombre: 'Camila', apellido: 'Díaz', dni: '34567890', rol: '', asignado: false },
    { id: 'E005', nombre: 'Pedro', apellido: 'Martinez', dni: '32765432', rol: '', asignado: false },
    { id: 'E006', nombre: 'Sofía', apellido: 'González', dni: '39876543', rol: '', asignado: false },
    { id: 'E007', nombre: 'Lucas', apellido: 'Sánchez', dni: '31234567', rol: '', asignado: false },
    { id: 'E008', nombre: 'Mariana', apellido: 'Rodríguez', dni: '35678901', rol: '', asignado: false },
    { id: 'E009', nombre: 'Agustina', apellido: 'López', dni: '37890213', rol: '', asignado: false },
    { id: 'E010', nombre: 'Florencia', apellido: 'García', dni: '34987654', rol: '', asignado: false },
    { id: 'E011', nombre: 'Tomás', apellido: 'Díaz', dni: '32098765', rol: '', asignado: false },
    { id: 'E012', nombre: 'Amanda', apellido: 'Martinez', dni: '36475329', rol: '', asignado: false },
    { id: 'E013', nombre: 'Gabriela', apellido: 'Ruiz', dni: '38456921', rol: '', asignado: false },
    { id: 'E014', nombre: 'Matías', apellido: 'Sánchez', dni: '30654321', rol: '', asignado: false },
    { id: 'E015', nombre: 'Julieta', apellido: 'González', dni: '39685214', rol: '', asignado: false },
    { id: 'E016', nombre: 'Lautaro', apellido: 'Rodríguez', dni: '31765432', rol: '', asignado: false },
    { id: 'E017', nombre: 'Benjamín', apellido: 'López', dni: '39456789', rol: '', asignado: false },
    { id: 'E018', nombre: 'Cecilia', apellido: 'García', dni: '32198765', rol: '', asignado: false },
    { id: 'E019', nombre: 'Santiago', apellido: 'Díaz', dni: '38690213', rol: '', asignado: false },
    { id: 'E020', nombre: 'Luciana', apellido: 'Martinez', dni: '35345678', rol: '', asignado: false },
    { id: 'E021', nombre: 'Paula', apellido: 'Ruiz', dni: '31987654', rol: '', asignado: false },
    { id: 'E022', nombre: 'Gonzalo', apellido: 'Sánchez', dni: '30765432', rol: '', asignado: false },
    { id: 'E023', nombre: 'María', apellido: 'González', dni: '39876543', rol: '', asignado: false },
    { id: 'E024', nombre: 'Marcela', apellido: 'Rodríguez', dni: '31234567', rol: '', asignado: false },
    { id: 'E025', nombre: 'Nicolás', apellido: 'López', dni: '35678901', rol: '', asignado: false },
    { id: 'E026', nombre: 'Alejandra', apellido: 'García', dni: '37890213', rol: '', asignado: false },
    { id: 'E027', nombre: 'Facundo', apellido: 'Díaz', dni: '34987654', rol: '', asignado: false },
    { id: 'E028', nombre: 'Daniela', apellido: 'Martinez', dni: '32098765', rol: '', asignado: false },
    { id: 'E029', nombre: 'Emiliano', apellido: 'Ruiz', dni: '31234567', rol: '', asignado: false },
    { id: 'E030', nombre: 'Valeria', apellido: 'Sánchez', dni: '36475329', rol: '', asignado: false }
  ];

  public getEmpleados(): Empleado[] {
    return [...this.empleados];
  }

  public getEmpleadosById(id: string): Empleado | undefined {
    return this.empleados.find(e => e.id === id);
  }

  // Vuelos
  private initializeVuelos(): void {
    const fechaActual = this.getHoyFormateado();

    this.vuelos = [
      {
        id: '1',
        vuelo: 'AP1234',
        avion: this.getAvionById('AV001')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: fechaActual,
        fechaArribo: fechaActual,
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E001')!, this.getEmpleadosById('E002')!],
        pasajeros: []
      },
      {
        id: '2',
        vuelo: 'AP1235',
        avion: this.getAvionById('AV002')!,
        origen: this.getAeropuertoByCodigo('AEP')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: fechaActual,
        fechaArribo: fechaActual,
        estado: 'En vuelo',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E003')!, this.getEmpleadosById('E004')!, this.getEmpleadosById('E005')!],
        pasajeros: []
      },
      {
        id: '3',
        vuelo: 'AP1236',
        avion: this.getAvionById('AV003')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: fechaActual,
        fechaArribo: fechaActual,
        estado: 'Finalizado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E006')!, this.getEmpleadosById('E007')!, this.getEmpleadosById('E008')!],
        pasajeros: []
      },
      {
        id: '4',
        vuelo: 'AP1237',
        avion: this.getAvionById('AV004')!,
        origen: this.getAeropuertoByCodigo('MDZ')!,
        destino: this.getAeropuertoByCodigo('BRC')!,
        fechaPartida: fechaActual,
        fechaArribo: fechaActual,
        estado: 'Reprogramado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E009')!, this.getEmpleadosById('E010')!, this.getEmpleadosById('E011')!],
        pasajeros: []
      },
      {
        id: '5',
        vuelo: 'AP1238',
        avion: this.getAvionById('AV005')!,
        origen: this.getAeropuertoByCodigo('AEP')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: fechaActual,
        fechaArribo: fechaActual,
        estado: 'Cancelado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E012')!, this.getEmpleadosById('E013')!, this.getEmpleadosById('E014')!],
        pasajeros: []
      },
      {
        id: '6',
        vuelo: 'AP1239',
        avion: this.getAvionById('AV006')!,
        origen: this.getAeropuertoByCodigo('COR')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: '30/05/2025',
        fechaArribo: '30/05/2025',
        estado: 'En vuelo',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E015')!, this.getEmpleadosById('E016')!, this.getEmpleadosById('E017')!],
        pasajeros: []
      },
      {
        id: '7',
        vuelo: 'AP1240',
        avion: this.getAvionById('AV007')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('BRC')!,
        fechaPartida: '31/05/2025',
        fechaArribo: '31/05/2025',
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E018')!, this.getEmpleadosById('E019')!, this.getEmpleadosById('E020')!],
        pasajeros: []
      },
      {
        id: '8',
        vuelo: 'AP1241',
        avion: this.getAvionById('AV008')!,
        origen: this.getAeropuertoByCodigo('MDZ')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: '01/06/2025',
        fechaArribo: '01/06/2025',
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E021')!, this.getEmpleadosById('E022')!, this.getEmpleadosById('E023')!],
        pasajeros: []
      },
      {
        id: '9',
        vuelo: 'AP1242',
        avion: this.getAvionById('AV009')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('FTE')!,
        fechaPartida: '02/06/2025',
        fechaArribo: '02/06/2025',
        estado: 'En vuelo',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E024')!, this.getEmpleadosById('E025')!, this.getEmpleadosById('E026')!],
        pasajeros: []
      },
      {
        id: '10',
        vuelo: 'AP1243',
        avion: this.getAvionById('AV010')!,
        origen: this.getAeropuertoByCodigo('PSS')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: '03/06/2025',
        fechaArribo: '03/06/2025',
        estado: 'Cancelado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E027')!, this.getEmpleadosById('E028')!, this.getEmpleadosById('E029')!],
        pasajeros: []
      },
      {
        id: '11',
        vuelo: 'AP1244',
        avion: this.getAvionById('AV001')!,
        origen: this.getAeropuertoByCodigo('NQN')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: '04/06/2025',
        fechaArribo: '04/06/2025',
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E030')!, this.getEmpleadosById('E031')!, this.getEmpleadosById('E032')!],
        pasajeros: [] 
      },
      {
        id: '12',
        vuelo: 'AP1245',
        avion: this.getAvionById('AV002')!,
        origen: this.getAeropuertoByCodigo('AFA')!,
        destino: this.getAeropuertoByCodigo('MDZ')!,
        fechaPartida: '05/06/2025',
        fechaArribo: '05/06/2025',
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E033')!, this.getEmpleadosById('E034')!, this.getEmpleadosById('E035')!],
        pasajeros: []
      },
      {
        id: '13',
        vuelo: 'AP1246',
        avion: this.getAvionById('AV003')!,
        origen: this.getAeropuertoByCodigo('RGL')!,
        destino: this.getAeropuertoByCodigo('EZE')!,
        fechaPartida: '06/06/2025',
        fechaArribo: '06/06/2025',
        estado: 'Reprogramado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E036')!, this.getEmpleadosById('E037')!, this.getEmpleadosById('E038')!],
        pasajeros: [] 
      },
      {
        id: '14',
        vuelo: 'AP1247',
        avion: this.getAvionById('AV004')!,
        origen: this.getAeropuertoByCodigo('EZE')!,
        destino: this.getAeropuertoByCodigo('USH')!,
        fechaPartida: '07/06/2025',
        fechaArribo: '07/06/2025',
        estado: 'Programado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E039')!, this.getEmpleadosById('E040')!, this.getEmpleadosById('E041')!],
        pasajeros: []
      },
      {
        id: '15',
        vuelo: 'AP1248',
        avion: this.getAvionById('AV005')!,
        origen: this.getAeropuertoByCodigo('ROS')!,
        destino: this.getAeropuertoByCodigo('AEP')!,
        fechaPartida: '08/06/2025',
        fechaArribo: '08/06/2025',
        estado: 'Reprogramado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E042')!, this.getEmpleadosById('E043')!, this.getEmpleadosById('E044')!],
        pasajeros: []
      },
      {
        id: '16',
        vuelo: 'AP1249',
        avion: this.getAvionById('AV006')!,
        origen: this.getAeropuertoByCodigo('BRC')!,
        destino: this.getAeropuertoByCodigo('MDZ')!,
        fechaPartida: '09/06/2025',
        fechaArribo: '09/06/2025',
        estado: 'Reprogramado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E045')!, this.getEmpleadosById('E046')!, this.getEmpleadosById('E047')!],
        pasajeros: []
      },
      {
        id: '17',
        vuelo: 'AP1250',
        avion: this.getAvionById('AV007')!,
        origen: this.getAeropuertoByCodigo('FTE')!,
        destino: this.getAeropuertoByCodigo('COR')!,
        fechaPartida: '10/06/2025',
        fechaArribo: '10/06/2025',
        estado: 'Reprogramado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E048')!, this.getEmpleadosById('E049')!, this.getEmpleadosById('E050')!],
        pasajeros: []
      },
      {
        id: '18',
        vuelo: 'AP1251',
        avion: this.getAvionById('AV008')!,
        origen: this.getAeropuertoByCodigo('USH')!,
        destino: this.getAeropuertoByCodigo('RGL')!,
        fechaPartida: '11/06/2025',
        fechaArribo: '11/06/2025',
        estado: 'Cancelado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E051')!, this.getEmpleadosById('E052')!, this.getEmpleadosById('E053')!],
        pasajeros: []
      },
      {
        id: '19',
        vuelo: 'AP1252',
        avion: this.getAvionById('AV009')!,
        origen: this.getAeropuertoByCodigo('PSS')!,
        destino: this.getAeropuertoByCodigo('ROS')!,
        fechaPartida: '12/06/2025',
        fechaArribo: '12/06/2025',
        estado: 'Cancelado',
        eliminado: false,
        tripulantes: [this.getEmpleadosById('E054')!, this.getEmpleadosById('E055')!, this.getEmpleadosById('E056')!],
        pasajeros: []
      }
    ];
  }

  getVuelos(): Vuelo[] {
    // return [...this.vuelos];
    return this.vuelos.filter(vuelo => !vuelo.eliminado); // se filtra solo los qu eno estan eliminados
  }

  getVueloById(id: string): Vuelo | undefined {
    return this.vuelos.find(vuelo => vuelo.id === id);
  }

  private rolesTripulante: RolTripulante[] = [
    {id: '1', nombre: 'Piloto'},
    {id: '2', nombre: 'Copiloto'},
    {id: '3', nombre: 'Tripulante'},
    {id: '4', nombre: 'Jefe de Cabina'},
    {id: '5', nombre: 'Azafata'},
    {id: '6', nombre: 'Auxiliar de Vuelo'},
    {id: '7', nombre: 'Ingeniero de Vuelo'}
  ];

  getRolesTripulante(): RolTripulante[] {
    return [...this.rolesTripulante];
  }
 
  private estadosVuelo: EstadoVuelo[] = [
    {id: '1', nombre: 'Cancelado'},
    {id: '2', nombre: 'Cerrado'},
    {id: '3', nombre: 'Demorado'},
    {id: '4', nombre: 'Embarcando'},
    {id: '5', nombre: 'En vuelo'},
    {id: '6', nombre: 'Finalizado'},
    {id: '7', nombre: 'Programado'},
    {id: '9', nombre: 'Reprogramado'}
  ];

  public getEstadosVuelo(): EstadoVuelo[] {
    return [...this.estadosVuelo];
  }


  // metodo para obtener la fecha de hoy formateada
  public getHoyFormateado(): string {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  // metodo para marcar vuelos como eliminado 
  public marcarVueloComoEliminado(id: string): { exito: boolean, mensaje: string } {
    const vuelo = this.vuelos.find(v => v.id === id);
    
    if (!vuelo) {
      return { exito: false, mensaje: 'Vuelo no encontrado.' };
    }
  
    if (vuelo.estado === 'En vuelo') {
      return { exito: false, mensaje: 'Este vuelo está en progreso y no puede ser eliminado.' };
    }
  
    vuelo.eliminado = true;
    return { exito: true, mensaje: 'Vuelo eliminado correctamente.' };
  }  
}