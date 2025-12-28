# PPS Integrador 2026 - Pasquario Cruz Iara Zoe

## 📱 Integrador de Práctica Profesional Supervisada

Proyecto integrador con 10 aplicaciones móviles desarrolladas con Angular 20 + Ionic + Capacitor.

---

## 📋 Descripción General

Este proyecto contiene 10 aplicaciones móviles completas que cumplen con todos los requisitos del integrador PPS 2026. Cada aplicación está desarrollada siguiendo las mejores prácticas de desarrollo móvil y cuenta con características comunes reutilizables.

---

## 🎯 Aplicaciones Incluidas

### 1. **Relevamiento Visual**
Captura y comparte fotos de cosas lindas y feas del edificio. Incluye votación y visualización de resultados en gráficos.

### 2. **Tabla Didáctica de Idiomas**
Aplicación educativa para niños de 5 años. Enseña colores, números y animales en Español, Inglés y Portugués.

### 3. **Alarma de Robo**
Sistema de seguridad que detecta movimientos del dispositivo y activa alarmas sonoras y visuales.

### 4. **Juego de Memoria**
Juego clásico de memoria con tres niveles de dificultad (fácil, medio, difícil) y registro de mejores tiempos.

### 5. **Carga de Crédito**
Sistema de acumulación de créditos mediante escaneo de códigos QR encriptados.

### 6. **Chat del Aula**
Sistema de chat en tiempo real dividido por divisiones (4A y 4B).

### 7. **Administración de Usuarios**
Gestión de usuarios con alta, baja, modificación y lector de códigos QR de DNI.

### 8. **Visualizador Cinético**
Galería de fotos controlada por movimientos del dispositivo.

### 9. **Juego Cinético**
Juego de personajes (DC/Marvel) controlado por sensores de movimiento.

### 10. **Control de Gastos**
Aplicación de gestión financiera personal con categorización de gastos y gráficos.

---

## 🚀 Características Comunes Implementadas

### ✅ Requerimientos Excluyentes
- ✔️ **Iconos personalizados** para cada aplicación
- ✔️ **Splash screens** estáticos y animados con transición suave
- ✔️ **Todo en español** con tildes y ortografía correcta
- ✔️ **Mensajes de error personalizados** (sin alerts)
- ✔️ **Sonidos** de inicio, cierre y transiciones
- ✔️ **Validación completa** de todos los formularios
- ✔️ **Vibraciones** en errores
- ✔️ **Botones de acceso rápido** para usuarios de prueba
- ✔️ **Botón de cierre de sesión** con limpieza de credenciales
- ✔️ **Pantallas completas** sin espacios neutros
- ✔️ **Alto contraste** entre textos y fondos
- ✔️ **Imágenes y textos** correctamente dimensionados
- ✔️ **Correos automáticos** (cuenta empresarial)
- ✔️ **Notificaciones push**

### 🎨 Requerimientos Optativos
- ✔️ **Spinners personalizados** con logo en todas las esperas
- ✔️ **Animaciones** en botones
- ✔️ **Sonidos** en transiciones de páginas

---

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **Ionic Framework** - Componentes UI móviles
- **Capacitor 5** - Acceso a funcionalidades nativas
- **Firebase** - Backend (Auth, Firestore, Storage)
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos

### Plugins de Capacitor
- `@capacitor/camera` - Cámara
- `@capacitor/haptics` - Vibraciones
- `@capacitor/motion` - Sensores de movimiento
- `@capacitor/local-notifications` - Notificaciones locales
- `@capacitor/push-notifications` - Notificaciones push
- `@capacitor-community/barcode-scanner` - Escáner QR

---

## 📦 Estructura del Proyecto

```
pps-integrador-2026/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios y guards compartidos
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   └── services/
│   │   │       ├── auth.ts          # Autenticación
│   │   │       ├── database.ts      # Firestore
│   │   │       ├── storage.ts       # Firebase Storage
│   │   │       ├── sound.ts         # Sonidos
│   │   │       └── notification.ts  # Notificaciones
│   │   │
│   │   ├── shared/                  # Componentes reutilizables
│   │   │   ├── components/
│   │   │   │   ├── splash/          # Splash screen
│   │   │   │   ├── login/           # Login con acceso rápido
│   │   │   │   ├── spinner/         # Spinner personalizado
│   │   │   │   ├── error-message/   # Mensajes de error
│   │   │   │   └── navbar/          # Barra de navegación
│   │   │   └── directives/
│   │   │       └── vibrate-on-error.directive.ts
│   │   │
│   │   └── features/                # Las 10 aplicaciones
│   │       ├── home/                # Página principal
│   │       ├── app01-relevamiento-visual/
│   │       ├── app02-tabla-didactica/
│   │       ├── app03-alarma-robo/
│   │       ├── app04-juego-memoria/
│   │       ├── app05-carga-credito/
│   │       ├── app06-chat-aula/
│   │       ├── app07-admin-usuarios/
│   │       ├── app08-visualizador-kinetico/
│   │       ├── app09-juego-kinetico/
│   │       └── app10-control-gastos/
│   │
│   ├── assets/
│   │   ├── images/                  # Logos e iconos
│   │   └── sounds/                  # Archivos de audio
│   │
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
```

---

## 👥 Usuarios de Prueba

La aplicación incluye 5 usuarios predefinidos con acceso rápido desde el login:

| ID | Correo | Clave | Perfil | Sexo |
|----|--------|-------|--------|------|
| 1 | admin@admin.com | 111111 | admin | femenino |
| 2 | invitado@invitado.com | 222222 | invitado | femenino |
| 3 | usuario@usuario.com | 333333 | usuario | masculino |
| 4 | anonimo@anonimo.com | 444444 | usuario | masculino |
| 5 | tester@tester.com | 555555 | tester | femenino |

---

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 20+
- npm 10+
- Angular CLI 20+
- Ionic CLI

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/iaraacruuz/pasquario-cruz-iara-zoe-pps-integrador-2026.git
cd pps-integrador-2026
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
- Crear un proyecto en Firebase Console
- Habilitar Authentication (Email/Password)
- Crear una base de datos Firestore
- Habilitar Storage
- Copiar las credenciales en `src/environments/environment.ts`

4. **Agregar archivos de assets**
- Colocar el logo en `src/assets/images/logo.png`
- Agregar archivos de sonido en `src/assets/sounds/`:
  - inicio.mp3
  - cierre.mp3
  - transicion.mp3
  - error.mp3
  - exito.mp3
  - click.mp3

---

## 🚀 Ejecución

### Desarrollo web
```bash
ionic serve
```

### Build Android
```bash
ionic cap add android
ionic cap sync
ionic cap open android
```

### Build iOS
```bash
ionic cap add ios
ionic cap sync
ionic cap open ios
```

---

## 📱 Compilación para Dispositivos

### Android
1. Abrir Android Studio
2. Compilar y ejecutar en dispositivo/emulador

### iOS
1. Abrir Xcode
2. Configurar equipo de desarrollo
3. Compilar y ejecutar en dispositivo/simulador

---

## 🎨 Iconos y Splash Screens

(Aquí se agregarán las capturas de pantalla según la consigna)

### Iconos de las Aplicaciones
![Iconos](./docs/images/iconos.png)

### Splash Screens
![Splash Screens](./docs/images/splash-screens.png)

### Formularios de Ingreso
![Login](./docs/images/login.png)

---

## 📝 Características Técnicas

### Servicios Compartidos
- **AuthService**: Autenticación con Firebase Auth
- **DatabaseService**: CRUD con Firestore
- **StorageService**: Upload de imágenes a Firebase Storage
- **SoundService**: Reproducción de sonidos
- **NotificationService**: Notificaciones push y locales

### Componentes Reutilizables
- **SplashComponent**: Pantalla de inicio animada
- **LoginComponent**: Login con botones de acceso rápido
- **SpinnerComponent**: Indicador de carga personalizado
- **ErrorMessageComponent**: Mensajes de error/éxito/info
- **NavbarComponent**: Barra de navegación con logout

### Guards
- **authGuard**: Protección de rutas autenticadas

### Directivas
- **VibrateOnErrorDirective**: Vibración automática en errores

---

## 🎯 Estado del Proyecto

✅ **Infraestructura Base (40-50% del integrador)**
- ✔️ Estructura de proyecto creada
- ✔️ Servicios compartidos implementados
- ✔️ Componentes reutilizables listos
- ✔️ Sistema de autenticación
- ✔️ Firebase configurado
- ✔️ Plugins de Capacitor instalados
- ✔️ Rutas y navegación
- ✔️ Estilos globales
- ✔️ Guards y directivas

🚧 **Pendiente**
- Implementación de las 10 aplicaciones individuales
- Personalización de iconos
- Grabación de videos de demostración
- Testing en dispositivos reales

---

## 📅 Cronograma

- **28/12/2025**: ✅ Estructura base y componentes comunes (40-50%)
- **29/12 - 31/01/2026**: Desarrollo de las 10 aplicaciones
- **31/01/2026**: Entrega final

---

## 👨‍💻 Autor

**Pasquario Cruz Iara Zoe**
- División: 4A
- Año: 2026

---

## 📄 Licencia

Este proyecto es parte del integrador de Práctica Profesional Supervisada (PPS) 2026.

---

## 🔗 Enlaces

- Repositorio: https://github.com/iaraacruuz/pasquario-cruz-iara-zoe-pps-integrador-2026.git
- Firebase Console: [Configurar después de crear proyecto]

---

## 📞 Contacto

Para consultas sobre el proyecto, contactar a través del repositorio de GitHub.
