const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const app = express()
const { validateMovie } = require('./schemas/movies')
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(express.json())

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(x => x.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  // if (!result.success) { => También es válido el método success
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) }) // Puede también ser error 422
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // Esto no sería REST porque se estaría guardando el estado en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    /* const filteredMovies = movies.filter(movies => movies.genre.includes(genre)) */
    const filteredMovies = movies.filter(movies => movies.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    return filteredMovies.length > 0 ? res.json(filteredMovies) : res.json('Género inexistente')
  }
})

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

// Validación de datos

// Librería zod => nom i zod -E / const z = require('zod')
// z.object({}) => Onjeto con esquema de los datos a recibir y sus validaciones => dato: z.tipoDeDato({ errores })
// zod realiza validaciones en cadena => ejemplo number, int, rango de número
// z.enum => Lista de opciones que pueden tener de valor las propiedades
// Método safeParse => Valida un objeto y lo agrega al body => devulve .error o .data
// Valor por defecto .default(value)
// Optional => .optional()
// null => .null()
// La aplicación trabaja con el mínimo de requerimientos establecidos, si hay una propiedad que sobr enviada desde el cliente, no la tiene en cuenta.
