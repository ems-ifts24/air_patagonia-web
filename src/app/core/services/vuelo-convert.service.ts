import { Injectable } from '@angular/core';
import { IVuelo, IVueloDTO } from '../models/vuelo.model';

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

}
