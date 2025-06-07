import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleHeaderService } from '../core/services/title-header.service';
import { Subscription } from 'rxjs';//Controla la suscripcion a un observable


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
  constructor(private router: Router,private titleService: TitleHeaderService) {} 
   // constructor para redirigir a otra ruta y para utilizar el servicio que cambia el titulo

  
  pageTitle = 'Dashboard';
  private sub!: Subscription; //Variable de tipo Subscription (a un observable)
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
   ngOnInit() {
    // Nos suscribimos al observable 'pageTitle$' del servicio TitleHeaderService
  // Cada vez que el título cambie en el servicio, se ejecutará esta función
    this.sub = this.titleService.pageTitle$.subscribe(title => {
      // Nos suscribimos al observable 'pageTitle$' del servicio TitleHeaderService
  // Cada vez que el título cambie en el servicio, se ejecutará esta función
      this.pageTitle = title;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();//Elmina la sucripcion cuando el componente se destruye
  }


  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
