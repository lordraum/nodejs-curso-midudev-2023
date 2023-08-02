// ES modules => sistema moderno de módulos de nodejs (por defecto en el navegador)

// exportar => export / export default
// importar => import { foo } from 'PATH'

import { sum, sub, mult } from "./sum.mjs";

const numbers = [4, 7]

console.log(sum(numbers[0], numbers[1]))
console.log(sub(numbers[0], numbers[1]))
console.log(mult(numbers[0], numbers[1]))

// ESM es el módulo aconsejado a utilizar a día de hoy
