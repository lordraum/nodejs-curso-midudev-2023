const { readdir } = require('node:fs')

readdir('.', (err, files) => {
    if (err) console.log('Escribe un directorio válido')
    else files.forEach(x => console.log(x));
})