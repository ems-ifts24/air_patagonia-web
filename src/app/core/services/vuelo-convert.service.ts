import { Injectable } from '@angular/core';
import { IVuelo, IVueloDTO } from '../models/vuelo.model';
import { IAsignacion, ITripulanteDTO } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class VueloConvertService {

  constructor() { }

  convertirVueloAVueloDTO(vuelo: IVuelo): IVueloDTO {
    const vueloDTO: IVueloDTO = {
      idVuelo: vuelo.idVuelo,
      aliasVuelo: vuelo.aliasVuelo,
      estado: vuelo.estado.nombre,
      idAvion: vuelo.avion.idAvion,
      idAeropuertoPartida: vuelo.aeropuertoPartida.idAeropuerto,
      idAeropuertoArribo: vuelo.aeropuertoArribo.idAeropuerto,
      fechaPartida: vuelo.fechaPartida,
      fechaArribo: vuelo.fechaArribo,
    };
    return vueloDTO;
  }

  convertirTripulanteDTOAAignacion(tripulante: ITripulanteDTO): IAsignacion {
    // El ! es para decirle a TypeScript que confie en que el valor no sea undefined
    const asignacion: IAsignacion = {
      vuelo: { idVuelo: tripulante.idVueloAsignado! },
      empleado: { idEmpleado: tripulante.idEmpleado! },
      puesto: { idPuestoTripulante: tripulante.puestoTripulante!.idPuestoTripulante! }
    };
    return asignacion;
  }

}
