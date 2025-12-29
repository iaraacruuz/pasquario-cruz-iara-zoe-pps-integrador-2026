# 📸 SETUP: App01 - Relevamiento Visual

## ✅ Paso 1: Crear la tabla `fotos` en Supabase

1. Ve al **SQL Editor** de tu proyecto Supabase:
   👉 https://supabase.com/dashboard/project/ddukfepfkvkiqyvnjesg/sql

2. Copia y pega este código SQL:

```sql
-- Crear tabla fotos
CREATE TABLE IF NOT EXISTS fotos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  clasificacion TEXT NOT NULL CHECK (clasificacion IN ('linda', 'fea')),
  usuario_email TEXT NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  comentario TEXT
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_fotos_usuario ON fotos(usuario_email);
CREATE INDEX idx_fotos_clasificacion ON fotos(clasificacion);

-- Habilitar RLS
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

-- Política: Permitir todo
CREATE POLICY "Permitir todo en fotos"
ON fotos
FOR ALL
USING (true)
WITH CHECK (true);
```

3. Haz clic en **Run** (Ctrl+Enter)

4. Deberías ver: ✅ **Success. No rows returned**

---

## ✅ Paso 2: Crear el bucket de Storage

1. Ve a **Storage** en el menú lateral:
   👉 https://supabase.com/dashboard/project/ddukfepfkvkiqyvnjesg/storage/buckets

2. Haz clic en **New bucket**

3. Configura así:
   - **Name**: `imagenes`
   - **Public bucket**: ✅ **SÍ** (marcar el checkbox)
   - **File size limit**: 5 MB
   - **Allowed MIME types**: `image/*`

4. Haz clic en **Create bucket**

5. El bucket `imagenes` debería aparecer en la lista

---

## ✅ Paso 3: Configurar políticas del bucket

1. Haz clic en el bucket `imagenes`

2. Ve a la pestaña **Policies**

3. Haz clic en **New policy**

4. Selecciona **Create a policy from scratch**

5. Configura así:
   - **Policy name**: `Permitir subir imagenes`
   - **Allowed operation**: `INSERT`
   - **Policy definition**: `true`

6. Haz clic en **Save**

7. Repite para las operaciones:
   - **SELECT** (leer/descargar)
   - **UPDATE** (actualizar)
   - **DELETE** (eliminar)

**O ejecuta este SQL más rápido:**

```sql
-- Ir a SQL Editor y ejecutar:

-- Permitir subir archivos
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Permitir subir imagenes',
  'imagenes',
  'true'
);

-- Permitir leer archivos
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Permitir leer imagenes',
  'imagenes',
  'true'
);
```

---

## ✅ Paso 4: Probar la App

1. Abre la app en el navegador:
   👉 http://localhost:4200/login

2. Haz clic en cualquier botón de acceso rápido (ej: **admin**)

3. En el menú principal, haz clic en **"Relevamiento Visual"**

4. Deberías ver la pantalla con 2 botones:
   - 📷 **Tomar Foto** (requiere cámara)
   - 🖼️ **Seleccionar Foto** (desde archivos)

5. Haz clic en **"Seleccionar Foto"**

6. Elige una imagen de tu computadora

7. Clasifícala como **Linda** o **Fea**

8. La foto debería aparecer en el historial ✅

---

## 🎯 Funcionalidades Implementadas

✅ **Tomar foto** con la cámara (móvil/webcam)  
✅ **Seleccionar foto** desde archivos  
✅ **Clasificar** como linda o fea  
✅ **Subir** a Supabase Storage  
✅ **Guardar** registro en base de datos  
✅ **Listar** todas las fotos guardadas  
✅ **Estadísticas** (cantidad de lindas/feas/total)  
✅ **Diseño responsive** (mobile + desktop)  

---

## 🔍 Si algo falla:

### ❌ Error: "relation 'fotos' does not exist"
→ Ejecuta el SQL del Paso 1

### ❌ Error: "The resource already exists"
→ La tabla ya existe, continúa al Paso 2

### ❌ Error al subir imagen
→ Verifica que el bucket `imagenes` sea público y tenga las políticas correctas

### ❌ No se muestran las fotos
→ Verifica en Supabase → Storage → imagenes que las imágenes se hayan subido

---

## 📊 Verificar en Supabase

**Ver fotos guardadas:**
```sql
SELECT * FROM fotos ORDER BY fecha DESC;
```

**Ver archivos subidos:**
👉 Storage → imagenes → deberías ver los archivos .jpg

---

**¿Listo?** Ahora tienes la App01 funcionando completamente! 🎉
