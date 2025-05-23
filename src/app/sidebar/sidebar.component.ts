import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMobile = false;
  isOpen = true;
  activeItem = 'dashboard';
  navItems: any[] = [];
  loading = true;
  error: string | null = null;
  userRole: string = 'admin';

  // Default items in case the API fails
  private defaultNavItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { id: 'flights', icon: 'flight', label: 'Vuelos', route: '/flights' },
    { id: 'hotels', icon: 'hotel', label: 'Hoteles', route: '/hotels' },
    { id: 'packages', icon: 'beach_access', label: 'Paquetes', route: '/packages' },
    { id: 'billing', icon: 'account_balance', label: 'Facturación', route: '/billing' },
    { id: 'reports', icon: 'bar_chart', label: 'Reportes', route: '/reports' },
    { id: 'settings', icon: 'settings', label: 'Configuración', route: '/settings' },
  ];

  constructor(private http: HttpClient) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.loadNavItems();
  }

  loadNavItems() {
    this.loading = true;
    this.error = null;
    
    // Reemplaza 'admin' por una variable que se tome despues de que el usuario haga login
    this.http.get<any[]>(`http://localhost:3003/airpatagonia-rest/nav-items?userRole=${this.userRole}`)
      .pipe(
        catchError(error => {
          console.error('Error loading navigation items:', error);
          this.error = 'Error al cargar el menú';
          // Devuelve items por defecto si la API falla -- Revisar/acotar esta lista
          return of(this.defaultNavItems);
        })
      )
      .subscribe({
        next: (items) => {
          this.navItems = items || this.defaultNavItems;
          this.loading = false;
        },
        error: () => {
          this.navItems = this.defaultNavItems;
          this.loading = false;
        }
      });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }


  toggleSidebar() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    }
  }

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  
}
