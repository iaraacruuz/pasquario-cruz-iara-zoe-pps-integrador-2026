import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  // Autenticación
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // Base de datos (CRUD genérico)
  async insert(table: string, data: any) {
    const { data: result, error } = await this.supabase
      .from(table)
      .insert(data)
      .select();
    if (error) throw error;
    return result;
  }

  async select(table: string, query?: any) {
    let queryBuilder = this.supabase.from(table).select(query || '*');
    const { data, error } = await queryBuilder;
    if (error) throw error;
    return data;
  }

  async selectWithFilter(table: string, column: string, value: any, query: string = '*') {
    const { data, error } = await this.supabase
      .from(table)
      .select(query)
      .eq(column, value);
    if (error) throw error;
    return data;
  }

  async update(table: string, id: number | string, data: any) {
    const { data: result, error } = await this.supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select();
    if (error) throw error;
    return result;
  }

  async delete(table: string, id: number | string) {
    const { error } = await this.supabase
      .from(table)
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Storage (para imágenes)
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucket: string, path: string) {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  }

  async deleteFile(bucket: string, path: string) {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
  }

  // Realtime (para chat y actualizaciones en tiempo real)
  subscribeToTable(table: string, callback: (payload: any) => void) {
    return this.supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: table },
        callback
      )
      .subscribe();
  }

  // Query con filtros avanzados
  async selectWithOrder(table: string, orderBy: string, ascending: boolean = true, query: string = '*') {
    const { data, error } = await this.supabase
      .from(table)
      .select(query)
      .order(orderBy, { ascending });
    if (error) throw error;
    return data;
  }

  async selectWithLimit(table: string, limit: number, query: string = '*') {
    const { data, error } = await this.supabase
      .from(table)
      .select(query)
      .limit(limit);
    if (error) throw error;
    return data;
  }

  // Queries personalizadas con múltiples filtros
  getQueryBuilder(table: string) {
    return this.supabase.from(table);
  }
}
