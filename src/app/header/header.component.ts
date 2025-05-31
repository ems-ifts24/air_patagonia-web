import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface UserInfo {
  name: string;
  email: string;
  lastLogin: Date | string;
  avatar?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}  // constructor para redirigir a otra ruta

  @Input() pageTitle: string = 'Dashboard';
  @Input() userInfo: UserInfo = {
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    lastLogin: new Date()
  };

  isMenuOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
