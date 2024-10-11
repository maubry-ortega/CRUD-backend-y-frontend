import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ProductoService } from 'app/Services/Productos/producto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  productoForm: FormGroup;
  id: number | null = null;

  constructor( 
    private fb: FormBuilder, 
    private productoService: ProductoService, 
    private dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number |null }
    ) { 

    this.productoForm = this.fb.group({
      Nombre: ["", Validators.required],
      Descripcion: ["", Validators.required],
      Precio: ["", Validators.required],
      Stock: ["", Validators.required],
      IdTienda: ["", Validators.required]
    });

  }

  ngOnInit(): void {
    this.id = this.data.id;
    if (this.id) {
      this.selecionarProducto(this.id);
    }
  }

  selecionarProducto(id: number): void {
    this.productoService.getProducto(id).subscribe({
      next: ( data ) => {
        if ( data ) {
          const { nombre, descripcion, precio, stock, id_tienda } = data[0];
          this.productoForm.patchValue({
            Nombre:  nombre,
            Descripcion: descripcion,
            Precio: precio,
            Stock: stock,
            IdTienda: id_tienda
          });
        } 
      }
    });
  }

  guardarProducto(): void {
    if ( this.productoForm.valid ) {
      if ( this.id ) {
        this.productoService.updateProducto(this.id, this.productoForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.productoService.createProducto(this.productoForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
    console.log( this.productoForm.value)
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
