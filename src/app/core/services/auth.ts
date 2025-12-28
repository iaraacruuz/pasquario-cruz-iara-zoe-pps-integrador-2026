import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

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
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  // Lista de usuarios de prueba según la consigna
  private usuarios: Usuario[] = [
    { id: 1, correo: "admin@admin.com", clave: "111111", perfil: "admin", sexo: "femenino" },
    { id: 2, correo: "invitado@invitado.com", clave: "222222", perfil: "invitado", sexo: "femenino" },
    { id: 3, correo: "usuario@usuario.com", clave: "333333", perfil: "usuario", sexo: "masculino" },
    { id: 4, correo: "anonimo@anonimo.com", clave: "444444", perfil: "usuario", sexo: "masculino" },
    { id: 5, correo: "tester@tester.com", clave: "555555", perfil: "tester", sexo: "femenino" }
  ];

  constructor(private supabase: SupabaseService) {
    // Escuchar cambios en el estado de autenticación
    this.supabase.onAuthStateChange((_event, session) => {
      this.currentUserSubject.next(session?.user ?? null);
    });

    // Verificar sesión actual al iniciar
    this.loadCurrentUser();
  }

  private async loadCurrentUser() {
    const user = await this.supabase.getCurrentUser();
    this.currentUserSubject.next(user);
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.supabase.signIn(email, password);
      
      // Buscar datos adicionales del usuario en la lista local
      const usuarioData = this.getUsuarioByEmail(email);
      if (usuarioData) {
        localStorage.setItem('currentUser', email);
        localStorage.setItem('currentUserData', JSON.stringify(usuarioData));
      }
      
      return user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.supabase.signOut();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserData');
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null || localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserData(): Usuario | null {
    const data = localStorage.getItem('currentUserData');
    return data ? JSON.parse(data) : null;
  }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuarioByEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.correo === email);
  }

  // Método para registrar nuevos usuarios
  async register(email: string, password: string, perfil: string = 'usuario', sexo: string = 'masculino'): Promise<any> {
    try {
      const { user } = await this.supabase.signUp(email, password);
      
      // Guardar datos adicionales en Supabase
      if (user) {
        await this.supabase.insert('usuarios', {
          email: email,
          perfil: perfil,
          sexo: sexo,
          created_at: new Date().toISOString()
        });
      }
      
      return user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }
}
