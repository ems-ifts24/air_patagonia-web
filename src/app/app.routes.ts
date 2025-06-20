import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VuelosVistaGeneralComponent } from './vuelos-vista-general/vuelos-vista-general.component';
import { PasajerosGestionComponent } from './pasajeros-gestion/pasajeros-gestion.component';
import { VuelosListadoComponent } from './vuelos-listado/vuelos-listado.component';
import { LayoutComponent } from './layout/layout.component';
import { VuelosGestionComponent } from './vuelos-gestion/vuelos-gestion.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },    // Ruta por defecto :: Login
    {
        path: 'app',
        component: LayoutComponent, // Componente principal que contendra sidebar, header y el router-outlet (dashboard, vuelos, etc)
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },    // esta regla asegura que la ruta 'app' sola envie a Dashboard.
            // El valor por defecto de pathMatch es 'prefix' y al tener el path vacío ('') enviaría todo lo que sea 'app/*' a Dashboard con la URL 'app/dashboard'
            // Eso entra en conflicto con las reglas de abajo. Por eso se coloca explicitamente pathMatch: 'full'
            { path: 'dashboard', component: DashboardComponent },
            { path: 'vuelos', component: VuelosVistaGeneralComponent },
            { path: 'vuelos-gestion', component: VuelosGestionComponent},       // ruta para crear
            { path: 'vuelos-gestion/:id', component: VuelosGestionComponent},   // ruta para editar
            { path: 'empleados', component: DashboardComponent },   // Hasta que se realice este componente, se usara el DashboardComponent
            { path: 'pasajeros', component: PasajerosGestionComponent },   // Hasta que se realice este componente, se usara el DashboardComponent
            { path: 'reportes', component: VuelosListadoComponent },
            { path: 'configuracion', component: DashboardComponent }   // Hasta que se realice el componente de configuracion, se usara el DashboardComponent
        ]
    },
    { path: '**', redirectTo: '' }  // Cualquier ruta desconocida redirige al login
];
