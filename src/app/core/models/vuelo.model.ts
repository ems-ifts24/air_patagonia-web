export interface IVuelo {
    idVuelo:          string;
    aliasVuelo:        string;
    estado:            IVueloEstado;
    fechaPartida:      Date;
    fechaArribo:       Date;
    avion:             IAvion;
    aeropuertoPartida: IAeropuerto;
    aeropuertoArribo:  IAeropuerto;
    tripulantes?:      any[];
    pasajeros?:        any[];
}

export interface IAeropuerto {
    idAeropuerto:    string;
    codigoIATA:       string;
    ciudad:           string;
    nombreAeropuerto: string;
    nombreCorto:      string;
    pais:             string;
    estadoAeropuerto: string;
}

export interface IAvion {
    idAvion:               string;
    fabricante:             string;
    modelo:                 string;
    capacidadTurista?:      number;
    capacidadBusiness?:     number;
    capacidadPrimeraClase?: number;
    autonomia:              number;
    matricula:              string;
    estadoAvion:            string;
}

export interface IVueloEstado {
    descripcion: string;
    nombre:      string;
}

export interface IVueloDTO {
    idVuelo?:            string;
    aliasVuelo:          string;
    estado:              string;
    fechaPartida:        Date;
    fechaArribo:         Date;
    idAvion:             string;
    idAeropuertoPartida: string;
    idAeropuertoArribo:  string;
}