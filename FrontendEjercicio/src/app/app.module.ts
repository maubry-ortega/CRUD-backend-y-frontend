import { BrowserModule } from '@angular/platform-browser'; // Asegúrate de importar BrowserModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './views/Usuario/login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './Services/Usuario/auth.interceptor';
import { LoginService } from './Services/Usuario/login.service';
import { ProductListComponent } from './views/product-list/product-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductModalComponent } from './views/product-modal/product-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersonalizaIntlService } from './Services/Productos/personaliza-intl.service'; 
import { VentaService } from './Services/Venta/venta.service';
import { ListVentasComponent } from './views/Venta/list-ventas/list-ventas.component';
import { FormVentaComponent } from './views/Venta/form-venta/form-venta.component';

@NgModule({
  imports: [
    BrowserModule, // Añadido
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ProductListComponent,
    ProductModalComponent,
    ListVentasComponent,
    FormVentaComponent
  ],
  providers: [
    JwtHelperService,
    LoginService,
    // VentaService, // No es necesario si usas `providedIn: 'root'` en VentaService
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: PersonalizaIntlService }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Considera eliminarlo si no es necesario
  ]
})
export class AppModule { }