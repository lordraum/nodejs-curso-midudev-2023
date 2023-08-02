// Process => Objeto global con información y sobre el proceso en ejecución, así como métodos para realizar tareas con este

// Método .argv 
    // => posición[0] directorio de node
    // => posición[1] fichero ejecutado
    // => De ahí en adelante => Accede a todos los argumentos de entrada 

console.log(process.argv)

// .exit => Controla la salida del proceso => 0 correcto => 1 ha habido errores
// process.exit(1)

// .on => Escucha y controla eventos del proceso => exit, err, etc

process.on('exit', () => {
    // limpiar los recursos
})

// current working directory => .cwd => Carpeta desde dónde se ejecuta el proceso

//console.log(process.cwd())

// .env => Variables de entorno =>
console.log(process.env.PEPITO)
// Ejecutar => PEPITO=hola node index => output = hola

