// Process => Objeto global del proceso en ejecución
// Contiene => info, hearramientas

// Método .argv => Devuelve los argumentos del comando ejecutado en la consola

console.log(process.argv)

// .exit => Controla la salida del proceso => 0 correcto => 1 ha habido errores
// process.exit(1)

// .on => Escucha y controla eventos del proceso => exit, err, etc => ej: process.on('exit', cb)

process.on('exit', () => {
  // limpiar los recursos
})

// current working directory => .cwd => Carpeta desde dónde se ejecuta el proceso

// console.log(process.cwd())

// .env => Variables de entorno =>
console.log(process.env.PEPITO)
// Ejecutar => PEPITO=hola node index => output = hola
