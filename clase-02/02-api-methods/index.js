const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Pokemon API</h1>')
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset= utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not found</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Servidor lanzado en http://localhost/3000')
})

// Métodos más usados
/*
GET
HEAD => Similar al get pero sin solicitar el body
POST => Crear, enviar
PUT => Reemplazar, actualizar (partes)
DELETE => Eliminar recursos
OPTIONS =>Describe los recursos
PATCH => Modifica parcialmente un recurso
*/

// JSON.stringify(fileJSON) => JSON a string

// Extensiones para simular clientes HTTP
/*
REST Client
Thunder Client
RapidAPI Client
*/

// Chunk => Fragmento del buffer de datos. En HTTP los datos se reciben en fragmentos ya que lo info puede ser muy pesada. Al ser binarios se deben transformar al formato original.

// Otra forma de escribir el head
// res.writeHead(201, { 'Content-Type': 'application/json; charset= utf-8' })
