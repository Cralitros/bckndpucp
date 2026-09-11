-- ---------------------------------------------------------------------------
-- Historial de reconocimientos del investigador
-- ---------------------------------------------------------------------------
-- La pestaña "Reconocimientos" del diálogo de investigación pasa de 7 campos
-- fijos (ri, pibpdu, gadi, sei, gadd, gadit, dfi) a una tabla de filas con:
--   anio, nombre, categoria, unidad, observaciones
-- y se guarda como un array JSON en esta columna nueva:
--   [{"anio":"2022","nombre":"...","categoria":"...","unidad":"...","observaciones":"..."}]
--
-- POR QUÉ HACE FALTA ESTE SCRIPT:
--   El backend arranca con DB_SYNC=none (ver .env), así que NO ejecuta
--   sequelize.sync() y añadir el campo al modelo no crea nada por sí solo.
--   Sin esta columna, la API seguiría aceptando el resto de campos pero
--   DESCARTARÍA la lista en silencio (Sequelize ignora los atributos que no
--   están definidos en el modelo).
--
-- USO (en la base que use el backend desplegado, p. ej. xthansnv_pucp2):
--   mysql -h <host> -u <usuario> -p <base_de_datos> < migracion_reconocimientos_investigador.sql
--
-- Si algún día se arranca con DB_SYNC=alter, Sequelize crearía la columna sola.
-- ---------------------------------------------------------------------------

ALTER TABLE `docenteinvestigadors`
  ADD COLUMN `reconocimientos` LONGTEXT NULL
  COMMENT 'Historial JSON: [{anio, nombre, categoria, unidad, observaciones}]';

-- Comprobación (opcional):
--   SELECT id, codigoDocente, LEFT(reconocimientos, 120) AS muestra
--   FROM docenteinvestigadors LIMIT 5;
--
-- Nota: los valores que ya existían en ri/pibpdu/gadi/sei/gadd/gadit/dfi NO se
-- borran. El frontend los convierte en filas del historial la primera vez que
-- se abre y se guarda cada registro, así que no hace falta migrarlos por SQL.
--
-- OPCIONAL, sólo cuando compruebes que el historial nuevo guarda bien: vaciar
-- las columnas antiguas para que no queden datos duplicados en la base.
--   UPDATE `docenteinvestigadors`
--     SET `ri` = '', `pibpdu` = '', `gadi` = '', `sei` = '',
--         `gadd` = '', `gadit` = '', `dfi` = ''
--     WHERE `reconocimientos` IS NOT NULL AND `reconocimientos` <> '';
