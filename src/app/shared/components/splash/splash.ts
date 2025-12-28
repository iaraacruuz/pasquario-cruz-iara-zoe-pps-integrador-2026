import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../../core/services/sound';

@Component({
  selector: 'app-splash',
  imports: [CommonModule],
  templateUrl: './splash.html',
  styleUrl: './splash.scss',
  standalone: true
})
export class SplashComponent implements OnInit {
  showStatic = true;
  showAnimated = false;

  constructor(
    private router: Router,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    // Reproducir sonido de inicio
    this.soundService.play('inicio');

    // Mostrar splash estático por 1.5 segundos
    setTimeout(() => {
      this.showStatic = false;
      this.showAnimated = true;

      // Mostrar splash animado por 2.5 segundos más
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);
    }, 1500);
  }
}
