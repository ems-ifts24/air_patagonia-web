import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VueloServiceService } from '../core/services/vuelo-service.service';
// Importo el servicio de vuelos para obtener el array de vuelos

@Component({
  selector: 'app-vuelos-vista-general',
  imports: [],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrls: ['./vuelos-vista-general.component.css']
})
export class VuelosVistaGeneralComponent implements OnInit {
  vuelos: any[] = [];

  constructor(
    private router: Router,
    private vueloService: VueloServiceService
  ) {}

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    // Obtener los vuelos del servicio
    this.vuelos = this.vueloService.getVuelos();
  }

  crearVuelo() {
    this.router.navigate(['app/vuelos-gestion']);
  }

  editarVuelo(idVuelo: string) {
    alert("Editar vuelo: " + idVuelo);
  }

  eliminarVuelo(idVuelo: string) {
    alert("Eliminar vuelo: " + idVuelo);
  }
}
