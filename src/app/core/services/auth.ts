import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id: number;
  correo: string;
  clave: string;
  perfil: string;
  sexo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Lista de usuarios de prueba según la consigna
  private usuarios: Usuario[] = [
    { id: 1, correo: "admin@admin.com", clave: "111111", perfil: "admin", sexo: "femenino" },
    { id: 2, correo: "invitado@invitado.com", clave: "222222", perfil: "invitado", sexo: "femenino" },
    { id: 3, correo: "usuario@usuario.com", clave: "333333", perfil: "usuario", sexo: "masculino" },
    { id: 4, correo: "anonimo@anonimo.com", clave: "444444", perfil: "usuario", sexo: "masculino" },
    { id: 5, correo: "tester@tester.com", clave: "555555", perfil: "tester", sexo: "femenino" }
  ];

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.removeItem('currentUser');
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null || localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuarioByEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.correo === email);
  }
}
