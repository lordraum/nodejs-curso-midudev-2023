# Apuntes nodejs curso midudev clase 01

## Objeto global

### globalThis

- globalThis Objeto global de todos los entornos js (navegador, node, etc)
- Reemplaza a: navegador => window | node => global

`console.log(globalThis)`

Lo correcto en el entorno node es siempre utilizar globalThis y no global

## Sistemas de módulos node js

### Patrón de diseño módulo

Separa la aplicación en diferentes partes que se usarán por medio de la importación y exportación.

Los sistemas de módulos en nodejs son **CommonJS** (cjs) y **ES Modules** (esm)

### Extensiones de archivos js en node
- .js => por defecto utiliza cjs
- .mjs => para utilizar esm
- .cjs => para utilizar mjs

Utilizando la extensión mjs se puede utilizar import en lugar de require

En ES Modules es obligatorio utilizar en los import la extensión => ej: archivo.js, en cjs se considera buena práctica.

Para importar modulos nativos es recomendable utilizar el prefijo 'node:modulename' => `import fs from 'node:fs'`

## Common js
Sistema clásico de módulos de nodejs (default).

### Exportar
`module.exports = foo` | `module.exports = {foo1, foo2}`

### Importar
`const foo = require('./path')` | `const {foo1, foo2} = require(./path)`

## EcmaScript Modules
Sistema de módulos de la plataforma, sistema de módulos moderno de nodejs (por defecto en el navegador). ESM es el módulo aconsejado para utilizar en nodejs a día de hoy.

### Exportar

#### export
`export const sum = (a, b) => a + b`

#### export default
- `export default const sum = (a, b) => a + b`
- `export default sum`

### **import**
`import { sum, sub, mult } from './sum.mjs'`
`import suma from => './sum.mjs'` No es posible usar destructuring, el código exportado se pude nombrar como se desee.


