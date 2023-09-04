const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')
const app = express()
const PORT = process.env.PORT ?? 3000

const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

app.disable('x-powered-by')
app.use(express.json())

// CORS middlewar
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

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    // header que soluciona CORS
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.json(movies)
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

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

/* app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, DELETE')
  }
  res.send(200)
}) */

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

// librería servor => Crea un servidor especificando una carpeta que aloja una web

// Error CORS => Mecanismo del cliente (navegador) que restringe un recurso según su origen
// => Verifica que el dominio está autorizado para acceder a la API => Solución añadir cabecera
// => El navegador envía la cabecera origin solmante en el caso de que no coincidan los dominios

// CORS Es más complicado dependiendo del método

// Métodos normales => GET/HEAD/POST

// Métodos complejos =>   PUT/PATCH/DELETE/
// => CORS PRE-FLIGHT => OPTIONS => petición especial previa a PUT/PATCH/DELETE
