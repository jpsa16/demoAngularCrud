import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { ClientService } from '../../../services/client.service';

// Class
import { Client } from '../../../models/client';

// toastr
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(
    private productService: ClientService,
    //private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value);
    else
    this.productService.updateProduct(productForm.value);
    
    this.resetForm(productForm);
    //this.toastr.success('Sucessful Operation', 'Product Registered');
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Client();
  }
}
