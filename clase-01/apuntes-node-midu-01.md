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

## Proccess / env

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

### .env
Variables de entorno
```js
console.log(process.env.PEPITO)
// Ejecutar => PEPITO=hola node index => output = hola
```

### dotenv
Librería para trabajar con las variables de entorno.

- Carga las variables que deseemos en el proceso global `proccess.env`
- Instalar `npm i dotenv`
- Crear archivo .env en el root y agregar las variables --> Ejemplo `PORT=3000`
- Importar y cargar `import dotenv from 'dotenv'` `dotenv.config()` (Al inicio)
- Uso de las variables de entorno `procces.env.PORT`

```js
// Archivo .env
// PORT=3000

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
```

### current working directory --> .cwd
Muestra la carpeta desde dónde se ejecuta el proceso


## picocolors

Permite cambiar el color a los outputs de la consola.

```js
// install npm i picocolors
const pc = require('picocolors')

const mensajes = ['Bien Hecho!!', 'Lo puedes hacer mejor']

console.log(pc.red(mensajes[0]))
console.log(pc.blue(mensajes[1]))

```

## standard (configuración eslint)

Librería para utilizar es-lint

```json
// npm i standard -D

// Al final del package.json

"eslintConfig": {
    "extends": "standard"
  }

// => Activar el format on save en VsCode
```

## HTTP Server

`http.createServer()` --> Crea un servidor para procesar solicitudes http.

- Parámetros --> Petición (req) --> Procesa la petición | respuesta (res) --> Procesa la respuesta
- `res.end()` --> Envía la respuesta
-  `res.listen()` --> Lanza el servidor en el puerto indicado

```js
const http = require('http')

const PORT = 3001

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('<h1>Hello world</h1>')
})

server.listen((3001), () => console.log(`Servidor lanzado en http://localhost:${PORT}`))
```

### Truco para que siempre utilice un puerto vacío

Utilizar puerto cero (0), para acceder al puerto al que se conectó http --> `server.address().port`

```js
server.listen(0, () => console.log(`Servidor lanzado en http://localhost:${server.address().port}`))
```
    
 





