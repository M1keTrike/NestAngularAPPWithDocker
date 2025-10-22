// frontend-angular/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { environment } from '../enviroments/enviroment';

// ... (Interfaz User y resto de la clase) ...

@Component({
  selector: 'app-root',
  standalone: true, // <-- Ya debería estar en true
  // 2. Importar CommonModule y FormsModule aquí
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // 2. Requisito: Tu nombre visible
  nombre = '[TuNombre]'; // <-- Cambia esto por tu nombre

  users: User[] = [];

  // 3. Modelo para el formulario (datos del nuevo usuario)
  newUser: Partial<User> = { name: '', email: '' };

  // 4. URL de la API (IMPORTANTE)
  // Usamos la IP pública de EC2 porque este código se ejecuta
  // en el NAVEGADOR del cliente, no dentro de la red Docker.
  private apiUrl =  environment.apiUrl;

  // 5. Inyectamos el HttpClient para hacer peticiones
  constructor(private http: HttpClient) {}

  // 6. Al iniciar el componente, cargamos los usuarios
  ngOnInit() {
    this.loadUsers();
  }

  // GET: Cargar todos los usuarios
  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe((data) => {
      this.users = data;
    });
  }

  // POST: Crear un nuevo usuario
  createUser() {
    if (!this.newUser.name || !this.newUser.email) {
      alert('Nombre y Email son requeridos');
      return;
    }

    this.http.post<User>(this.apiUrl, this.newUser).subscribe(() => {
      this.loadUsers(); // Recargamos la lista
      this.newUser = { name: '', email: '' }; // Limpiamos el formulario
    });
  }

  // DELETE: Eliminar un usuario
  deleteUser(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadUsers(); // Recargamos la lista
    });
  }

  // PUT: Actualizar un usuario
  updateUser(user: User) {
    const updatedName = prompt('Nuevo nombre:', user.name);
    const updatedEmail = prompt('Nuevo email:', user.email);

    if (updatedName && updatedEmail) {
      this.http
        .put(`${this.apiUrl}/${user.id}`, {
          name: updatedName,
          email: updatedEmail,
        })
        .subscribe(() => {
          this.loadUsers(); // Recargamos la lista
        });
    }
  }
}
