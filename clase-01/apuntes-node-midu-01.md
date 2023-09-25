# Apuntes nodejs curso midudev clase 01

## Objeto global

### globalThis

Objeto global de todos los entornos js (navegador, node, etc). Reemplaza en el navegador *window* y en node *global*

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

Para importar modulos nativos es recomendable utilizar el prefijo 'node:modulename' --> `import fs from 'node:fs'`

## Common js
Sistema clásico de módulos de nodejs (default).

### Exportar
`module.exports = foo`<br>
`module.exports = {foo1, foo2}`

### Importar
`const foo = require('./path')`<br>
`const {foo1, foo2} = require(./path)`

## EcmaScript Modules
Sistema de módulos de la plataforma, sistema de módulos moderno de nodejs (por defecto en el navegador). ESM es el módulo aconsejado para utilizar en nodejs a día de hoy.

### Exportar

#### export
`export const sum = (a, b) => a + b`

#### export default
`export default const sum = (a, b) => a + b`<br>
`export default sum`

### import
`import { sum, sub, mult } from './sum.mjs'`
`import suma from => './sum.mjs'`

Con *export default* No es posible usar destructuring, el código exportado se puede nombrar como se desee.

## Filesystem
Es uno de los modulos más importantes en nodejs, contiene información para trabajar archivos.

*Archivo => './06-modulos-nativos/fs.js'*

### importar fs
`const fs = require('node:fs')` --> síncrono<br>
`const fs = require('node:fs/promises')` --> asíncrono

### statSync('path')
Carga un archivo para mostrar infromación acerca de este.<br>
`const stats = fs.statSync('./archivo.txt')` 
--> `stats.isFile()` --> Si es archivo o no

### readFileSync() readFile
Lee archivos

#### De forma síncrona
const text = fs.readFileSync('./archivo', 'codificación')

*Archivo => './06-modulos-nativos/fs.js'*

#### De forma asíncrona --> cb
`fs.readFile('archivo', 'codificación', (cb))`<br>
callback --> `(err, item) => foo(item)`

#### De forma asíncrona --> promesas
`fs.readFile('file, 'cod).catch.then'`

*Archivo => './08-async-await/index.js'*

#### De forma asíncrona --> async await
Se puede utilizar async await con una función autoinvocada (IIFE => Inmediately Invocated Function Expression). En cjs hay que utilizar `(;)` antes de utilizar la IIFE, en esmno es necesario el `(;)`
- `async foo {await readFile() --> lógica}`

```js
// Estructura de IIFE
;(
  async () => {
    await...
  }
)()
```
#### De forma asíncrona --> Promise.all()
Resuelve un array de promesas. En el .then se nombran las diferentes variables de cada promesa.

```js
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer texto', text)
  console.log('segundo texto', secondText)
})
```

## path

Módulo nativo que trabaja con las rutas en nodejs. En node las rutas se "unen" no se "crean". Los SO tienen diferentes barras para separar directorios

### Unir rutas
Con `path.join` se establece cada parte del path sin necesidad de utilizar las barras.

```js
const filePath = path.join('content', 'subfolder', 'test.txt')
```

### Obteneer nombre de archivo
`basename` => obtiene el nombre de archivo de una ruta dada, El 2do parámetro sirve para omitir parte del nombre del archivo, ej la extensión.

```js
const base = path.basename('/tmp/files/file.txt')
const filename = path.basename('/tmp/files/file.txt', '.txt')
```
### Obtener extensión del archivo
`extname`

```js
const extension = path.extname('/tmp/files/file.txt')
```

## os
Módulo con información acerca del sistema operativo

```js
console.log('SO', os.platform())
console.log('SO Version', os.release())
console.log('Arquitectura', os.arch())
console.log("CPU's", os.cpus())
console.log('memoria libre', os.freemem() / 1024 / 1024)
console.log('memoria total', os.totalmem() / 1024 / 1024)
console.log('tiempo encendido', os.uptime() / 60 / 60)
```

## Proccess

Objeto global del proceso en ejecución, Contiene información, herramientas acerca del proceso global.

### .argv
Devuelve los argumentos del comando ejecutado en la consola

### .exit

Controla la salida del proceso --> 0 correcto --> 1 ha habido errores --> Ejemplo `process.exit(1)`

### .on 
Escucha y controla eventos del proceso => exit, err, etc => ej: process.on('exit', cb)

```js
process.on('exit', () => {
  // Hacer algo
})
```

### current working directory --> .cwd
Muestra la carpeta desde dónde se ejecuta el proceso

### .env
Variables de entorno
```js
console.log(process.env.PEPITO)
// Ejecutar => PEPITO=hola node index => output = hola
```




