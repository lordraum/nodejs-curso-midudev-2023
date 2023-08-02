const fs = require('node:fs/promises')

// Ejecución asíncrona => cb

/* console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => console.log('primer texto:', text))

console.log(' ---> Hacer algo mientras termina de leer el archivo')

console.log('Leyendo el segundo archivo')
fs.readFile('./archivo-2.txt', 'utf-8', (err,text) => console.log('primer texto:', text)) */

// Ejecución asíncrona => promesas

console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => console.log('primer texto:', text))

console.log(' ---> Hacer algo mientras termina de leer el archivo')

console.log('Leyendo el segundo archivo')
fs.readFile('./archivo-2.txt', 'utf-8')
    .then(text => console.log('primer texto:', text))

// Muchos modulos vienen con la opción de utilizar /promises, pero en el caso de que no la tenga se puede hacer con el módulo promisify
    // 