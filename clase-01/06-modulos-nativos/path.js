const path = require('node:path')

// Trabaja con las rutas en nodejs
// En node las rutas se "unen" no se "crean"
// Los SO tienen diferentes barras para separar directorios

// Unir rutas => con path.join se establece cada parte del path sin necesidad de utilizar las barras

const filePath = path.join('content', 'subfolder', 'test.txt')

console.log(filePath)

// basename => obtiene el nombre de archivo de una ruta dada
// El 2do parámetro sirve para omitir parte del nombre del archivo, ej la extensión.

const base = path.basename('/tmp/files/file.txt')

const filename = path.basename('/tmp/files/file.txt', '.txt')


// extname => extensión del archivo

const extension = path.extname('/tmp/files/file.txt')

console.log(base, filename, extension)