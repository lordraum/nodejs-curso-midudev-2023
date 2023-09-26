const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola mundo')
})

server.listen(4500, () => console.log('Servidor lanzado en el puerto 4500'))
