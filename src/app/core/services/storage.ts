import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  constructor(private supabase: SupabaseService) {}

  async uploadFile(file: File, bucket: string = 'uploads', folder: string = ''): Promise<string> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const path = folder ? `${folder}/${fileName}` : fileName;
      
      await this.supabase.uploadFile(bucket, path, file);
      const publicUrl = await this.supabase.getPublicUrl(bucket, path);
      
      return publicUrl;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
  }

  async uploadImage(imageBlob: Blob, folder: string, fileName?: string): Promise<string> {
    try {
      const name = fileName || `image_${Date.now()}.jpg`;
      const file = new File([imageBlob], name, { type: 'image/jpeg' });
      
      return await this.uploadFile(file, 'images', folder);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  }

  async deleteFile(path: string, bucket: string = 'uploads'): Promise<void> {
    try {
      await this.supabase.deleteFile(bucket, path);
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      throw error;
    }
  }

  async getFileURL(path: string, bucket: string = 'uploads'): Promise<string> {
    try {
      return await this.supabase.getPublicUrl(bucket, path);
    } catch (error) {
      console.error('Error al obtener URL:', error);
      throw error;
    }
  }

  // Convertir Blob a File
  blobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, { type: blob.type });
  }

  // Subir múltiples archivos
  async uploadMultipleFiles(files: File[], bucket: string = 'uploads', folder: string = ''): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, bucket, folder));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error al subir múltiples archivos:', error);
      throw error;
    }
  }
}
