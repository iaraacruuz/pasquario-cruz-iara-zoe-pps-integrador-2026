import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    this.loadSounds();
  }

  private loadSounds() {
    // Cargar sonidos predeterminados
    this.sounds['inicio'] = new Audio('assets/sounds/inicio.mp3');
    this.sounds['cierre'] = new Audio('assets/sounds/cierre.mp3');
    this.sounds['transicion'] = new Audio('assets/sounds/transicion.mp3');
    this.sounds['error'] = new Audio('assets/sounds/error.mp3');
    this.sounds['exito'] = new Audio('assets/sounds/exito.mp3');
    this.sounds['click'] = new Audio('assets/sounds/click.mp3');
  }

  play(soundName: string): void {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error('Error al reproducir sonido:', error);
      });
    } else {
      console.warn(`Sonido '${soundName}' no encontrado`);
    }
  }

  stop(soundName: string): void {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  setVolume(soundName: string, volume: number): void {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.volume = Math.max(0, Math.min(1, volume));
    }
  }

  addSound(name: string, path: string): void {
    this.sounds[name] = new Audio(path);
  }
}
