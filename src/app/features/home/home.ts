import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { SoundService } from '../../core/services/sound';

interface App {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  ruta: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class HomeComponent {
  apps: App[] = [
    {
      id: 1,
      nombre: 'Relevamiento Visual',
      descripcion: 'Captura y comparte fotos de cosas lindas y feas del edificio',
      icono: 'camera',
      ruta: '/app01-relevamiento-visual',
      color: '#FF6B6B'
    },
    {
      id: 2,
      nombre: 'Tabla Didáctica',
      descripcion: 'Aprende colores, números y animales en diferentes idiomas',
      icono: 'book',
      ruta: '/app02-tabla-didactica',
      color: '#4ECDC4'
    },
    {
      id: 3,
      nombre: 'Alarma de Robo',
      descripcion: 'Protección con sensores de movimiento',
      icono: 'shield-checkmark',
      ruta: '/app03-alarma-robo',
      color: '#FFD93D'
    },
    {
      id: 4,
      nombre: 'Juego de Memoria',
      descripcion: 'Pon a prueba tu memoria con diferentes niveles',
      icono: 'extension-puzzle',
      ruta: '/app04-juego-memoria',
      color: '#95E1D3'
    },
    {
      id: 5,
      nombre: 'Carga de Crédito',
      descripcion: 'Escanea códigos QR para acumular créditos',
      icono: 'qr-code',
      ruta: '/app05-carga-credito',
      color: '#F38181'
    },
    {
      id: 6,
      nombre: 'Chat del Aula',
      descripcion: 'Conversaciones en tiempo real por divisiones',
      icono: 'chatbubbles',
      ruta: '/app06-chat-aula',
      color: '#AA96DA'
    },
    {
      id: 7,
      nombre: 'Admin Usuarios',
      descripcion: 'Gestión de usuarios con lector de DNI',
      icono: 'people',
      ruta: '/app07-admin-usuarios',
      color: '#FCBAD3'
    },
    {
      id: 8,
      nombre: 'Visualizador Cinético',
      descripcion: 'Galería de fotos con control por movimiento',
      icono: 'images',
      ruta: '/app08-visualizador-kinetico',
      color: '#A8D8EA'
    },
    {
      id: 9,
      nombre: 'Juego Cinético',
      descripcion: 'Controla personajes con movimiento del dispositivo',
      icono: 'game-controller',
      ruta: '/app09-juego-kinetico',
      color: '#FFB6B9'
    },
    {
      id: 10,
      nombre: 'Control de Gastos',
      descripcion: 'Administra tus finanzas mensuales',
      icono: 'wallet',
      ruta: '/app10-control-gastos',
      color: '#8ED6FF'
    }
  ];

  constructor(
    private router: Router,
    private soundService: SoundService
  ) {}

  navigateToApp(app: App) {
    this.soundService.play('transicion');
    this.router.navigate([app.ruta]);
  }
}
