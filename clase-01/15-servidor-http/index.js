const http = require('node:http')

// http.CreateServer() => Crea un servidor para procesar una solicitud http

// Parámetros => Petición (req), respuesta (res)
// Método res.end() => Envía la respuesta

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola mundo')
})

server.listen(4500, () => console.log('Servidor lanzado en el puerto 4500'))

// Truco para que siempre utilice un puerto vacío
// => Utilizar puerto cero (0)

// Acceder al puerto
// => server.address().port

// ------>
/* server.listen(0, () => console.log(`Servidor lanzado en http://localhost:${server.address().port}`)) */
