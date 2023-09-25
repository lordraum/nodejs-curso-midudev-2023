console.log(process.argv)

process.on('exit', () => {
  // Hacer algo
})

console.log(process.cwd())

// .env => Variables de entorno =>
// console.log(process.env.PEPITO)
// Ejecutar => PEPITO=hola node index => output = hola
