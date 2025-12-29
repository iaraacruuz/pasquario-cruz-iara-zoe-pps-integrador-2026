-- ============================================
-- TABLA: fotos (App01 - Relevamiento Visual)
-- ============================================

CREATE TABLE IF NOT EXISTS fotos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  clasificacion TEXT NOT NULL CHECK (clasificacion IN ('linda', 'fea')),
  usuario_email TEXT NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  comentario TEXT
);

-- Índice para búsquedas por usuario
CREATE INDEX idx_fotos_usuario ON fotos(usuario_email);

-- Índice para búsquedas por clasificación
CREATE INDEX idx_fotos_clasificacion ON fotos(clasificacion);

-- Habilitar RLS
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

-- Política: Permitir todo (simplificado para desarrollo)
CREATE POLICY "Permitir todo en fotos"
ON fotos
FOR ALL
USING (true)
WITH CHECK (true);

-- Ver estructura
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'fotos';
