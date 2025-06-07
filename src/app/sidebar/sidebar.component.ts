import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { TitleHeaderService } from '../core/services/title-header.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isMobile: boolean = false;
  isOpen: boolean = true;
  activeItem = 'dashboard';
  navItems: any[] = [];
  error: string | null = null;
  userRole: string = 'admin';

  defaultNavItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { id: 'vuelos', icon: 'flight_takeoff', label: 'Vuelos', route: 'vuelos' },
    { id: 'empleados', icon: 'groups_2', label: 'Empleados', route: 'empleados' },
    { id: 'pasajeros', icon: 'airline_seat_recline_extra', label: 'Pasajeros', route: 'pasajeros' },
    { id: 'reportes', icon: 'description', label: 'Reportes', route: 'reportes' },
    { id: 'configuracion', icon: 'settings', label: 'Configuración', route: 'configuracion' }
  ];

  constructor(private http: HttpClient,private titleService: TitleHeaderService) {}

  // @HostListener: decorador de Angular que escucha eventos del DOM (en este caso: el evento resize de la ventana)
  // ['$event'] indica que el objeto del evento se pasa como parámetro al método.
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    // this.loadNavItems();
    this.navItems = this.defaultNavItems;
  }

  loadNavItems() {
    this.error = null;
    
    // this.http.get<any[]>(`http://192.168.0.23:3003/airpatagonia-rest/nav-items?userRole=${this.userRole}`)
    this.http.get<any[]>(`http://localhost:3003/airpatagonia-rest/nav-items?userRole=${this.userRole}`)
      .pipe(
        catchError(error => {
          console.error('Error loading navigation items:', error);
          this.error = 'Error al cargar el menú. Por favor, intente nuevamente.';
          return of([]);
        })
      )
      .subscribe({
        next: (items) => {
          this.navItems = items;
        },
        error: () => {
          this.navItems = [];
        }
      });
  }

  // Método que verifica el ancho de la pantalla para mostrar el menú
  // Si la pantalla es menor a 768px, el menú se muestra en forma vertical
  // Si la pantalla es mayor a 768px, el menú se muestra en forma horizontal
  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  // Solo para mobile. Método que toma el valor de isOpen
  // y lo invierte para mostrar/ocultar el menú
  toggleSidebar() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    }
  }

  // Método que toma el valor de activeItem y lo establece como el valor de itemId
  // para resaltar el item seleccionado
  setActiveItem(itemId: string,label: string) {
    this.activeItem = itemId;
    this.titleService.setTitle(label); // llama al metodo que cambia el titulo Cambiá el título
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  
}
