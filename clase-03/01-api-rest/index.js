const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(express.json())

/* app.get('/movies', (req, res) => {
  res.json(movies)
}) */

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(x => x.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

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
    // rate es un dato opcional
    rate: rate ?? 0,
    poster
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

// Endpoint => path donde se accede a un recurso

// Parámetros url
// => site/:x => const x = req.params.x
// => site/:x/:y => const {x, y} = req.params

// path-to-regexp
// => En lugar del path se puede utilizar una expresión regular para filtrar recursos
// => Esta librería convierte url's complicadas en regexp => viene incorporada con express

// query string => Filtro que se pasa en la url => movies?genre=Terror
// req.query => recupera la query string de una url

// https://youtu.be/-9d3KhCqOtU?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=1968

// El recurso debe ser el mismo independientemente del verbo => ejemplo : /movies, no /create-movies

// Biblioteca nativa crypto => Crea id únicas => id: crypto.randomUUID => Esta biblioteca hace parte de la plataforma (Navegador)
