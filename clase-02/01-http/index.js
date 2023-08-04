const http = require('node:http')
const fs = require('node:fs')
const PORT = process.env.PORT ?? 1234

// Procesando la petición
const processRequest = (req, res) => {
  // Header para la codificación utf-8
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // Discriminando según el path
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio<h1/>')
  } else if (req.url === '/contacto') {
    // Header para la codificación utf-8
    res.end('<h1>Contacto<h1/>')
  } else if (req.url === '/imagen-solicitada.jpg') {
    fs.readFile('./paisaje.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>Error 404</h1>')
  }
}

const server = http.createServer(processRequest)

// Enviando la respuesta
server.listen(PORT, () => console.log(`Servidor lanzado en http://localhost:${PORT}`))

// HTTP
// Protócolo de transmisión de información más usado en internet

// Petición => Request => Solicita información a través de datos envíados en una url
// Ver peticiones en devtools => Network (red) recargar web

// Partes de la petición
// url, headers, method, body (Opcional, según la petición)
// url => Solicita el recurso
// headers => Unformación acerca de la solicitud (contexto)
// method => Tipo de solicitud (GET, POST. PUT, DELETE)
// body => Datos que queremos transmitir

// Respuesta => response
// El servidor procesa la solicitud y devuelve una respuesta

// Partes de la respuesta
// statuscode, headers, body

// User-agent
// Cabecera que identifica al cliente

// Métodos request
// req.url => path de la solicitud
// req.setHeader() => Establece una cabecera

// Watch
// Comando node --watch filename => Actualiza los cambios en el servidor

// Default status code => 200 => ok

// Tipos de status code
// 100-199: Respuestas informativas
// 200-299: Respuestas satisfactorias
// 300-399: Redirecciones
// 400-499: Errores en la solicitud (cliente)
// 500-599: Errores en la respuesta (servidor)
// http.cat => Web que ilustra todos los tipos de error
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status => Documentación MDN status code

// statusCode más usados
/*
200 OK
301 Movend Permanently
400 Bad Request
404 Not found
500 Internal Server Error
*/

// Alternativa al Watch nativo => nodemon
// No es correcto utilizar de forma global sino como dependencia => npm i nodemon -D
// script => scripts/dev/ "nodemon fileToWatch"

// Headers más usados
/*
res.setHeader()
=> 'Content-Type'
=> => 'text-plain'
=> => 'text-html; charset=utf-8'
=> => 'image/type' => ejemplo 'image/png'
*/

// Buffer de datos => Los datos a enviar pero en forma binaria con espacio reservado en memoria de forma temporal
// El buffer de datos procesa y codifica los da datos
