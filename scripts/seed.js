require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

async function main() {
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
    connectTimeout: 15000
  });

  try {
    await connection.query(schema);
    console.log('Esquema y catálogo de demostración cargados correctamente.');
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error('No se pudo preparar la base de datos:', error.message);
  process.exitCode = 1;
});
