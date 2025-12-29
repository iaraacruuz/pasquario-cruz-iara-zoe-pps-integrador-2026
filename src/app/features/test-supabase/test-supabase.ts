import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { AuthService } from '../../core/services/auth';

interface PruebaConexion {
  id?: number;
  mensaje: string;
  fecha?: string;
}

@Component({
  selector: 'app-test-supabase',
  imports: [CommonModule],
  templateUrl: './test-supabase.html',
  styleUrl: './test-supabase.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestSupabaseComponent implements OnInit {
  
  // Estado de las pruebas
  loginStatus: 'pendiente' | 'corriendo' | 'exitoso' | 'error' = 'pendiente';
  insertStatus: 'pendiente' | 'corriendo' | 'exitoso' | 'error' = 'pendiente';
  selectStatus: 'pendiente' | 'corriendo' | 'exitoso' | 'error' = 'pendiente';

  // Mensajes y resultados
  loginMessage = '';
  insertMessage = '';
  selectMessage = '';
  datos: PruebaConexion[] = [];

  // Usuario logueado
  currentUser: any = null;

  constructor(
    private supabase: SupabaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // No hacemos nada automáticamente, esperamos que el usuario haga clic
  }

  async probarLogin() {
    this.loginStatus = 'corriendo';
    this.loginMessage = 'Intentando login con admin@admin.com...';

    try {
      // Intentar login con usuario de prueba
      const result = await this.authService.login('admin@admin.com', '111111');
      
      if (result.success) {
        this.currentUser = result.user;
        this.loginStatus = 'exitoso';
        this.loginMessage = `✅ Login exitoso! Usuario: ${result.user?.perfil} (${result.user?.correo})`;
      } else {
        this.loginStatus = 'error';
        this.loginMessage = `❌ Error en login: ${result.error}`;
      }
    } catch (error: any) {
      this.loginStatus = 'error';
      this.loginMessage = `❌ Excepción en login: ${error.message}`;
    }
  }

  async probarInsert() {
    this.insertStatus = 'corriendo';
    this.insertMessage = 'Insertando registro en tabla prueba_conexion...';

    try {
      const nuevoDato: PruebaConexion = {
        mensaje: `Prueba desde Angular - ${new Date().toLocaleString('es-AR')}`
      };

      const data = await this.supabase.insert('prueba_conexion', nuevoDato);

      this.insertStatus = 'exitoso';
      this.insertMessage = `✅ Registro insertado correctamente! ID: ${data?.[0]?.id || 'N/A'}`;
    } catch (error: any) {
      this.insertStatus = 'error';
      this.insertMessage = `❌ Error al insertar: ${error.message}`;
    }
  }

  async probarSelect() {
    this.selectStatus = 'corriendo';
    this.selectMessage = 'Trayendo datos de la tabla prueba_conexion...';

    try {
      const data = await this.supabase.select('prueba_conexion', '*');

      this.selectStatus = 'exitoso';
      this.datos = (data as any as PruebaConexion[]) || [];
      this.selectMessage = `✅ Se encontraron ${this.datos.length} registros`;
    } catch (error: any) {
      this.selectStatus = 'error';
      this.selectMessage = `❌ Error al traer datos: ${error.message}`;
      this.datos = [];
    }
  }

  async probarTodo() {
    // Ejecutar todas las pruebas en secuencia
    await this.probarLogin();
    
    // Esperar un poco entre pruebas para que se vea el proceso
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.probarInsert();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.probarSelect();
  }

  resetearPruebas() {
    this.loginStatus = 'pendiente';
    this.insertStatus = 'pendiente';
    this.selectStatus = 'pendiente';
    this.loginMessage = '';
    this.insertMessage = '';
    this.selectMessage = '';
    this.datos = [];
    this.currentUser = null;
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pendiente': return 'ellipse-outline';
      case 'corriendo': return 'sync-outline';
      case 'exitoso': return 'checkmark-circle';
      case 'error': return 'close-circle';
      default: return 'help-outline';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pendiente': return 'status-pendiente';
      case 'corriendo': return 'status-corriendo';
      case 'exitoso': return 'status-exitoso';
      case 'error': return 'status-error';
      default: return '';
    }
  }

  get todasLasPruebasExitosas(): boolean {
    return this.loginStatus === 'exitoso' && 
           this.insertStatus === 'exitoso' && 
           this.selectStatus === 'exitoso';
  }
}
