# 🧪 INSTRUCCIONES PARA PROBAR SUPABASE

## ✅ Paso 1: Crear la tabla de prueba en Supabase

1. Ve a tu proyecto de Supabase:
   👉 https://supabase.com/dashboard/project/ddukfepfkvkiqyvnjesg

2. En el menú lateral izquierdo, haz clic en **SQL Editor**

3. Haz clic en el botón **+ New query**

4. Copia y pega este código SQL:

```sql
-- Crear tabla de prueba
CREATE TABLE IF NOT EXISTS prueba_conexion (
  id BIGSERIAL PRIMARY KEY,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar un registro inicial
INSERT INTO prueba_conexion (mensaje) 
VALUES ('¡Conexión exitosa con Supabase desde PPS Integrador 2026!');

-- Ver los datos
SELECT * FROM prueba_conexion;
```

5. Haz clic en el botón **Run** (o presiona Ctrl+Enter)

6. Deberías ver el mensaje en la tabla de resultados ✅

---

## ✅ Paso 2: Habilitar acceso público a la tabla (RLS)

Para que Angular pueda insertar y leer datos, necesitamos configurar Row Level Security:

1. En el menú lateral, ve a **Authentication** > **Policies**

2. Busca la tabla `prueba_conexion`

3. Haz clic en **New Policy**

4. Selecciona **Create a policy from scratch**

5. Configura así:
   - **Policy name**: `Permitir todo en prueba_conexion`
   - **Allowed operation**: `ALL`
   - **Target roles**: `anon`, `authenticated`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`

6. Haz clic en **Save policy**

**O bien, ejecuta este SQL más rápido:**

```sql
-- Habilitar RLS en la tabla
ALTER TABLE prueba_conexion ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir todo
CREATE POLICY "Permitir todo en prueba_conexion"
ON prueba_conexion
FOR ALL
USING (true)
WITH CHECK (true);
```

---

## ✅ Paso 3: Probar en Angular

1. Ve a tu navegador donde está corriendo Angular:
   👉 http://localhost:4200/

2. Deberías ver la pantalla de **Login**

3. Haz clic en el botón **🧪 Probar Supabase** (abajo del botón "Iniciar sesión")

4. Se abrirá la página de pruebas

5. Haz clic en **▶️ Ejecutar Todas las Pruebas**

6. Deberías ver:
   - ✅ **Prueba 1: Login** - Usuario admin@admin.com logueado
   - ✅ **Prueba 2: INSERT** - Nuevo registro insertado
   - ✅ **Prueba 3: SELECT** - Lista de registros en tabla

7. Si ves todos los ✅ verdes → **¡Supabase está funcionando!**

---

## 🔍 Si algo falla:

### ❌ Error: "relation 'prueba_conexion' does not exist"
→ **Solución:** Ejecuta el SQL del Paso 1 para crear la tabla

### ❌ Error: "new row violates row-level security policy"
→ **Solución:** Ejecuta el SQL del Paso 2 para habilitar RLS

### ❌ Error: "Invalid API key"
→ **Solución:** Verifica que en `src/environments/environment.ts` tengas:
```typescript
url: "https://ddukfepfkvkiqyvnjesg.supabase.co",
anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📊 Qué hace cada prueba:

### 1️⃣ Prueba de Login
- Intenta hacer login con `admin@admin.com` / `111111`
- Usa el AuthService que está configurado con usuarios locales
- Si pasa: ✅ El sistema de autenticación funciona

### 2️⃣ Prueba de INSERT
- Inserta un nuevo registro en `prueba_conexion`
- Mensaje: `"Prueba desde Angular - [fecha/hora]"`
- Si pasa: ✅ Puedes escribir en Supabase

### 3️⃣ Prueba de SELECT
- Trae todos los registros de `prueba_conexion`
- Los muestra en una tabla
- Si pasa: ✅ Puedes leer de Supabase

---

## ✅ Cuando todas las pruebas pasen:

Verás este mensaje:

> 🎉 **¡Supabase está funcionando perfectamente!**
> 
> Todas las pruebas pasaron correctamente. Puedes continuar con el desarrollo.

**Siguiente paso:** Crear las 6 tablas definitivas del proyecto (usuarios, fotos, mensajes, etc.)

---

**¿Necesitas ayuda?** Avísame en qué paso estás y qué error ves.
