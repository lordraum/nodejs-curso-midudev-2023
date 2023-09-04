const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const app = express()
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
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
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
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

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

// Actualizar registro

// => app.patch
// partial() => Vuelve opcionales cada una de las propiedades
// usar => ejemplo => movieSchema.partial().safeParse(input)

// Diferencias entre post, put y patch

// Idempotencia => Propiedad de realizar una acción determinada varias veces y aún así conseguir siempre el mismo resultado que se obtendría al hacerlo una vez
// ejemplo => Las funciones puras son idempotentes

// Propósitos de post, put y patch

// POST => Crear nuevo elemento/recurso en el servidor
// path => /movies
// No es idempotente, porque siempre creará un nuevo recurso

// PUT => Actualizar registro totalmente o crearlo si no existe =>
// path => movies/123-456-789
// Si es idempotente porque así se pasan los mismos datos no creará un recurso nuevo

// PATCH => Actualizar parcialmente un elemento o recurso
// path => movies/123-456-789
// Normalmente es idempotente excepto en campos tipo 'updateAt'
