import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VuelosListadoComponent } from './vuelos-listado/vuelos-listado.component';
import { VuelosVistaGeneralComponent } from "./vuelos-vista-general/vuelos-vista-general.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, LoginComponent, HeaderComponent, DashboardComponent, VuelosListadoComponent, VuelosVistaGeneralComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air_patagonia-web';
}