import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  async requestPermissions(): Promise<void> {
    try {
      // Permisos para notificaciones locales
      await LocalNotifications.requestPermissions();
      
      // Permisos para notificaciones push
      await PushNotifications.requestPermissions();
      await PushNotifications.register();
    } catch (error) {
      console.error('Error al solicitar permisos de notificaciones:', error);
    }
  }

  async scheduleLocalNotification(title: string, body: string, id: number = 1): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: id,
            schedule: { at: new Date(Date.now() + 1000) },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Error al programar notificación local:', error);
    }
  }

  async sendImmediateNotification(title: string, body: string): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: Math.floor(Math.random() * 100000),
            schedule: { at: new Date(Date.now() + 100) },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Error al enviar notificación inmediata:', error);
    }
  }

  async cancelNotification(id: number): Promise<void> {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (error) {
      console.error('Error al cancelar notificación:', error);
    }
  }
}
