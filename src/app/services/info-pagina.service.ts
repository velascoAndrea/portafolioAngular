import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
info: InfoPagina = {};
cargada = false;

    constructor(private http: HttpClient) {
   // console.log('Servicio de info pagina listo');
  // Leer el achivp json necesito el modulo http
    this.http.get('assets/data/data-pagina.json') // obtiene la informacion de esta direccion
    .subscribe( (resp: InfoPagina) => { // el subscribe obtiene la respuesta
      this.cargada = true;
      this.info = resp;
      console.log(resp); // muestra la respuesta
    });
  }

}
