import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargado = true;
  productos: ProductoInterface[] = [];
    constructor(private http: HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos() {
    this.http.get('https://angular-html-b2ef4.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductoInterface[] ) => {
      console.log(resp);
      this.productos = resp;
      this.cargado = false;
      // setTimeout(() => {

      // }, 2000);

    });
  }

}
