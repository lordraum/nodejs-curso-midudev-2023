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

// https://youtu.be/ev3Yxva4wI4?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=2172

// Arquitectura MVC => Modelo Vista Controlador

// ¿Porqué usar MVC?
// Express está muy pensado para utilizar MVC
// MVC es una arquitectura muy utilizada en múltiples lenguajes de programación y frameworks

// ¿Qué es MVC?
// Arquitectura que proporciona una estructura que obliga a utilizar y separar 3 los 3 componentes esenciales de la aplicación => Modelo, Vista, Controlador

// Módelo
// Representa La lógica y estructura de datos del negocio.
// Procedimientos del modelo.
// => Acceder a BBDD, Actuailizar info, verificar integridad de la data, etc.

// Controlador
// Actúa como intermediario entre el modelo y la vista, administrador de la aplicación, gestionar los inputs del usuario.

// Vista
// Interactúa con el usuario, representa la interfaz, representa los datos, envía las acciones

// Interacción entre los componentes MVC
// El controlador inicia la vista
// El modelo envía los datos al controlador
// La vista Utiliza los datos del controlador, para enviar una interfaz de usuario.
// La vista no tiene acceso directo al modelo

// ________

// MVC En el proyecto
// Crear carperas controllers, models y views

// Crear modelo
// Los modelos se nombran en singular => movie.js
// Crear y exportar clase del modelo => MovieModel
// Crear método estático para trabajar con los datos => getAll => parámetro lo que se desea acceder (filtro) => { genre }
// Realizar la lógica que interactúa con la data => Ejemplo filtrar películas según el género
// Se debe convertir el método asíncrono, porque por fuera del modelo no se debe saber que es síncrono, igualemente en el router.

// Notas
// Investicar sobre el método 'static' en los métodos de las clases

// https://youtu.be/ev3Yxva4wI4?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=2871

// https://github.com/midudev/curso-node-js
