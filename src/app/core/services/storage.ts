import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = inject(Storage);

  async uploadFile(file: File | Blob, path: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
  }

  async uploadImage(imageBlob: Blob, folder: string, fileName: string): Promise<string> {
    const path = `${folder}/${fileName}_${Date.now()}.jpg`;
    return await this.uploadFile(imageBlob, path);
  }

  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(this.storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      throw error;
    }
  }

  async getFileURL(path: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error al obtener URL:', error);
      throw error;
    }
  }
}
