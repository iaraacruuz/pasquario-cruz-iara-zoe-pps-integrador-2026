import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { SoundService } from '../../../core/services/sound';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private soundService: SoundService,
    private router: Router
  ) {}

  async logout() {
    // Reproducir sonido de cierre (diferente al de inicio)
    this.soundService.play('cierre');
    
    // Esperar un momento para que se escuche el sonido
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Cerrar sesión
    await this.authService.logout();
    
    // Navegar al login
    this.router.navigate(['/login']);
  }

  get currentUser() {
    const email = localStorage.getItem('currentUser');
    return email ? this.authService.getUsuarioByEmail(email) : null;
  }
}
