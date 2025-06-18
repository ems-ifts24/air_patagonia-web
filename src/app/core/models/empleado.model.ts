export interface IEmpleado {
    idEmpleado:      string;
    nombre:          string;
    apellido:        string;
    email:           string;
    tipoDocumento:   string;
    nroDocumento:    string;
    ciudad:          ICiudad;
    direccion:       string;
    telefono:        string;
    fechaNacimiento: Date;
    estadoEmpleado:  IEstadoEmpleado;
    legajo:          string;
}

export interface ICiudad {
    idCiudad: string;
    nombre:   string;
    pais:     IPais;
}

export interface IPais {
    idPais: string;
    nombre: string;
}

export interface IEstadoEmpleado {
    descripcion: string;
    nombre:      string;
}

export interface ITripulanteDTO {
    idEmpleado:       string;
    nombre:           string;
    apellido:         string;
    nroDocumento:     string;
    puestoTripulante?: IPuestoTripulante;
    idVueloAsignado?:  string;
}

export interface IPuestoTripulante {
    idPuestoTripulante: string;
    puesto:             string;
    descripcion:        string;
}


// Para asignar o quitar tripulantes
export interface IAsignacion {
    vuelo:    IVueloTrip;
    empleado: IEmpleadoTrip;
    puesto:   IPuestoTripulanteTrip;
}

export interface IEmpleadoTrip {
    idEmpleado: string;
}

export interface IPuestoTripulanteTrip {
    idPuestoTripulante: string;
}

export interface IVueloTrip {
    idVuelo: string;
}
