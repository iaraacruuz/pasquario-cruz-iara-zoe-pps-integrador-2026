import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  
  constructor(private supabase: SupabaseService) {}

  async addDocument(tableName: string, data: any): Promise<any> {
    try {
      const dataWithTimestamp = {
        ...data,
        created_at: new Date().toISOString()
      };
      const result = await this.supabase.insert(tableName, dataWithTimestamp);
      return result[0];
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }

  async updateDocument(tableName: string, id: number | string, data: any): Promise<void> {
    try {
      const dataWithTimestamp = {
        ...data,
        updated_at: new Date().toISOString()
      };
      await this.supabase.update(tableName, id, dataWithTimestamp);
    } catch (error) {
      console.error('Error al actualizar documento:', error);
      throw error;
    }
  }

  async deleteDocument(tableName: string, id: number | string): Promise<void> {
    try {
      await this.supabase.delete(tableName, id);
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      throw error;
    }
  }

  async getDocuments(tableName: string, orderByField?: string): Promise<any[]> {
    try {
      if (orderByField) {
        return await this.supabase.selectWithOrder(tableName, orderByField, false);
      }
      return await this.supabase.select(tableName);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      throw error;
    }
  }

  async getDocumentById(tableName: string, id: number | string): Promise<any> {
    try {
      const results = await this.supabase.selectWithFilter(tableName, 'id', id);
      return results && results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error al obtener documento por ID:', error);
      throw error;
    }
  }

  async getDocumentsByField(tableName: string, field: string, value: any): Promise<any[]> {
    try {
      return await this.supabase.selectWithFilter(tableName, field, value);
    } catch (error) {
      console.error('Error al obtener documentos por campo:', error);
      throw error;
    }
  }

  async getDocumentsWithLimit(tableName: string, limit: number, orderByField?: string): Promise<any[]> {
    try {
      const queryBuilder = this.supabase.getQueryBuilder(tableName).select('*');
      
      if (orderByField) {
        queryBuilder.order(orderByField, { ascending: false });
      }
      
      const { data, error } = await queryBuilder.limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error al obtener documentos con límite:', error);
      throw error;
    }
  }

  // Suscripción a cambios en tiempo real
  subscribeToChanges(tableName: string, callback: (payload: any) => void) {
    return this.supabase.subscribeToTable(tableName, callback);
  }

  // Query personalizada avanzada
  getQueryBuilder(tableName: string) {
    return this.supabase.getQueryBuilder(tableName);
  }
}
