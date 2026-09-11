-- ---------------------------------------------------------------------------
-- Eliminar los 7 campos fijos de investigación (sin migrar sus datos)
-- ---------------------------------------------------------------------------
-- La pestaña "Reconocimientos" usa ya sólo la columna `reconocimientos`
-- (array JSON). Las columnas fijas
--   ri, pibpdu, gadi, sei, gadd, gadit, dfi
-- no las usa nadie más del backend (ni reportes ni PDF) y el modelo ya no las
-- declara, así que se pueden eliminar.
--
-- ⚠️  ESTE SCRIPT NO MIGRA NADA: los textos guardados en esas columnas se
--     pierden de forma IRREVERSIBLE. Si quisieras conservarlos, hay que pasarlos
--     antes al historial: por cada campo no vacío, añadir al array
--     `reconocimientos` un objeto
--       {"anio":"","nombre":<texto>,"categoria":<etiqueta>,"unidad":"","observaciones":""}
--     (la etiqueta es, por ejemplo, "Premio a la innovación" para `pibpdu`).
--
-- Base de datos del backend desplegado: xthansnv_pucp2
-- Uso:  mysql -h <host> -u <usuario> -p <base> < eliminar_campos_fijos_investigador.sql
--
-- ⚠️  ORDEN IMPORTANTE: despliega ANTES el backend con el modelo actualizado
--     (sin estos campos) y el frontend. Si eliminas las columnas con el modelo
--     antiguo todavía desplegado, la API fallará con "Unknown column" en las
--     consultas de investigación.
-- ---------------------------------------------------------------------------


-- ---------------------------------------------------------------------------
-- PASO 0 · Respaldo (OPCIONAL pero recomendado: es gratis y es reversible)
-- ---------------------------------------------------------------------------
-- Guarda los valores actuales en una tabla aparte. Si luego no los quieres,
-- basta con borrar la tabla.

-- CREATE TABLE `docenteinvestigadors_respaldo_campos_fijos` AS
--   SELECT `id`, `codigoDocente`, `ri`, `pibpdu`, `gadi`, `sei`, `gadd`, `gadit`, `dfi`
--   FROM `docenteinvestigadors`;


-- ---------------------------------------------------------------------------
-- PASO 1 · Eliminar las columnas
-- ---------------------------------------------------------------------------

ALTER TABLE `docenteinvestigadors`
  DROP COLUMN `ri`,
  DROP COLUMN `pibpdu`,
  DROP COLUMN `gadi`,
  DROP COLUMN `sei`,
  DROP COLUMN `gadd`,
  DROP COLUMN `gadit`,
  DROP COLUMN `dfi`;


-- ---------------------------------------------------------------------------
-- PASO 2 · Comprobar
-- ---------------------------------------------------------------------------
-- 1) Ya no deben aparecer:
--    SHOW COLUMNS FROM `docenteinvestigadors` LIKE 'dfi';
--    SHOW COLUMNS FROM `docenteinvestigadors` LIKE 'ri';
--
-- 2) La tabla sigue teniendo el historial y los 90 registros:
--    SELECT COUNT(*) AS total,
--           SUM(reconocimientos IS NOT NULL AND TRIM(reconocimientos) <> '') AS con_historial
--      FROM `docenteinvestigadors`;
--
-- 3) Después, abre unas cuantas fichas en la aplicación: el historial saldrá
--    vacío en los registros antiguos (no se migró nada), que es lo esperado.
