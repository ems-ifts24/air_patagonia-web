import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IVuelo } from "../models/vuelo.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private urlBackend: string = 'http://localhost:8080/api-v1';
    private pathVuelos: string = '/vuelos';

    private _httpClient: HttpClient = inject(HttpClient);

    constructor() { }

    public getVuelos(): Observable<IVuelo[]> {
        return this._httpClient.get<IVuelo[]>(this.urlBackend + this.pathVuelos);
    }

    public getVueloById(id: string): Observable<IVuelo> {
        return this._httpClient.get<IVuelo>(`${this.urlBackend + this.pathVuelos}/${id}`);
    }

    public deleteVuelo(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this.urlBackend + this.pathVuelos}/${id}`);
    }
}
