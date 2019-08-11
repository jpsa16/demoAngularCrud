import { Component, OnInit } from '@angular/core';

// model
import { Client } from '../../../models/client';

// service
import { ClientService } from '../../../services/client.service';

// toastr
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  productList: Client[];
  promedioEdades: number = 0;
  edades: number = 0
  contador: number = 0;
  cliente: any;
  dividendo: number = 0;
  desviacionEstandar: number = 0;

  constructor(
    private productService: ClientService,
    //private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          this.contador++;
          let x = element.payload.toJSON();
          x["$key"] = element.key;          
          this.cliente = x;
          this.edades = this.edades + parseInt(this.cliente.edad);
          this.productList.push(this.cliente);
        });
        this.promedioEdades = this.edades/this.contador;
        
        // console.log("EDADES: " + this.edades);
        // console.log("CONTADOR: " + this.contador);
        // console.log("promedioEdades: " + this.promedioEdades);

        this.productList.forEach(cliente => {
          this.dividendo = this.dividendo + Math.pow(parseInt(cliente.edad) - this.promedioEdades , 2);
        });
        this.desviacionEstandar = Math.sqrt(this.dividendo/(this.contador-1));
        console.log("dividendo: " + this.dividendo);
        console.log("CONTADOR: " + this.contador);
        this.contador = 0;
        this.edades = 0;
        this.dividendo = 0;
      });      
  }

  onEdit(product: Client) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      //this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }

}
