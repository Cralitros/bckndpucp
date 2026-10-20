-- ---------------------------------------------------------------------------
-- Investigador: "Fecha de registro" y "Observaciones"
-- ---------------------------------------------------------------------------
-- El diálogo de investigación (pestaña "Información General") añade dos campos:
--   fechaRegistro  → fecha en la que se registró el reconocimiento de investigador
--                    (se guarda como texto ISO, igual que `docentecategoria.fecha`)
--   observaciones  → observaciones generales, al final del formulario
--
-- POR QUÉ HACE FALTA ESTE SCRIPT:
--   El backend arranca con DB_SYNC=none (ver .env), así que NO ejecuta
--   sequelize.sync(): añadir los campos al modelo no crea las columnas.
--   Sin ellas, la API aceptaría el resto de campos pero DESCARTARÍA estos dos en
--   silencio (Sequelize ignora los atributos que no están en el modelo).
--
-- USO (en la base que use el backend desplegado, p. ej. xthansnv_pucp2):
--   mysql -h <host> -u <usuario> -p <base_de_datos> < agregar_fecha_registro_observaciones_investigador.sql
--
-- Si algún día se arranca con DB_SYNC=alter, Sequelize crearía las columnas sola.
-- ---------------------------------------------------------------------------

ALTER TABLE `docenteinvestigadors`
  ADD COLUMN `fechaRegistro` VARCHAR(30) NULL
    COMMENT 'Fecha de registro del investigador (texto ISO)',
  ADD COLUMN `observaciones` TEXT NULL
    COMMENT 'Observaciones generales del investigador';

-- Comprobación (opcional):
--   SHOW COLUMNS FROM `docenteinvestigadors` LIKE 'fechaRegistro';
--   SHOW COLUMNS FROM `docenteinvestigadors` LIKE 'observaciones';
--   SELECT id, codigoDocente, fechaRegistro, LEFT(observaciones, 60) AS muestra
--   FROM `docenteinvestigadors` LIMIT 5;
--
-- Nota: los registros existentes quedan con las dos columnas en NULL; el
-- formulario las muestra vacías y se completan al editar.
