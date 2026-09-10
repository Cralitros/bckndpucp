-- ============================================================================
--  COPIAR LOS DATOS EXISTENTES:  xthansnv_pucp  ->  xthansnv_pucp2
--  ---------------------------------------------------------------------------
--  Copia DIRECTA entre las dos bases de datos del mismo servidor MySQL
--  (no hace falta exportar ni importar ningún archivo .sql).
--
--  Maneja automáticamente la diferencia de mayúsculas: las tablas de la BD
--  antigua están como `Bancos`, `Docentes`, `Programas`... y las de la BD
--  nueva como `bancos`, `docentes`, `programas`... (lo que espera Sequelize).
--
--  REQUISITOS:
--    - Que la BD antigua `xthansnv_pucp` siga existiendo.
--    - Que la BD nueva `xthansnv_pucp2` YA tenga las tablas creadas
--      (importando el dump + renombrando, o con `DB_SYNC=alter node app.js`).
--    - Que las tablas destino estén VACÍAS (si no, ver el bloque APÉNDICE).
--
--  EJECUTAR TODO ESTE SCRIPT EN UNA SOLA EJECUCIÓN (phpMyAdmin -> pestaña SQL).
-- ============================================================================

-- Modo relajado: la BD antigua tiene fechas '0000-00-00' y datetime cero, que
-- MySQL rechaza en modo estricto. (Es el mismo modo que usa el dump original.)
SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- Desactivamos las FK mientras copiamos, para no depender del orden y evitar
-- errores si algún registro huérfano existía ya en la BD antigua.
SET FOREIGN_KEY_CHECKS = 0;


-- ===========================================================================
-- 1. TABLAS MAESTRAS / CATÁLOGOS (sin dependencias)
-- ===========================================================================
INSERT INTO `xthansnv_pucp2`.`afps` (`id`,`nombre`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`afps`;

INSERT INTO `xthansnv_pucp2`.`areas` (`id`,`nombre`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`areas`;

INSERT INTO `xthansnv_pucp2`.`bancos` (`id`,`nombre`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Bancos`;

INSERT INTO `xthansnv_pucp2`.`nacionalidads` (`id`,`nombre`,`pais`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`pais`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Nacionalidads`;

INSERT INTO `xthansnv_pucp2`.`encuesta` (`id`,`preguntas`,`fecha`,`paprobado`,`totalpreguntas`,`createdAt`,`updatedAt`)
SELECT `id`,`preguntas`,`fecha`,`paprobado`,`totalpreguntas`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Encuesta`;

INSERT INTO `xthansnv_pucp2`.`departamentos` (`id`,`nombre`,`valor`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`valor`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Departamentos`;

INSERT INTO `xthansnv_pucp2`.`facultads` (`id`,`nombre`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Facultads`;

INSERT INTO `xthansnv_pucp2`.`plans` (`id`,`nombre`,`nivel_academico`,`vigencia`,`createdAt`,`updatedAt`)
SELECT `id`,`nombre`,`nivel_academico`,`vigencia`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Plans`;

INSERT INTO `xthansnv_pucp2`.`logins` (`id`,`dni`,`password`,`nivel`,`rol`,`nombres`,`apellidos`,`email`,`cargo`,`createdAt`,`updatedAt`)
SELECT `id`,`dni`,`password`,`nivel`,`rol`,`nombres`,`apellidos`,`email`,`cargo`,`createdAt`,`updatedAt` FROM `xthansnv_pucp`.`Logins`;


-- ===========================================================================
-- 2. GEOGRAFÍA (provincia depende de departamentos; distritos de provincia)
-- ===========================================================================
INSERT INTO `xthansnv_pucp2`.`provincia` (`id`,`nombre`,`valor`,`createdAt`,`updatedAt`,`departamento_id`)
SELECT `id`,`nombre`,`valor`,`createdAt`,`updatedAt`,`departamento_id` FROM `xthansnv_pucp`.`Provincia`;

INSERT INTO `xthansnv_pucp2`.`distritos` (`id`,`nombre`,`valor`,`createdAt`,`updatedAt`,`provincia_id`)
SELECT `id`,`nombre`,`valor`,`createdAt`,`updatedAt`,`provincia_id` FROM `xthansnv_pucp`.`Distritos`;


-- ===========================================================================
-- 3. ESTRUCTURA ACADÉMICA
-- ===========================================================================
INSERT INTO `xthansnv_pucp2`.`escuelas` (`id`,`nombre`,`createdAt`,`updatedAt`,`idFacultad`)
SELECT `id`,`nombre`,`createdAt`,`updatedAt`,`idFacultad` FROM `xthansnv_pucp`.`Escuelas`;

INSERT INTO `xthansnv_pucp2`.`programas` (`id`,`programa`,`gestor`,`director`,`inicio`,`fin`,`createdAt`,`updatedAt`,`idEscuela`)
SELECT `id`,`programa`,`gestor`,`director`,`inicio`,`fin`,`createdAt`,`updatedAt`,`idEscuela` FROM `xthansnv_pucp`.`Programas`;

INSERT INTO `xthansnv_pucp2`.`cursos` (`codigo`,`nombre`,`semestre`,`nivel`,`creditos`,`areas`,`createdAt`,`updatedAt`,`codigoPlan`,`idPrograma`)
SELECT `codigo`,`nombre`,`semestre`,`nivel`,`creditos`,`areas`,`createdAt`,`updatedAt`,`codigoPlan`,`idPrograma` FROM `xthansnv_pucp`.`Cursos`;


-- ===========================================================================
-- 4. DOCENTES Y SUS TABLAS RELACIONADAS
-- ===========================================================================
INSERT INTO `xthansnv_pucp2`.`docentes`
  (`nombres`,`apellidos`,`codigo`,`digito`,`domicilio`,`telefono`,`celular`,`estado_civil`,
   `numero_hijos`,`sexo`,`dni`,`especialidad`,`pasaporte`,`fecha_nacimiento`,`lugar_nacimiento`,
   `fallecimiento`,`fecha_fallecimiento`,`banco`,`cuenta`,`afp`,`cussp`,`afiliacion`,`fecha_cv`,
   `ruc`,`observaciones`,`createdAt`,`updatedAt`,`idDepartamento`,`idProvincia`,`idDistrito`,`idNacionalidad`)
SELECT
   `nombres`,`apellidos`,`codigo`,`digito`,`domicilio`,`telefono`,`celular`,`estado_civil`,
   `numero_hijos`,`sexo`,`dni`,`especialidad`,`pasaporte`,`fecha_nacimiento`,`lugar_nacimiento`,
   `fallecimiento`,`fecha_fallecimiento`,`banco`,`cuenta`,`afp`,`cussp`,`afiliacion`,`fecha_cv`,
   `ruc`,`observaciones`,`createdAt`,`updatedAt`,`idDepartamento`,`idProvincia`,`idDistrito`,`idNacionalidad`
FROM `xthansnv_pucp`.`Docentes`;

INSERT INTO `xthansnv_pucp2`.`docentecategoria`
  (`id`,`tipo`,`fecha`,`categoria`,`condiciondap`,`dedicacion`,`labor`,`categoriadap`,`ratificado`,
   `hContratado`,`hAuxiliar`,`hPrincipal`,`hAsociado`,`dedicacionJubilacion`,`categoriaJubilacion`,
   `createdAt`,`updatedAt`,`codigoDocente`,`hProfesorVisita`,`hInstructor`,`hJefePract`,`hAyudante`,`hAsistente`)
SELECT
   `id`,`tipo`,`fecha`,`categoria`,`condiciondap`,`dedicacion`,`labor`,`categoriadap`,`ratificado`,
   `hContratado`,`hAuxiliar`,`hPrincipal`,`hAsociado`,`dedicacionJubilacion`,`categoriaJubilacion`,
   `createdAt`,`updatedAt`,`codigoDocente`,`hProfesorVisita`,`hInstructor`,`hJefePract`,`hAyudante`,`hAsistente`
FROM `xthansnv_pucp`.`DocenteCategoria`;

INSERT INTO `xthansnv_pucp2`.`docentegrados`
  (`id`,`grado`,`maximo_grado`,`pais_grado`,`bgac`,`bga`,`prestamoc`,`prestamo`,`createdAt`,`updatedAt`,`codigoDocente`)
SELECT
   `id`,`grado`,`maximo_grado`,`pais_grado`,`bgac`,`bga`,`prestamoc`,`prestamo`,`createdAt`,`updatedAt`,`codigoDocente`
FROM `xthansnv_pucp`.`DocenteGrados`;

INSERT INTO `xthansnv_pucp2`.`docentelaborals`
  (`id`,`trabajo`,`cargo_actual`,`tipo_empresa`,`direccion_empresa`,`telefono_empresa`,
   `correo_corporativo`,`correo_personal`,`correo_alternativo`,`contacto`,`createdAt`,`updatedAt`,`codigoDocente`)
SELECT
   `id`,`trabajo`,`cargo_actual`,`tipo_empresa`,`direccion_empresa`,`telefono_empresa`,
   `correo_corporativo`,`correo_personal`,`correo_alternativo`,`contacto`,`createdAt`,`updatedAt`,`codigoDocente`
FROM `xthansnv_pucp`.`DocenteLaborals`;

INSERT INTO `xthansnv_pucp2`.`docenteinfos`
  (`id`,`categoria`,`dedicacion`,`inicio_dictado`,`fin_dictado`,`semestre`,`modo_ingreso`,`departamento`,
   `lugar_dictado`,`pais_dictado`,`dias_extranjero`,`labor_administrativa`,`rol_anterior`,`comisiones`,
   `emision_carne`,`prestamos`,`sanciones`,`observadap`,`historico`,`felicitacion`,`createdAt`,`updatedAt`,
   `codigoDocente`,`estado`,`lineaActual`,`tipoDocente`,`fechaVigencia`,`resolucionVigente`)
SELECT
   `id`,`categoria`,`dedicacion`,`inicio_dictado`,`fin_dictado`,`semestre`,`modo_ingreso`,`departamento`,
   `lugar_dictado`,`pais_dictado`,`dias_extranjero`,`labor_administrativa`,`rol_anterior`,`comisiones`,
   `emision_carne`,`prestamos`,`sanciones`,`observadap`,`historico`,`felicitacion`,`createdAt`,`updatedAt`,
   `codigoDocente`,`estado`,`lineaActual`,`tipoDocente`,`fechaVigencia`,`resolucionVigente`
FROM `xthansnv_pucp`.`DocenteInfos`;

INSERT INTO `xthansnv_pucp2`.`docenteinvestigadors`
  (`id`,`orcid`,`renacyt`,`grupo`,`nivel`,`registro`,`rol`,`reconocimiento`,`contenido`,`ri`,`pibpdu`,
   `gadi`,`sei`,`gadd`,`gadit`,`dfi`,`condicion`,`semestresInvestigacion`,`createdAt`,`updatedAt`,`codigoDocente`)
SELECT
   `id`,`orcid`,`renacyt`,`grupo`,`nivel`,`registro`,`rol`,`reconocimiento`,`contenido`,`ri`,`pibpdu`,
   `gadi`,`sei`,`gadd`,`gadit`,`dfi`,`condicion`,`semestresInvestigacion`,`createdAt`,`updatedAt`,`codigoDocente`
FROM `xthansnv_pucp`.`docenteinvestigadors`;

-- docentecursos: la BD antigua tiene filas con id = 0 y sin PRIMARY KEY.
-- Se copia SIN el id para que la BD nueva genere ids limpios y únicos
-- (el modelo DocenteCurso usa `id` como PK autoincremental).
INSERT INTO `xthansnv_pucp2`.`docentecursos`
  (`fecha_inicio`,`fecha_fin`,`modalidad`,`tipo`,`tipo_clase`,`estado`,`horas_semana`,`horario`,
   `createdAt`,`updatedAt`,`codigoDocente`,`codigoCurso`)
SELECT
   `fecha_inicio`,`fecha_fin`,`modalidad`,`tipo`,`tipo_clase`,`estado`,`horas_semana`,`horario`,
   `createdAt`,`updatedAt`,`codigoDocente`,`codigoCurso`
FROM `xthansnv_pucp`.`docentecursos`;

-- docenteencuesta: en el dump original esta tabla está vacía (sin INSERT),
-- así que probablemente no copie ninguna fila. Se deja por completitud.
INSERT INTO `xthansnv_pucp2`.`docenteencuesta`
  (`id`,`fecha_inicio`,`fecha_fin`,`createdAt`,`updatedAt`,`codigoDocente`,`codigoEncuesta`,`codigoCurso`)
SELECT
   `id`,`fecha_inicio`,`fecha_fin`,`createdAt`,`updatedAt`,`codigoDocente`,`codigoEncuesta`,`codigoCurso`
FROM `xthansnv_pucp`.`DocenteEncuesta`;


-- ===========================================================================
-- 5. FIRMAS (depende de logins)
-- ===========================================================================
INSERT INTO `xthansnv_pucp2`.`firmas` (`id`,`firma`,`createdAt`,`updatedAt`,`idLogin`)
SELECT `id`,`firma`,`createdAt`,`updatedAt`,`idLogin` FROM `xthansnv_pucp`.`Firmas`;


-- Reactivamos la comprobación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;


-- ===========================================================================
-- 6. VERIFICACIÓN: comparar filas BD antigua vs BD nueva
-- ===========================================================================
SELECT 'docentes' AS tabla,
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Docentes`)      AS viejo,
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docentes`)     AS nuevo
UNION ALL SELECT 'docentecategoria',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`DocenteCategoria`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docentecategoria`)
UNION ALL SELECT 'docentegrados',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`DocenteGrados`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docentegrados`)
UNION ALL SELECT 'docentelaborals',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`DocenteLaborals`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docentelaborals`)
UNION ALL SELECT 'docenteinfos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`DocenteInfos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docenteinfos`)
UNION ALL SELECT 'docenteinvestigadors',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`docenteinvestigadors`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docenteinvestigadors`)
UNION ALL SELECT 'docentecursos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`docentecursos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`docentecursos`)
UNION ALL SELECT 'cursos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Cursos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`cursos`)
UNION ALL SELECT 'programas',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Programas`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`programas`)
UNION ALL SELECT 'plans',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Plans`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`plans`)
UNION ALL SELECT 'escuelas',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Escuelas`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`escuelas`)
UNION ALL SELECT 'facultads',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Facultads`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`facultads`)
UNION ALL SELECT 'departamentos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Departamentos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`departamentos`)
UNION ALL SELECT 'provincia',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Provincia`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`provincia`)
UNION ALL SELECT 'distritos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Distritos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`distritos`)
UNION ALL SELECT 'logins',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Logins`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`logins`)
UNION ALL SELECT 'firmas',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Firmas`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`firmas`)
UNION ALL SELECT 'afps',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`afps`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`afps`)
UNION ALL SELECT 'areas',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`areas`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`areas`)
UNION ALL SELECT 'bancos',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Bancos`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`bancos`)
UNION ALL SELECT 'nacionalidads',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Nacionalidads`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`nacionalidads`)
UNION ALL SELECT 'encuesta',
       (SELECT COUNT(*) FROM `xthansnv_pucp`.`Encuesta`),
       (SELECT COUNT(*) FROM `xthansnv_pucp2`.`encuesta`);


-- ===========================================================================
-- APÉNDICE (OPCIONAL): VACIAR LA BD NUEVA ANTES DE VOLVER A COPIAR
-- ---------------------------------------------------------------------------
-- ⚠️ BORRA DATOS. Úsalo solo si ya copiaste y quieres repetir la copia desde
-- cero (por ejemplo si la primera ejecución quedó a medias).
--
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE `xthansnv_pucp2`.`firmas`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docenteencuesta`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docentecursos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docenteinvestigadors`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docenteinfos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docentelaborals`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docentegrados`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docentecategoria`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`docentes`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`cursos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`programas`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`escuelas`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`distritos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`provincia`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`departamentos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`plans`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`facultads`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`logins`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`afps`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`areas`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`bancos`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`nacionalidads`;
-- TRUNCATE TABLE `xthansnv_pucp2`.`encuesta`;
-- SET FOREIGN_KEY_CHECKS = 1;
-- ===========================================================================
