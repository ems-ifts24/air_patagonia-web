import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-vuelos-listado',
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './vuelos-listado.component.html',
  styleUrl: './vuelos-listado.component.css'
})
export class VuelosListadoComponent {

}
