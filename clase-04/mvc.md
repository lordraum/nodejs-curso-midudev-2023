# MVC

Modelo Vista Controlador.

## ¿Qué es MVC?

Arquitectura que proporciona una estructura que obliga a utilizar y separar 3 los 3 componentes esenciales de la aplicación --> `Modelo, Vista, Controlador`

## Módelo

Representa La lógica y estructura de datos del negocio. Accede a BBDD, Actualiza la info, verifica integridad de la data, etc.

## Controlador

Actúa como intermediario entre el modelo y la vista, administrador de la aplicación, gestionar los inputs del usuario.

## Vista

Interactúa con el usuario, representa la interfaz, representa los datos, envía las acciones.

### Interacción entre los componentes MVC

- El controlador inicia la vista
- El modelo envía los datos al controlador
- La vista Utiliza los datos del controlador, para enviar una interfaz de usuario.
- La vista no tiene acceso directo al modelo

## Pasos previos antes de implementar MVC

### Deploy en f10.com

['f10'](https://fl0.com)

- Crear repositorio er github y clonar en local.
- Crear script start en package.json
- Es importante que constantes como el puerto sean variables de entorno, que establecerá el servicio dónde se hara el despliegue, las variables de entorno siempre son en mayúscula.
- Hacer commit y push

- En Fl0
  - Deploy code with github
  - Escoger repositorio --> Hacer Deploy

### Modularizar

#### Pasar módulo de de CJS a ESM

`package.json => después de main => "type": "module"`

Con ESM las extensiones de archivo son obligatorias --> ejemplo `import { movies } from 'movies.js'`

 #### ESM --> Importar JSON

```js
// utils.js
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
```

*utils.js*

Archivo dónde se guardan funciones js, que no hacen parte de la arquitectura o patrón de diseño.

#### middlewars

Carpeta dónde se guardaran los middlewares qué necesitan configuración ejemplo `cors`

```js
// /middlewars/cors.js

import cors from 'cors'

// Será pasado cómo valor por defecto en el input
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
```

## Rutas

Crear carpeta routes --> Cada endpoint será una ruta --> ejemplo movies.js

### Express Router

Define cómo se manejarán las solicitudes entrantes para cada endpoint. Facilita la modularidad del código al dividir la lógica de manejo de rutas en archivos separados.

Crear --> `routes/movies.js` --> para manejar el endpoint `/movies`

A este archivo se pasarán todas las peticiones de `/movies` y se cargarán todo lo necesario para que funcionen.

El path a utilizar es `/`. En el js principal de la app se establecerá la ruta que se asociará a este archivo `/movies`

```js

// routes/movies.js

import { Router } from 'express' // importar express router
import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export const moviesRouter = Router() // Instanciar express router
const movies = readJSON('./movies.json')

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// app.js

import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js' // Importar ruta
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter) // Activa la ruta, estableciendo el endpoint

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

```

## Implementar MVC

Crear carpetas controllers, models y views.

### Crear modelos

- Los arrchivos para los modelos modelos se nombran en singular --> `movie.js`
- Crear y exportar clase del modelo --> ejemplo --> MovieModel
  - Crear los métodos que manejaran la lógica para la solicitud de datos.
     - Deben ser estáticos y asíncronos --> ejemplo --> getByGender --> input --> gender 
    - Realizar la lógica que interactúa con la data => Ejemplo filtrar películas según el género

*El modelo también se podría manejar con una función, pero la clase facilita la uitlización del tipado con typescript*

```js
export class MovieModel {

  static async getByGenre ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies  }

    static async create ({ input }) {
      const newMovie = {
      id: randomUUID(),
      ...input
      }
    }
  
}
```

Se suele usar objetos en el input para extenderlos, sobre todo con js, con ts no es tan necesario. Ejemplo --> `({ id, input})`

### Cargar modelo en ruta

En la ruta seimplementará el método correspondiente del modelo se validarán los inputs del usuario y se manejarán las excepciones.

Los métodos de los verbos deben ser asíncronos.

Hay que tener en cuenta que la lógica en el módelo puede ser diferente si es en local, mongoDB, SQL, etc. Por tal motivo es importante separarla de la ruta.

```js
import { MovieModel } from '../models/movie.js'

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getByGenre({ genre })
  res.json(movies)
})

moviesRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
  // También podría ser 422
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = await MovieModel.create({ input: result.data })

  res.status(201).json(newMovie)
})
```

<!-- https://youtu.be/ev3Yxva4wI4?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=3582 -->
