// common js sistema clásico de módulos de nodejs (por defecto)

// exportar => module.exports = foo
// importar => const foo = require(PATH)

//const sum = require('./sum')
const { sum } = require('./sum')

const result = sum(3, 5)

console.log(result)