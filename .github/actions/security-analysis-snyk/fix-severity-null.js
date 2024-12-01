const fs = require('fs');

// Función para actualizar el campo "security-severity"
function updateSecuritySeverity(fileName) {
  try {
    // Leer el archivo sarif
    const data = fs.readFileSync(fileName, 'utf8');
    const json = JSON.parse(data);

    // Actualizar campos
    const updatedJson = JSON.stringify(
        json,
        (key, value) => {
          if (key === 'security-severity' && value === "null" ) {
            return "1"; 
          }
          if (key === 'cvssv3_baseScore' && value === null) {
            return 1; 
          }
          return value;
        },
        2 
      );

    // Sobrescribir el archivo original
    fs.writeFileSync(fileName, updatedJson, 'utf8');
    console.log(`Archivo actualizado correctamente: ${fileName}`);
  } catch (error) {
    console.error('Error procesando el archivo JSON:', error.message);
  }
}

// Obtener el nombre del archivo desde los argumentos de línea de comandos
const fileName = process.argv[2];

if (!fileName) {
  console.error('Por favor, proporciona el nombre del archivo JSON como parámetro.');
  process.exit(1);
}

// Llamar a la función
updateSecuritySeverity(fileName);
