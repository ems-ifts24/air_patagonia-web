
import { Injectable } from '@angular/core';

export interface Pasajero {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email?: string;
  telefono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  private pasajeros: Pasajero[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', dni: '12345678', email: 'juan@example.com', telefono: '123456789' },
    { id: 2, nombre: 'María', apellido: 'Gómez', dni: '87654321' },
  ];

  getPasajeros(): Pasajero[] {
    return [...this.pasajeros]; 
  }

  

  
  eliminarPasajero(id: number): void {
  this.pasajeros = this.pasajeros.filter(p => p.id !== id);
  }

  editarPasajero(pasajero: Pasajero): void {
  const index = this.pasajeros.findIndex(p => p.id === pasajero.id);
  if (index !== -1) {
    this.pasajeros[index] = { ...pasajero };
  }
  }

  agregarPasajero(nuevoPasajero: Pasajero): void {
    // Asignar un ID nuevo automático (max actual + 1)
    const maxId = this.pasajeros.length > 0 ? Math.max(...this.pasajeros.map(p => p.id)) : 0;
    nuevoPasajero.id = maxId + 1;
    this.pasajeros.push(nuevoPasajero);
  }

}

