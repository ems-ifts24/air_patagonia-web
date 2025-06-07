import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';//importa una clase llamada BehaviorSubject desde la librería RxJS
//Angular usa internamente para manejar programación reactiva

@Injectable({
  providedIn: 'root'//Disponible en toda la app
})
export class TitleHeaderService {

  private titleSubject = new BehaviorSubject<string>('Dashboard');//guarda el string y lo emite a quien este suscrito
  public pageTitle$ = this.titleSubject.asObservable();//observable publico para que lo puedan leer pero no modificar

  //Metodo que recibe el valor del nuevo titulo para modificar el actual y notificar a quien este suscrito a pageTitle
  setTitle(newTitle: string) {  
    this.titleSubject.next(newTitle);
  }
}
