import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../../core/services/auth';
import { SoundService } from '../../../core/services/sound';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  usuarios: Usuario[];

  constructor(
    private authService: AuthService,
    private soundService: SoundService,
    private router: Router
  ) {
    this.usuarios = this.authService.getUsuarios();
  }

  async login() {
    if (!this.email || !this.password) {
      this.showError('Por favor, complete todos los campos');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      this.soundService.play('exito');
      localStorage.setItem('currentUser', this.email);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.showError('Credenciales inválidas');
    } finally {
      this.isLoading = false;
    }
  }

  async quickLogin(usuario: Usuario) {
    this.email = usuario.correo;
    this.password = usuario.clave;
    await this.login();
  }

  irAPruebas() {
    this.router.navigate(['/test-supabase']);
  }

  private async showError(message: string) {
    this.errorMessage = message;
    this.soundService.play('error');
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
}
