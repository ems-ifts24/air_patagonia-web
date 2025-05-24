import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
=======
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  imports: [LoginComponent,DashboardComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'air_patagonia-web';
}
