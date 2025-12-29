-- ============================================
-- PRUEBA DE CONEXIÓN CON SUPABASE
-- ============================================
-- Ejecutar este script en Supabase SQL Editor
-- para crear una tabla de prueba y verificar
-- que la conexión funciona correctamente
-- ============================================

-- 1. Crear tabla de prueba
CREATE TABLE IF NOT EXISTS prueba_conexion (
  id BIGSERIAL PRIMARY KEY,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insertar registro de prueba
INSERT INTO prueba_conexion (mensaje) 
VALUES ('¡Conexión exitosa con Supabase desde PPS Integrador 2026!');

-- 3. Consultar datos
SELECT * FROM prueba_conexion;

-- ============================================
-- Si ves el mensaje arriba, la conexión funciona!
-- ============================================

-- Opcional: Eliminar tabla de prueba
-- DROP TABLE IF EXISTS prueba_conexion;
