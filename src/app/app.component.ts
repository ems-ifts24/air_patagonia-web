import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent,LoginComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'air_patagonia-web';
}