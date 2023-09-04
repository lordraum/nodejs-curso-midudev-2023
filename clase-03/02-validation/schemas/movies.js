const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title debe ser de tipo string',
    required_error: 'El título de la pelíclua es un dato boligatorio'
  }),
  year: z.number().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: 'Debes especificar una url válida'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Thriller', 'Sci-Fi', 'Romance', 'Crime']),
    {
      invalid_type_error: 'Escribiste mal',
      required_error: 'Dato requerido'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

module.exports = {
  validateMovie
}
