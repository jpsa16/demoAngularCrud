import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Model
import { Client } from '../models/client';

@Injectable()
export class ClientService {

  productList: AngularFireList<any>;
  selectedProduct: Client = new Client();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts()
  {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Client)
  {
    this.productList.push({
      nombre: product.nombre,
      apellido: product.apellido,
      edad: product.edad,
      fechaNacimiento: product.fechaNacimiento
    });
  }

  updateProduct(product: Client)
  {
    this.productList.update(product.$key, {
      nombre: product.nombre,
      apellido: product.apellido,
      edad: product.edad,
      fechaNacimiento: product.fechaNacimiento
    });
  }

  deleteProduct($key: string)
  {
    this.productList.remove($key);
  }
}
