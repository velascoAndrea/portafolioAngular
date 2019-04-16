import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
info: InfoPagina = {};
cargada = false;

equipo: any[] = [];


    constructor(private http: HttpClient) {
   // console.log('Servicio de info pagina listo');
  // Leer el achivp json necesito el modulo http
  this.cargarInfo();
  this.cargarEquipo();
  }

private cargarInfo() {
  this.http.get('assets/data/data-pagina.json') // obtiene la informacion de esta direccion
    .subscribe( (resp: InfoPagina) => { // el subscribe obtiene la respuesta
      this.cargada = true;
      this.info = resp;
      // console.log(resp); // muestra la respuesta
    });
}

private cargarEquipo() {
this.http.get('https://angular-html-b2ef4.firebaseio.com/equipo.json')
.subscribe( (resp: any) => {
  this.equipo = resp;
  console.log(resp);
});
}

}
