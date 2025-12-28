# ✅ CHECKLIST RÁPIDO PARA MAÑANA (29 Diciembre)

## 🔥 PRIMERAS 3 TAREAS (1 hora máximo)

### 1. Configurar Supabase (40 min) ⏰

**Lee la guía completa en**: `SUPABASE_SETUP.md`

**Resumen rápido**:
1. Crear cuenta en https://supabase.com (2 min)
2. Crear proyecto `pps-integrador-2026` (3 min)
3. Copiar credenciales (URL + anon key) a `environment.ts` (2 min)
4. Crear tablas SQL (15 min)
5. Crear 5 usuarios de autenticación (5 min)
6. Configurar storage buckets (5 min)
7. Probar conexión (5 min)

**¿Por qué Supabase?**
- ✅ 100% GRATIS (hasta 500MB)
- ✅ Base de datos PostgreSQL (más potente)
- ✅ Realtime incluido (para chat)
- ✅ Open source
- ✅ Panel admin súper intuitivo

---

### 2. Agregar Assets (20 min) ⏰

#### Logo
1. Crear o descargar un logo (512x512px)
2. Guardar como: `src/assets/images/logo.png`

**Opción rápida**: Usar un generador online:
- https://www.canva.com (gratis)
- https://looka.com
- O buscar "free logo maker"

#### Sonidos
Descargar 6 archivos MP3 cortos (2-3 segundos):

1. **inicio.mp3** - Sonido de bienvenida
2. **cierre.mp3** - Sonido de despedida  
3. **transicion.mp3** - Sonido entre pantallas
4. **error.mp3** - Sonido de error
5. **exito.mp3** - Sonido de éxito
6. **click.mp3** - Sonido de click

Guardar en: `src/assets/sounds/`

**Dónde descargar sonidos gratis**:
- https://mixkit.co/free-sound-effects/ (muy fácil)
- https://freesound.org/
- https://pixabay.com/sound-effects/

**Buscar**:
- "welcome sound"
- "goodbye sound"
- "transition sound"
- "error sound"
- "success sound"
- "click sound"

---

### 3. Probar que funcione (10 min) ⏰

```bash
# En la carpeta del proyecto
cd c:\Users\PC\Documents\PPS RECUPERATORIO\pps-integrador-2026

# Iniciar servidor
ionic serve
```

**Verificar**:
- ✅ Se ve el splash screen
- ✅ Se ve el login
- ✅ Los botones de acceso rápido funcionan
- ✅ Se puede hacer login
- ✅ Se ve el Home con las 10 apps
- ✅ NO hay errores en la consola

**Si hay errores**: 
- Verificar que las credenciales de Firebase estén bien
- Verificar que los archivos de assets existan

---

## 🚀 DESPUÉS: Empezar con la App 1

Una vez que todo funcione, empezar con:
**App 1: Relevamiento Visual**

### Funcionalidades necesarias:
1. Botones grandes (LINDAS / FEAS)
2. Tomar foto con la cámara
3. Subir foto a Firebase Storage
4. Guardar en Firestore (url, usuario, fecha, tipo)
5. Mostrar listado de fotos (ordenado por fecha DESC)
6. Permitir votar (1 voto por foto)
7. Mostrar gráficos (torta para lindas, barras para feas)

---

## 📝 COMANDOS ÚTILES

```bash
# Ver estado de Git
git status

# Guardar cambios
git add .
git commit -m "feat: configurar Firebase y agregar assets"
git push origin main

# Crear componente nuevo
ng generate component features/app01-relevamiento-visual/foto-card --standalone

# Ver errores
npm run build
```

---

## ⚡ TIPS PARA MAÑANA

1. **Firebase primero**: Sin Firebase nada va a funcionar
2. **Logo simple**: No pierdas tiempo, usa cualquier imagen por ahora
3. **Sonidos cortos**: Busca los primeros que encuentres gratis
4. **Probar antes**: Asegúrate que todo funcione antes de empezar a desarrollar
5. **Commits frecuentes**: Guarda cada cambio importante

---

## 🎯 OBJETIVO DEL DÍA

Al final del 29/12 deberías tener:
- ✅ Firebase configurado y funcionando
- ✅ Assets agregados
- ✅ App 1 (Relevamiento Visual) al 50% o más

---

## 💡 SI TIENES PROBLEMAS

### Error: "Firebase not configured"
→ Verificar que copiaste bien las credenciales en environment.ts

### Error: "Can't find logo.png"
→ Verificar que el archivo esté en src/assets/images/logo.png

### Error: "Sound not playing"
→ Los sonidos solo funcionan en dispositivo o con Capacitor, en el navegador pueden no sonar

### La app se ve rara en el navegador
→ Es normal, está diseñada para móvil. Usa las dev tools de Chrome en modo móvil (F12 → Toggle device toolbar)

---

## ⏰ TIEMPO ESTIMADO

- Firebase: 30 min
- Assets: 20 min  
- Pruebas: 10 min
- **Total: 1 hora**

Después de esa hora, ya puedes empezar a desarrollar tranquilo.

---

**¡ÉXITO! 🚀**
