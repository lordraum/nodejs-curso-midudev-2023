// fs => filesystem => Es uno de los modulos más importantes en nodejs

const fs = require('node:fs')

// Información sobre archivos
// De forma síncrona

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // Si es archivo
  stats.isDirectory(), // Si es carpeta
  stats.isSymbolicLink(), // Si es un enlace simbólico
  stats.size // tamaño en bytes
)

// Leer archivos
// De forma síncrona
// readFileSync() => archivo, codificación
// De forma asíncrona
// readFile() => archivo, codificación, cb
// cb => err, variable

// Síncrono
const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log('Leyendo el primer archivo')
console.log(text)

const text2 = fs.readFileSync('./archivo-2.txt', 'utf-8')

console.log('Leyendo el segundo archivo')
console.log(text2)

// Asíncrono => En carpeta cb-promesas
