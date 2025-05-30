import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
@Component({
  selector: 'app-vuelos-vista-general',
  imports: [HeaderComponent,SidebarComponent],
  templateUrl: './vuelos-vista-general.component.html',
  styleUrl: './vuelos-vista-general.component.css'
})
export class VuelosVistaGeneralComponent {

}
