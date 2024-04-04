# API REST

Conjunto de reglas que facilitan la comunicación de sistemas a través de HTTP y sus verbos, sin utilizar estado, es decir, que en cada solicitud está la información necesaria para comprenderla y procesarla.

## Características de una API REST

### Recursos

Cada recurso se identifica con una URL.

### Verbos HTTP

Definen las operaciones que se pueden hacer con los recursos.

### Separación de conceptos

Autonomía entre cliente y servidor, de esta forma evolucionan independientemente.

### Representaciones

El cliente podrá decidir en que formato recibirá la información.

### Sin estado

El cliente debe enviar toda la información necesaria para procesar la respuesta.

## Request Params

Especificar en el path --> `app.get('/movies/:id', (req, res)...`

Acceder --> `const { id } = req.params`

```js
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  // Acceder a  la película solicitada según el id enviado por el cliente
  const movie = movies.find(movie => movie.id === id)
  return !movie
    ? res.status(400).json({ message: 'movie not found' })
    : res.json(movie)
})
```
## Solicitud post

- Acceder a la data de req.body
- Recopilar la data de req.body + la data adicional (Ej --> id)
- Enviar

```js
app.post('/movies', (req, res) => {
 const {
  title,
  genre,
  year,
  duration,
  rate,
  poster 
 } = req.body

 const newMovie = {
  id: crypto.randomUUID(),
  title,
  genre,
  year,
  duration,
  // Dato opcional
  rate: rate ?? 0,
  poster
 }

 // Esto no es REST porque guarda el estado en la API
 movies.push(newMovie)
 res.status(201).json(newMovie)
})
```

## PATCH
- Se accede a los campos actualizados con req.body
- Si el id está como parámetro se accede por medio de req.params
- Encontrar con find() o findIndex() el registro a actualizar según id (en este caso).
- Evaluar si se encuentra el registro
- Reemplazar (asignar) campos actualizados en registro --> por medio de spreas operator o Objects.assign()
- Enviar data en formato JSON

```js
app.patch('/movies/:id', (req, res) => {

  const updateFields = (req.body)
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  
  if (movieIndex === -1) {
    res.status(404).json({ error: 'Película no encontrada' });
  }
  
  const updateMovie = {
    ...movies[movieIndex],
    ...updateFields
  }

  // Esto no es rest
  movies[movieIndex] = updateMovie

  res.json(updateMovie)
})

/*
// find en lugar findIndex
const movieToUpdate = movies.find(movie => movie.id === id)

// Object.assign en lugar del spread operator
Object.assign(movieToUpdate, updatedFields)
    res.status(200).json(movieToUpdate)
*/
```

## Error CORS

Es el qué sucede cuando se intenta acceder desde una url que no es la misma del servidor, para solucionarlo se utiliza el siguiente middleware:

```js
app.use((req, res, next) => {
  const origin = req.get('Origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
})
```

## Zod

Módulo para la validación de datos del cliente a través de esquemas.

`import { z } from 'zod'`

### Creación esquema de validación

`const movieSchema = z.object({fields})`

Librería que facilita la validación de campos, utiliza la sintaxis del punto con encadenamiento para las validaciones. --> `year: z.number().int().min(1900).max(2024)`

Se puede añadir mensajes

```js
 title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
```

### Enums

El enum indica una lista de posibles 'items' validos en el array que llegará desde el cliente.

```js
genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
```

Ejemplo con campos para crear un usuario

```js
const userSchema = z.object({
  username: z.string({
    required_error: 'Username is required.'
  }),
  email: z.string().email(),
  age: z.number().int().min(18),
  isAdmin: z.boolean().default(false)
})
```

### validar esquema

```js
function validateMovie (input) {
  return movieSchema.safeParse(input)
}
// Valida que todos los datos se cumplan --> POST - PUT

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}
// Valida los datos que lleguen --> PATCH

module.exports = {
  validateMovie,
  validatePartialMovie
}
```

## Diferencia entre PATCH y PUT

PUT reemplaza todo un registro, en cambio POST un parcial o completo
