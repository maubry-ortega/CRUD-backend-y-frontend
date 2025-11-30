import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../../Services/Usuario/login.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: false
})
export class RegistroComponent implements OnInit {

  showPassword: boolean = false;
  user = {
    nombre: '',
    apellido: '',
    email: '',
    idRol: 2, // Default to Cliente/User
    password: '',
    confirmarContrasena: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.user.nombre || !this.user.apellido ||
      !this.user.email || !this.user.password || !this.user.confirmarContrasena) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    if (this.user.password !== this.user.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const userData = {
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      email: this.user.email,
      idRol: this.user.idRol,
      password: this.user.password
    };

    this.loginService.registrarUsuario(userData).subscribe(response => {
      console.log('Registro exitoso', response);
      this.successMessage = 'Usuario registrado exitosamente';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, error => {
      console.error('Error al registrar', error);
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Error al registrar usuario';
      }
    });
  }
}
