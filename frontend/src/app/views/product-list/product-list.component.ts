import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'app/Services/Productos/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productos = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'stock', 'id_tienda', 'acciones'];


  constructor(
    private productoService: ProductoService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.getProductos().subscribe(data => {this.productos.data = data;
    this.productos.paginator = this.paginator;
    });
  }

  createProducto(): void {

    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px',
      data: { id: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarProductos();
    })
  }

  actualizarProducto( id: number ): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarProductos();
    })
  }

  eliminarProducto(id: number): void {
    if (confirm('estas seguro de eliminar este producto')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.listarProductos();
      });
    }
    console.log(id)
  }
}
