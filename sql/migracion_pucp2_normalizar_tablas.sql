-- ============================================================================
--  MIGRACIÓN DE DATOS -> BD NUEVA (xthansnv_pucp2)
--  ---------------------------------------------------------------------------
--  PROBLEMA QUE RESUELVE:
--  El dump de la BD antigua (xthansnv_pucp) tiene los nombres de tabla con
--  mayúsculas (Bancos, Cursos, Docentes, Programas, Provincia...), pero los
--  modelos de Sequelize consultan TODO en minúsculas (bancos, cursos, docentes,
--  programas, provincia...). En Linux/MySQL los nombres de tabla distinguen
--  mayúsculas, así que la app falla con "Table ... doesn't exist".
--
--  ORDEN DE EJECUCIÓN:
--    1) Importar el dump de xthansnv_pucp en la BD xthansnv_pucp2 (phpMyAdmin).
--    2) Ejecutar ESTE script (renombra a minúsculas + arregla docentecursos).
--    3) En el .env del servidor: DB_SYNC=none
-- ============================================================================

USE `xthansnv_pucp2`;

-- ---------------------------------------------------------------------------
-- PASO 0 (informativo): ver qué tablas existen realmente
-- ---------------------------------------------------------------------------
SELECT TABLE_NAME AS tabla, TABLE_ROWS AS filas_aprox
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'xthansnv_pucp2'
ORDER BY TABLE_NAME;


-- ===========================================================================
-- PASO 1: ELIMINAR LA TABLA DUPLICADA VACÍA
-- ---------------------------------------------------------------------------
-- El dump trae DOS tablas con el mismo contenido: `DocenteEncuesta` (con
-- índices y FK) y `Docenteencuesta` (vacía, sin índices). Solo se conserva
-- la primera, renombrada a `docenteencuesta`.
-- Verifica antes de borrarla (debe dar 0):
--     SELECT COUNT(*) FROM `Docenteencuesta`;
-- ===========================================================================
DROP TABLE IF EXISTS `Docenteencuesta`;


-- ===========================================================================
-- PASO 2: RENOMBRAR TABLAS A MINÚSCULAS (como espera Sequelize)
-- ===========================================================================
RENAME TABLE `Bancos`           TO `bancos`;
RENAME TABLE `Cursos`           TO `cursos`;
RENAME TABLE `Departamentos`    TO `departamentos`;
RENAME TABLE `Distritos`        TO `distritos`;
RENAME TABLE `DocenteCategoria` TO `docentecategoria`;
RENAME TABLE `DocenteEncuesta`  TO `docenteencuesta`;
RENAME TABLE `DocenteGrados`    TO `docentegrados`;
RENAME TABLE `DocenteInfos`     TO `docenteinfos`;
RENAME TABLE `DocenteLaborals`  TO `docentelaborals`;
RENAME TABLE `Docentes`         TO `docentes`;
RENAME TABLE `Encuesta`         TO `encuesta`;
RENAME TABLE `Escuelas`         TO `escuelas`;
RENAME TABLE `Facultads`        TO `facultads`;
RENAME TABLE `Firmas`           TO `firmas`;
RENAME TABLE `Logins`           TO `logins`;
RENAME TABLE `Nacionalidads`    TO `nacionalidads`;
RENAME TABLE `Plans`            TO `plans`;
RENAME TABLE `Programas`        TO `programas`;
RENAME TABLE `Provincia`        TO `provincia`;

-- Estas ya estaban en minúsculas (no hace falta renombrarlas):
--   afps, areas, docentecursos, docenteinvestigadors, encuesta


-- ===========================================================================
-- PASO 3: ARREGLAR `docentecursos`
-- ---------------------------------------------------------------------------
-- El dump la creó SIN clave primaria y con varias filas con id = 0.
-- El modelo DocenteCurso usa `id` como PK autoincremental (necesario para
-- DELETE /docentescurso/:id y PUT), así que se regenera la columna id.
-- ===========================================================================
ALTER TABLE `docentecursos`
  DROP COLUMN `id`,
  ADD COLUMN `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;


-- ===========================================================================
-- PASO 4: VERIFICACIÓN
-- ---------------------------------------------------------------------------
-- 4.a) Todas las tablas deben aparecer en minúsculas y ser 23:
SELECT COUNT(*) AS total_tablas FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'xthansnv_pucp2';

SELECT TABLE_NAME AS tabla FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'xthansnv_pucp2' ORDER BY TABLE_NAME;

-- 4.b) Conteo de filas por tabla (para comparar con la BD antigua):
SELECT 'docentes' AS tabla, COUNT(*) AS filas FROM docentes
UNION ALL SELECT 'docentecategoria', COUNT(*) FROM docentecategoria
UNION ALL SELECT 'docentecursos',    COUNT(*) FROM docentecursos
UNION ALL SELECT 'docenteencuesta',  COUNT(*) FROM docenteencuesta
UNION ALL SELECT 'docentegrados',    COUNT(*) FROM docentegrados
UNION ALL SELECT 'docenteinfos',     COUNT(*) FROM docenteinfos
UNION ALL SELECT 'docenteinvestigadors', COUNT(*) FROM docenteinvestigadors
UNION ALL SELECT 'docentelaborals',  COUNT(*) FROM docentelaborals
UNION ALL SELECT 'cursos',           COUNT(*) FROM cursos
UNION ALL SELECT 'programas',        COUNT(*) FROM programas
UNION ALL SELECT 'plans',            COUNT(*) FROM plans
UNION ALL SELECT 'departamentos',    COUNT(*) FROM departamentos
UNION ALL SELECT 'provincia',        COUNT(*) FROM provincia
UNION ALL SELECT 'distritos',        COUNT(*) FROM distritos
UNION ALL SELECT 'escuelas',         COUNT(*) FROM escuelas
UNION ALL SELECT 'facultads',        COUNT(*) FROM facultads
UNION ALL SELECT 'logins',           COUNT(*) FROM logins
UNION ALL SELECT 'firmas',           COUNT(*) FROM firmas
UNION ALL SELECT 'afps',             COUNT(*) FROM afps
UNION ALL SELECT 'areas',            COUNT(*) FROM areas
UNION ALL SELECT 'bancos',           COUNT(*) FROM bancos
UNION ALL SELECT 'nacionalidads',    COUNT(*) FROM nacionalidads
UNION ALL SELECT 'encuesta',         COUNT(*) FROM encuesta;


-- ===========================================================================
-- APÉNDICE (OPCIONAL): DEJAR LA BD LIMPIA ANTES DE IMPORTAR EL DUMP
-- ---------------------------------------------------------------------------
-- Si ya ejecutaste la app con DB_SYNC=alter y la BD tiene tablas creadas
-- (vacías o a medias), bórralas ANTES de importar el dump. ¡Esto borra datos!
-- Descomenta solo si estás seguro:
--
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS docentes, docentecategoria, docentecursos,
--   docenteencuesta, docentegrados, docenteinfos, docenteinvestigadors,
--   docentelaborals, cursos, programas, plans, departamentos, provincia,
--   distritos, escuelas, facultads, logins, firmas, afps, areas, bancos,
--   nacionalidads, encuesta;
-- -- (variantes en mayúsculas, por si el dump ya se importó a medias)
-- DROP TABLE IF EXISTS Docentes, DocenteCategoria, docentecursos,
--   DocenteEncuesta, Docenteencuesta, DocenteGrados, DocenteInfos,
--   docenteinvestigadors, DocenteLaborals, Cursos, Programas, Plans,
--   Departamentos, Provincia, Distritos, Escuelas, Facultads, Logins,
--   Firmas, afps, areas, Bancos, Nacionalidads, Encuesta;
-- SET FOREIGN_KEY_CHECKS = 1;
-- ===========================================================================
