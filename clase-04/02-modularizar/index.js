import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter)

app.listen(PORT, () => console.log(`Aplicación lanzada en http://localhost:${PORT}`))

// https://youtu.be/ev3Yxva4wI4?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=831

// Pasar de CJS a ESM
// package.json => después de main => "type": "module",
// Con ESM las extensiones de archivo son obligatorias

// ESM => Importar JSON

// Sintáxis en desuso => import file from './file.json' assert { type: 'json'}
// Funciona a día de hoy, pero dejara de funcionar

// Sintáxis definitiva => with en lugar de assert
// A día de hoy esta sintáxis no está funcionando

// Solución con fs
// importar fs => JSON.parse => readFileSync => archivo json

// Solución recomendada, utilizando require en EMS
// Importar createRequire desde node:module => require sería igual a => createRequire(import.meta.url) => osea la dirección del archivo actual
// Utilizar require

// ---------

// Rutas

// Crear carpeta routes => Cada endpoint será una ruta => ejemplo movies.js

// Express Router
// import { Router } from 'express'
// Sirve para redirigir todos los endpoints de determinado path, ejemplo /movies en la app
// En la ruta routerName.get(...)
// En la app app.use('/path-name', routerName)
