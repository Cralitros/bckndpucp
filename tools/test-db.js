// tools/test-db.js — Diagnóstico de conexión a la BD.
// Muestra qué configuración usará la app (desde .env / variables del entorno),
// comprueba si la base de datos existe en el servidor MySQL e intenta conectar.
// Útil para depurar despliegues (Banahosting, cPanel, etc.).
//
// NOTA: Sequelize NUNCA crea la base de datos; solo crea tablas dentro de una
// BD existente. La BD debe crearse en cPanel -> MySQL Databases.
//
// Uso (en el servidor, dentro de la carpeta de la app):
//   node tools/test-db.js
const mysql = require('mysql2/promise');

function mask(v) {
  return v ? v.replace(/./g, '*') : '(vacío)';
}

function env(k, dflt) {
  return process.env[k] || dflt;
}

const HOST = env('DB_HOST', 'localhost');
const PORT = Number(env('DB_PORT', 3306));
const NAME = env('DB_NAME', 'pucp');
const USER = env('DB_USER', 'root');
const PASS = process.env.DB_PASSWORD || '';

console.log('=== Configuración que usará la app ===');
console.log('PORT        :', env('PORT', 3000));
console.log('BASE_PATH   :', env('BASE_PATH', ''));
console.log('DB_HOST     :', HOST);
console.log('DB_PORT     :', PORT);
console.log('DB_NAME     :', NAME);
console.log('DB_USER     :', USER);
console.log('DB_PASSWORD :', mask(PASS));
console.log('DB_SYNC     :', env('DB_SYNC', 'none'));
console.log('');
console.log('Si ves DB_USER=root y DB_PASSWORD=(vacío), el .env NO se está leyendo.');
console.log('');

(async () => {
  try {
    // 1) Conectar al servidor MySQL SIN seleccionar BD (solo valida credenciales)
    const conn = await mysql.createConnection({ host: HOST, port: PORT, user: USER, password: PASS });
    console.log('✅ Credenciales de MySQL válidas (conexión al servidor OK).');

    // 2) ¿Existe la base de datos?
    const [rows] = await conn.query(
      'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
      [NAME]
    );
    if (rows.length === 0) {
      console.log(`❌ La base de datos '${NAME}' NO existe en el servidor.`);
      console.log('   Créala en cPanel -> MySQL Databases -> "Create New Database".');
      console.log('   Luego añade el usuario a esa BD con TODOS los privilegios:');
      console.log('   cPanel -> MySQL Databases -> "Add User To Database".');
      await conn.end();
      process.exit(1);
    }
    console.log(`✅ La base de datos '${NAME}' existe.`);

    // 3) ¿Puede el usuario usar esa BD? (SELECT 1 sobre ella)
    try {
      await conn.changeUser({ database: NAME });
      const [ok] = await conn.query('SELECT 1+1 AS r');
      console.log(`✅ Conexión a '${NAME}' con el usuario '${USER}' exitosa.`);
      console.log('   La app ya puede arrancar (las tablas se crean/sincronizan con DB_SYNC).');
      await conn.end();
      process.exit(0);
    } catch (e) {
      console.log(`❌ El usuario '${USER}' NO puede usar la BD '${NAME}': ${e.code || e.message}`);
      console.log('   En cPanel -> MySQL Databases -> "Add User To Database",');
      console.log('   selecciona la BD y el usuario y marca ALL PRIVILEGES.');
      await conn.end();
      process.exit(1);
    }
  } catch (err) {
    console.log('❌ No se pudo conectar al servidor MySQL:', err.code || err.message);
    console.log('   Revisa DB_HOST, DB_USER y DB_PASSWORD en el .env del servidor.');
    process.exit(1);
  }
})();
