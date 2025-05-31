import { Component } from '@angular/core';
import { Router } from '@angular/router'; // import para redirigir a otra ruta


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}  // constructor para redirigir a otra ruta
 
  login() {
    const usuario = document.getElementById('inputUsuario') as HTMLInputElement;
    const password = document.getElementById('inputPassword') as HTMLInputElement;
    if (usuario.value === 'admin' && password.value === 'admin') {
      this.router.navigate(['/app/dashboard']); // redirige a la ruta dashboard
    }else{
      alert('Usuario o contraseña incorrectos');
    }
  }
}
