const { readFile } = require('node:fs/promises')

// Asíncrono en paralelo
// Promise.all()
// array de promesas
// .then
// acción por cada promesa

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer texto', text)
  console.log('segundo texto', secondText)
})
