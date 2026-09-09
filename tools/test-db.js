// tools/test-db.js — Diagnóstico de conexión a la BD.
// Muestra qué configuración usará la app (desde .env / variables del entorno)
// e intenta conectar a MySQL. Útil para depurar despliegues (Banahosting, etc.).
// Uso (en el servidor, dentro de la carpeta de la app):
//   node tools/test-db.js
const sequelize = require('../config/database');
const config = require('../config');

function mask(v) {
  return v ? v.replace(/./g, '*') : '(vacío)';
}

console.log('=== Configuración que usará la app ===');
console.log('PORT        :', config.port);
console.log('BASE_PATH   :', config.basePath);
console.log('DB_HOST     :', process.env.DB_HOST || 'localhost');
console.log('DB_PORT     :', process.env.DB_PORT || 3306);
console.log('DB_NAME     :', process.env.DB_NAME || 'pucp');
console.log('DB_USER     :', process.env.DB_USER || 'root');
console.log('DB_PASSWORD :', mask(process.env.DB_PASSWORD));
console.log('DB_SYNC     :', config.dbSync);
console.log('JWT_SECRET  :', config.jwtSecret ? '(definido)' : '(vacio -> usa secretkey)');
console.log('');
console.log('Si ves DB_USER=root y DB_PASSWORD=(vacío), el .env NO se está leyendo.');
console.log('');

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa.');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ Error de conexión:', err.message);
    process.exit(1);
  });
