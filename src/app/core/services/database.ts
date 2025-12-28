import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore: Firestore = inject(Firestore);

  async addDocument(collectionName: string, data: any): Promise<any> {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }

  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error al actualizar documento:', error);
      throw error;
    }
  }

  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      throw error;
    }
  }

  async getDocuments(collectionName: string, whereConditions?: any[], orderByField?: string): Promise<any[]> {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      let q = query(collectionRef);

      if (whereConditions && whereConditions.length > 0) {
        q = query(collectionRef, where(whereConditions[0], whereConditions[1], whereConditions[2]));
      }

      if (orderByField) {
        q = query(collectionRef, orderBy(orderByField, 'desc'));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      throw error;
    }
  }
}
