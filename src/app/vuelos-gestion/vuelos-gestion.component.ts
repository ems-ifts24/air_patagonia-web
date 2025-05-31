import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vuelos-gestion',
  imports: [],
  templateUrl: './vuelos-gestion.component.html',
  styleUrl: './vuelos-gestion.component.css'
})
export class VuelosGestionComponent {
  constructor(private router: Router) { }

titleCreacion = 'CREACION';
titleModificacion='MODIFICACION';

cancelarModificacion(){
    this.router.navigate(['app/vuelos']);
}
}
