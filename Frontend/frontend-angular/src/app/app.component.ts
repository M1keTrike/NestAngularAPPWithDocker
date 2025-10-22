import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  nombre = '[TuNombre]';

  users: User[] = [];

  newUser: Partial<User> = { name: '', email: '' };

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe((data) => {
      this.users = data;
    });
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email) {
      alert('Nombre y Email son requeridos');
      return;
    }

    this.http.post<User>(this.apiUrl, this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { name: '', email: '' };
    });
  }

  deleteUser(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadUsers();
    });
  }
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
          this.loadUsers();
        });
    }
  }
}
