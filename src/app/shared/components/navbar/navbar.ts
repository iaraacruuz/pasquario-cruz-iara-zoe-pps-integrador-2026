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
  showMenu = false;

  constructor(
    private authService: AuthService,
    private soundService: SoundService,
    private router: Router
  ) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  async logout() {
    this.soundService.play('cierre');
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  get currentUser() {
    const email = localStorage.getItem('currentUser');
    return email ? this.authService.getUsuarioByEmail(email) : null;
  }
}
