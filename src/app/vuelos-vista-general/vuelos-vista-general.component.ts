import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vuelos-vista-general',
  imports: [],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrl: './vuelos-vista-general.component.css'
})
export class VuelosVistaGeneralComponent {
  constructor(private router: Router) { }

  crearVuelo(){
    this.router.navigate(['app/vuelos-gestion']);
  }

  editarVuelo(idVuelo: string){
    alert("Editar vuelo: " + idVuelo);
  }

  eliminarVuelo(idVuelo: string){
    alert("Eliminar vuelo: " + idVuelo);
  }
}
