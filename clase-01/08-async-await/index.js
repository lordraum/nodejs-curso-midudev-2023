const { readFile } = require('node:fs/promises')

// Se puede utilizar async await con una función autoinvocada (IIFE => Inmediately Invocated Function Expression)

// cjs => Hay que utilizar (;) antes de utilizar la IIFE
// esm => Sin ;

;(
  async () => {
    console.log('Leyendo el primer archivo')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('primer texto:', text)

    console.log(' ---> Hacer algo mientras termina de leer el archivo')

    console.log('Leyendo el segundo archivo')
    const secondText = await readFile('./archivo-2.txt', 'utf-8')
    console.log('segundo texto:', secondText)
  }
)()
