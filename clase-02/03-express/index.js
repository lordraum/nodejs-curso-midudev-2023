// Express => Framework más utilizado para hacer aplicaciones web, apis, etc con nodejs.

// Instalación => npm i express -E
// La flag -E es para que no coloque el caret ^

const express = require('express')
const app = express()
app.disable('x-powered-by')
const ditto = require('./pokemon/ditto.json')
const PORT = process.env.PORT ?? 3000

// middleware nativo para json de express

app.use(express.json())

// middleware
/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request
    req.body = data
    next()
  })
}) */

app.get('/', (req, res) => {
  res.send('<h1>Mi página</h1>')
})

app.get('pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1>')
})

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

// Ejecutar diferentes acciones con el script dev del package.json => "dev:1"

// Express está más enfocado en las rutas

// Manejar Peticiones en express
// Los verbos de las peticiones funcionan cómo métodos de express
// app.get('PATH', (cb))
// cb => req, res

// Respuestas en express
// Las diferentes partes de la respuesta se van encadenando con el punto
// Ejemplo res.status(200).send('<h1>Mi página</h1>')

// El listen del puerto es igual que en el módulo http

// Detección automática de la cabecera content-type
// En muchos casos express detecta de forma automática el tipo de contenido

// Problema cabecera X-Powered-By-Express
// Tiene problemas de seguridad
// Desactivar => app.disable('x-powered-by')

// 404 en express
// Se utiliza el método app.use((req, res) => {} ) => Se debe usar al final de las otras rutas
// Este sería la respuesta por default al no existir la ruta solicitada

// Middlewares
// Acciones que se realizan previo a procesar la petición, es decir, es una funci´n que se ejecuta entre la petición y la respuesta.
// Ejemplos: extraer cookies, validar usuarios, extraer data de un json.
// Método next() Se indica para que continúe con el procesamiento de la petición después de realizar el middleware => Es obligatorio
// Las middlewares se pueden utilizar para todas las peticiones o para las peticiones que le indiquemos (Puede se según el método, el path, etc)
// Parámetros
// ruta (opcional), req, res, next

// Middlewares de express
// Express cuenta con middlewares ya incorporados en su core
// ejemplo app.use(express.json())
