const { readFile } = require('node:fs/promises')

// esm => se puede utilizar async await de forma tradicional, es decir, en el cuerpo del archivo (top level await)

//cjs => Se puede utilizar async await con una función autoinvocada (IIFE => Inmediately Invocated Function Expression)
    // Importante utilizar ; antes de la función autoinvocada, sino js piensa que require es una función

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