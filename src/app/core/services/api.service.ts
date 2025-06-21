import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAeropuerto, IAvion, IVuelo, IVueloDTO, IVueloEstado } from "../models/vuelo.model";
import { IEmpleado, IPuestoTripulante, IAsignacion } from "../models/empleado.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private urlBackend: string = 'https://air-patagonia-backend.onrender.com/api-v1';
    private pathVuelos: string = '/vuelos';
    private pathTripulantesParaVuelo: string = '/tripulacion-vuelo';
    private pathPuestoTripulante: string = '/tripulacion-vuelo/puestos';
    private pathEstadosVuelo: string = '/vuelos/estados';
    private pathAeropuertos: string = '/aeropuertos';
    private pathAviones: string = '/aviones';
    private pathVuelosDTO: string = '/vuelos/dtos';

    private _httpClient: HttpClient = inject(HttpClient);

    constructor() { }

    public getVuelos(): Observable<IVuelo[]> {
        return this._httpClient.get<IVuelo[]>(this.urlBackend + this.pathVuelos);
    }

    public getVueloById(id: string): Observable<IVuelo> {
        return this._httpClient.get<IVuelo>(`${this.urlBackend + this.pathVuelos}/${id}`);
    }

    public getVuelosDTOById(id: string): Observable<IVueloDTO[]> {
        return this._httpClient.get<IVueloDTO[]>(`${this.urlBackend + this.pathVuelosDTO}/${id}`);
    }
    public deleteVuelo(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this.urlBackend + this.pathVuelos}/${id}`);
    }

    public createVueloDTO(vueloDTO: IVueloDTO): Observable<IVuelo> {
        return this._httpClient.post<IVuelo>(this.urlBackend + this.pathVuelos, vueloDTO);
    }

    // idVuelo para saber a que Vuelo se va a actualizar y vueloDTO para pasarle los id de las propiedades a actualizar
    public updateVuelo(idVuelo: string, vueloDTO: IVueloDTO): Observable<IVuelo> {
        return this._httpClient.put<IVuelo>(`${this.urlBackend + this.pathVuelos}/${idVuelo}`, vueloDTO);
    }

    // TODO revisar si pasar IVuelo o solo el id de tripulante
    public asignarTripulanteVuelo(idVuelo: string, tripulante: IAsignacion): Observable<void> {
        return this._httpClient.post<void>(`${this.urlBackend + this.pathTripulantesParaVuelo}/${idVuelo}`, tripulante);
    }

    public actualizarTripulanteVuelo(idVuelo: string, idTripulante: string, tripulante: IAsignacion): Observable<void> {
        return this._httpClient.put<void>(`${this.urlBackend + this.pathTripulantesParaVuelo}/${idVuelo}/${idTripulante}`, tripulante);
    }

    // TODO revisar si pasar IVuelo o solo el id de tripulante
    public quitarTripulanteVuelo(idVuelo: string, idTripulante: string): Observable<void> {
        return this._httpClient.delete<void>(`${this.urlBackend + this.pathTripulantesParaVuelo}/${idVuelo}/${idTripulante}`);
    }
    
    // Trae todos los empleados disponibles y si idVuelo no es nulo, también trae los asignados a ese vuelo
    public getTripulantesParaVuelo(idVuelo?: string): Observable<IEmpleado[]> {
        return this._httpClient.get<IEmpleado[]>(`${this.urlBackend + this.pathTripulantesParaVuelo}/${idVuelo ? '?idVuelo=' + idVuelo : ''}`);
    }

    public getPuestosTripulante(): Observable<IPuestoTripulante[]> {
        return this._httpClient.get<IPuestoTripulante[]>(this.urlBackend + this.pathPuestoTripulante);
    }

    public getEstadosVuelo(): Observable<IVueloEstado[]> {
        return this._httpClient.get<IVueloEstado[]>(this.urlBackend + this.pathEstadosVuelo);
    }

    public getAeropuertos(): Observable<IAeropuerto[]> {
        return this._httpClient.get<IAeropuerto[]>(this.urlBackend + this.pathAeropuertos);
    }

    public getAviones(): Observable<IAvion[]> {
        return this._httpClient.get<IAvion[]>(this.urlBackend + this.pathAviones);
    }
}
