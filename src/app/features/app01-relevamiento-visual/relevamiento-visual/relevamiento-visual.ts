import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../../../core/services/supabase.service';
import { StorageService } from '../../../core/services/storage';
import { SoundService } from '../../../core/services/sound';

interface Foto {
  id?: number;
  url: string;
  clasificacion: 'linda' | 'fea';
  usuario_email: string;
  fecha?: string;
  comentario?: string;
}

@Component({
  selector: 'app-relevamiento-visual',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './relevamiento-visual.html',
  styleUrl: './relevamiento-visual.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelevamientoVisual implements OnInit {
  
  fotos: Foto[] = [];
  fotoActual: string | null = null;
  cargando = false;
  mostrarClasificacion = false;

  constructor(
    private supabase: SupabaseService,
    private storage: StorageService,
    private sound: SoundService
  ) {}

  async ngOnInit() {
    await this.cargarFotos();
  }

  async tomarFoto() {
    try {
      this.cargando = true;
      
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.fotoActual = image.dataUrl || null;
      this.mostrarClasificacion = true;
      this.sound.play('clic');
      
    } catch (error) {
      console.error('Error al tomar foto:', error);
      this.sound.play('error');
    } finally {
      this.cargando = false;
    }
  }

  async seleccionarFoto() {
    try {
      this.cargando = true;
      
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      this.fotoActual = image.dataUrl || null;
      this.mostrarClasificacion = true;
      this.sound.play('clic');
      
    } catch (error) {
      console.error('Error al seleccionar foto:', error);
      this.sound.play('error');
    } finally {
      this.cargando = false;
    }
  }

  async guardarFoto(clasificacion: 'linda' | 'fea') {
    if (!this.fotoActual) return;

    try {
      this.cargando = true;

      // Subir imagen a Supabase Storage
      const fileName = `foto_${Date.now()}.jpg`;
      const uploadResult = await this.storage.uploadImage(
        'imagenes',
        fileName,
        this.fotoActual
      );

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error('Error al subir imagen');
      }

      // Guardar registro en base de datos
      const usuarioEmail = localStorage.getItem('currentUser') || 'anonimo@anonimo.com';
      
      const nuevaFoto: Foto = {
        url: uploadResult.url,
        clasificacion: clasificacion,
        usuario_email: usuarioEmail
      };

      await this.supabase.insert('fotos', nuevaFoto);

      // Recargar lista
      await this.cargarFotos();

      // Limpiar
      this.fotoActual = null;
      this.mostrarClasificacion = false;
      
      this.sound.play('exito');
      
    } catch (error) {
      console.error('Error al guardar foto:', error);
      this.sound.play('error');
      alert('Error al guardar la foto. Verifica que la tabla "fotos" exista en Supabase.');
    } finally {
      this.cargando = false;
    }
  }

  cancelar() {
    this.fotoActual = null;
    this.mostrarClasificacion = false;
    this.sound.play('clic');
  }

  async cargarFotos() {
    try {
      const data = await this.supabase.select('fotos', '*');
      this.fotos = (data as any as Foto[]) || [];
      
      // Ordenar por fecha más reciente
      this.fotos.sort((a, b) => {
        const fechaA = new Date(a.fecha || 0).getTime();
        const fechaB = new Date(b.fecha || 0).getTime();
        return fechaB - fechaA;
      });
      
    } catch (error) {
      console.error('Error al cargar fotos:', error);
      this.fotos = [];
    }
  }

  get fotosLindas() {
    return this.fotos.filter(f => f.clasificacion === 'linda');
  }

  get fotosFeas() {
    return this.fotos.filter(f => f.clasificacion === 'fea');
  }
}
