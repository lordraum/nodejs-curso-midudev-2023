const http = require('node:http')
const { findAvailablePort } = require('./free-port')

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola mundo')
})

findAvailablePort(4500)
  .then(port => {
    server.listen(port, () => console.log(`Servidor lanzado en http://localhost:${port}`))
  })
