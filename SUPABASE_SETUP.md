# 🚀 GUÍA DE CONFIGURACIÓN SUPABASE

## ✅ ¿Qué es Supabase?

Supabase es una alternativa **open-source** a Firebase que ofrece:
- ✅ Base de datos PostgreSQL (más potente que Firestore)
- ✅ Autenticación integrada
- ✅ Storage para archivos
- ✅ Realtime subscriptions
- ✅ **GRATIS** hasta 500MB de base de datos y 1GB de storage
- ✅ Panel de administración muy intuitivo

---

## 📝 PASO 1: Crear Cuenta y Proyecto (10 min)

### 1. Registrarse en Supabase
1. Ir a: https://supabase.com
2. Click en **"Start your project"**
3. Click en **"Sign in with GitHub"** (recomendado)
4. Autorizar Supabase

### 2. Crear un Nuevo Proyecto
1. Click en **"New project"**
2. Completar datos:
   - **Name**: `pps-integrador-2026`
   - **Database Password**: Guardar esta contraseña (ej: `PPS2026_password`)
   - **Region**: South America (São Paulo) - el más cercano
   - **Pricing Plan**: Free
3. Click en **"Create new project"**
4. Esperar 2-3 minutos mientras se crea el proyecto

---

## 🔑 PASO 2: Obtener Credenciales (2 min)

### 1. Ir a Project Settings
1. En el menú lateral, click en el ícono de **engranaje (⚙️)**
2. Click en **"API"**

### 2. Copiar Credenciales
Vas a ver:
- **Project URL**: `https://xxx.supabase.co`
- **anon public**: `eyJhbGc...` (muy largo)

### 3. Pegar en tu Proyecto
Abrir: `src/environments/environment.ts`

Reemplazar:
```typescript
export const environment = {
  production: false,
  firebase: {
    // Puedes dejarlo vacío o eliminarlo
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  supabase: {
    url: "PEGAR_TU_PROJECT_URL_AQUI",
    anonKey: "PEGAR_TU_ANON_PUBLIC_KEY_AQUI"
  }
};
```

Hacer lo mismo en: `src/environments/environment.prod.ts`

---

## 🗄️ PASO 3: Crear Tablas en la Base de Datos (15 min)

### 1. Ir a SQL Editor
1. En el menú lateral, click en **"SQL Editor"**
2. Click en **"+ New query"**

### 2. Ejecutar Scripts SQL

#### Script 1: Tabla de Usuarios
```sql
-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  perfil TEXT DEFAULT 'usuario',
  sexo TEXT DEFAULT 'masculino',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura a todos
CREATE POLICY "Permitir lectura a todos" 
ON usuarios FOR SELECT 
USING (true);

-- Política: Permitir inserción a usuarios autenticados
CREATE POLICY "Permitir inserción a autenticados" 
ON usuarios FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
```

#### Script 2: Tabla de Fotos (para Relevamiento Visual)
```sql
-- Crear tabla de fotos
CREATE TABLE fotos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  usuario_email TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('linda', 'fea')),
  votos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Permitir lectura a todos" 
ON fotos FOR SELECT 
USING (true);

CREATE POLICY "Permitir inserción a autenticados" 
ON fotos FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización a todos" 
ON fotos FOR UPDATE 
USING (true);
```

#### Script 3: Tabla de Mensajes (para Chat del Aula)
```sql
-- Crear tabla de mensajes
CREATE TABLE mensajes (
  id BIGSERIAL PRIMARY KEY,
  sala TEXT NOT NULL CHECK (sala IN ('4A', '4B')),
  usuario_email TEXT NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Permitir lectura a todos" 
ON mensajes FOR SELECT 
USING (true);

CREATE POLICY "Permitir inserción a autenticados" 
ON mensajes FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
```

#### Script 4: Tabla de Puntajes (para Juegos)
```sql
-- Crear tabla de puntajes
CREATE TABLE puntajes (
  id BIGSERIAL PRIMARY KEY,
  juego TEXT NOT NULL,
  usuario_email TEXT NOT NULL,
  puntos INTEGER NOT NULL,
  tiempo INTEGER,
  fecha DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE puntajes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Permitir lectura a todos" 
ON puntajes FOR SELECT 
USING (true);

CREATE POLICY "Permitir inserción a autenticados" 
ON puntajes FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
```

#### Script 5: Tabla de Créditos (para Carga de Crédito)
```sql
-- Crear tabla de códigos QR
CREATE TABLE codigos_qr (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  credito INTEGER NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  usuario_email TEXT
);

-- Insertar códigos QR predefinidos
INSERT INTO codigos_qr (codigo, credito) VALUES
  ('8c95def646b6127282ed50454b73240300dccabc', 10),
  ('ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172', 50),
  ('2786f4877b9091dcad7f35751bfcf5d5ea712b2f', 100);

-- Habilitar RLS
ALTER TABLE codigos_qr ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Permitir lectura a todos" 
ON codigos_qr FOR SELECT 
USING (true);

CREATE POLICY "Permitir actualización a autenticados" 
ON codigos_qr FOR UPDATE 
WITH CHECK (auth.role() = 'authenticated');
```

#### Script 6: Tabla de Gastos (para Control de Gastos)
```sql
-- Crear tabla de gastos
CREATE TABLE gastos (
  id BIGSERIAL PRIMARY KEY,
  usuario_email TEXT NOT NULL,
  categoria TEXT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  fecha DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear tabla de ingresos
CREATE TABLE ingresos (
  id BIGSERIAL PRIMARY KEY,
  usuario_email TEXT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  mes INTEGER NOT NULL,
  anio INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingresos ENABLE ROW LEVEL SECURITY;

-- Políticas para gastos
CREATE POLICY "Usuarios ven solo sus gastos" 
ON gastos FOR SELECT 
USING (usuario_email = auth.email());

CREATE POLICY "Usuarios insertan solo sus gastos" 
ON gastos FOR INSERT 
WITH CHECK (usuario_email = auth.email());

-- Políticas para ingresos
CREATE POLICY "Usuarios ven solo sus ingresos" 
ON ingresos FOR SELECT 
USING (usuario_email = auth.email());

CREATE POLICY "Usuarios insertan solo sus ingresos" 
ON ingresos FOR INSERT 
WITH CHECK (usuario_email = auth.email());
```

### 3. Ejecutar Cada Script
Para cada script:
1. Copiar el código SQL
2. Pegar en el editor
3. Click en **"Run"** (esquina inferior derecha)
4. Verificar que diga **"Success. No rows returned"**

---

## 👥 PASO 4: Crear Usuarios de Autenticación (5 min)

### 1. Ir a Authentication
1. En el menú lateral, click en **"Authentication"**
2. Click en **"Users"**

### 2. Crear los 5 Usuarios
Click en **"Add user"** y crear cada uno:

```
Email: admin@admin.com
Password: 111111
☑️ Auto Confirm User

Email: invitado@invitado.com
Password: 222222
☑️ Auto Confirm User

Email: usuario@usuario.com
Password: 333333
☑️ Auto Confirm User

Email: anonimo@anonimo.com
Password: 444444
☑️ Auto Confirm User

Email: tester@tester.com
Password: 555555
☑️ Auto Confirm User
```

**IMPORTANTE**: Marcar **"Auto Confirm User"** para que no necesiten confirmación por email.

---

## 📦 PASO 5: Configurar Storage (5 min)

### 1. Ir a Storage
1. En el menú lateral, click en **"Storage"**
2. Click en **"Create a new bucket"**

### 2. Crear Buckets

#### Bucket para Imágenes
- **Name**: `images`
- **Public bucket**: ✅ (marcado)
- Click **"Create bucket"**

#### Bucket para General
- **Name**: `uploads`
- **Public bucket**: ✅ (marcado)
- Click **"Create bucket"**

### 3. Configurar Políticas de Storage

Para cada bucket (`images` y `uploads`):
1. Click en el bucket
2. Click en **"Policies"**
3. Click en **"New policy"**
4. Seleccionar: **"For full customization"**
5. Pegar este código:

```sql
-- Permitir lectura a todos
CREATE POLICY "Permitir lectura pública"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Permitir subida a usuarios autenticados
CREATE POLICY "Permitir subida a autenticados"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Permitir eliminación solo al dueño
CREATE POLICY "Permitir eliminar propio contenido"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

6. Click **"Save policy"**

**Nota**: Repetir para el bucket `uploads`, cambiando `'images'` por `'uploads'`.

---

## ✅ PASO 6: Verificar Configuración (2 min)

### Checklist Final

En Supabase, verificar:
- ✅ Proyecto creado
- ✅ Credenciales copiadas al proyecto Angular
- ✅ 6 tablas creadas (usuarios, fotos, mensajes, puntajes, codigos_qr, gastos)
- ✅ 5 usuarios creados en Authentication
- ✅ 2 buckets de storage creados (images, uploads)
- ✅ Políticas de storage configuradas

---

## 🧪 PASO 7: Probar la Conexión

### Ejecutar el Proyecto
```bash
cd c:\Users\PC\Documents\PPS RECUPERATORIO\pps-integrador-2026
ionic serve
```

### Probar Login
1. Ir a http://localhost:4200
2. Esperar el splash
3. En el login, usar uno de los botones de acceso rápido
4. Si funciona: ✅ Supabase conectado correctamente

---

## 💡 VENTAJAS DE SUPABASE vs FIREBASE

### ✅ Supabase
- Base de datos SQL (PostgreSQL) - más potente
- Queries más flexibles
- Gratis hasta 500MB de DB
- Open source
- Panel de admin más completo
- Realtime incluido
- No límite de lecturas/escrituras en plan free

### Firebase
- Base de datos NoSQL (Firestore)
- Más fácil para principiantes
- Mejor integración con Google
- Gratis hasta 1GB de DB

---

## 📚 RECURSOS ÚTILES

### Documentación Oficial
- Supabase Docs: https://supabase.com/docs
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript/introduction

### Ejemplos de Queries

#### Insertar datos
```typescript
await this.db.addDocument('fotos', {
  url: 'https://...',
  usuario_email: 'admin@admin.com',
  tipo: 'linda'
});
```

#### Leer datos
```typescript
const fotos = await this.db.getDocuments('fotos', 'created_at');
```

#### Actualizar datos
```typescript
await this.db.updateDocument('fotos', 1, { votos: 5 });
```

#### Eliminar datos
```typescript
await this.db.deleteDocument('fotos', 1);
```

#### Realtime (Chat en vivo)
```typescript
this.db.subscribeToChanges('mensajes', (payload) => {
  console.log('Nuevo mensaje:', payload);
  // Actualizar UI
});
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### Error: "Invalid API key"
→ Verificar que copiaste bien el `anonKey` en environment.ts

### Error: "Row Level Security"
→ Las políticas de RLS están activas, verificar que estés autenticado

### Error: "Bucket not found"
→ Verificar que creaste los buckets `images` y `uploads`

### Las imágenes no se ven
→ Verificar que marcaste los buckets como "Public bucket"

---

## 🎉 ¡LISTO!

Ya tienes Supabase configurado y funcionando. Ahora puedes:
- ✅ Autenticar usuarios
- ✅ Guardar datos en PostgreSQL
- ✅ Subir imágenes
- ✅ Recibir actualizaciones en tiempo real

**Tiempo total de configuración: ~40 minutos**

¡A desarrollar las apps! 🚀
