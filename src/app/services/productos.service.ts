import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { resolve } from 'path';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargado = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

    constructor(private http: HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos() {

    return new Promise(( resolve, reject) => {
      this.http.get('https://angular-html-b2ef4.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[] ) => {
       // console.log(resp);
        this.productos = resp;
        this.cargado = false;
        // setTimeout(() => {

        // }, 2000);
        resolve(); // la promesa termino con exito
      });
    });


  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-b2ef4.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {

    if ( this.productosFiltrado.length === 0) {
      // cargar Productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
   // this.productosFiltrado = this.productos.filter(producto => {
     // return true;
   // });
    // nos regresa una nueva coleccion de datos
   // console.log(this.productosFiltrado);
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
   // console.log(this.productos);
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }

}
