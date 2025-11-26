import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from '../app/views/Usuario/login/login.component'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthInterceptor} from './Services/Usuario/auth.interceptor';
import {LoginService} from './Services/Usuario/login.service';
import { ProductListComponent } from './views/product-list/product-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductModalComponent } from './views/product-modal/product-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersonalizaIntlService } from './Services/Productos/personaliza-intl.service'; // Ajusta la ruta según donde lo hayas guardado

@NgModule({
  imports: [
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
    ProductModalComponent
  ],
  providers: [
    JwtHelperService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: PersonalizaIntlService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }