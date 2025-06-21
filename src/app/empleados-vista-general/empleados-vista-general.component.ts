import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VueloServiceService, Empleado } from '../core/services/vuelo-service.service';
import { FormsModule } from '@angular/forms';
// Importo el servicio de vuelos para obtener el array de vuelos
// Importo la interface Vuelo para tipar el array de vuelos

@Component({
  selector: 'app-empleados-vista-general',
  imports: [FormsModule],
  templateUrl: './empleados-vista-general.component.html',
  styleUrls: ['./empleados-vista-general.component.css']
})
export class EmpleadosVistaGeneralComponent implements OnInit {
  //////////////
  todosLosEmpleados: Empleado[] = [];
  Empleados: Empleado[] = [];
  //////////////
  inputBusqueda: string = '';

  constructor(
    private router: Router,
    private vueloService: VueloServiceService
  ) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    //////////////
    // Obtener los Empleados del servicio
    this.todosLosEmpleados = this.vueloService.getEmpleados();
    this.Empleados = [...this.todosLosEmpleados];
    //////////////
  }

  esEditable(estado: string): boolean {
    return estado !== 'Despedido' && estado !== 'En vuelo'
  }

  /////////////////////
  crearEmpleado() {
    this.router.navigate(['app/empleados-gestion']);
  }

  editarEmpleado(idEmpleado: string) {
    this.router.navigate(['app/empleados-gestion', idEmpleado]);
  }

  eliminarEmpleado(idEmpleado: string): void {
    if (!confirm('¿Esta seguro de que desea eliminar a este Empleado?')) {
      return;
    }

    const resultado = this.marcarEmpleadoComoEliminado(idEmpleado);

    alert(resultado.mensaje);

    if (resultado.exito) {
      this.Empleados = this.Empleados;
    }
  }
  /////////////////////

  filtrarEmpleados() {
    if (this.inputBusqueda && this.inputBusqueda.trim() !== '') {
      const busqueda = this.inputBusqueda.toLowerCase().trim();
      this.Empleados = this.Empleados.filter(Empleado =>
        Empleado.id.toLowerCase().includes(busqueda)
        || Empleado.nombre.toLowerCase().includes(busqueda)
        || Empleado.apellido.toLowerCase().includes(busqueda)
        || Empleado.dni.toLowerCase().includes(busqueda)
        || Empleado.rol.toLowerCase().includes(busqueda)
        || String(Empleado.asignado).toLowerCase().includes(busqueda)
        || Empleado.estado.toLowerCase().includes(busqueda)
      );
    }
    else {
      this.Empleados = [...this.todosLosEmpleados];
    }
  }
  
  limpiarBusqueda() {
    document.getElementById('inputBusqueda')?.focus();
    // uso HTMLInputElement para tipar el elemento, para que no marque error
    // de esta forma le dice a typeScript confiá que el elemento es un input y tiene la propiedad value
    (document.getElementById('inputBusqueda') as HTMLInputElement).value = '';
    this.inputBusqueda = '';
    this.filtrarEmpleados();
  }

   //////////////////
  // metodo para marcar vuelos como eliminado 
  public marcarEmpleadoComoEliminado(id: string): { exito: boolean, mensaje: string } {
    const Empleado = this.Empleados.find(v => v.id === id);
    
    if (!Empleado) {
      return { exito: false, mensaje: 'Empleado no encontrado.' };
    }
  
    if (Empleado.estado === 'bien') {
      return { exito: false, mensaje: 'Este Empleado no está despedido y no puede ser eliminado.' };
    }
  
    Empleado.eliminado = true;
    return { exito: true, mensaje: 'Empleado eliminado correctamente.' };
  } 
  //////////////////

}
