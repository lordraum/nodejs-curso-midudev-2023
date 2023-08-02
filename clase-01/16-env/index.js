// process.env => variables de entorno
// ejemplo process.env.PORT

const http = require('node:http')
const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola mundo')
})

server.listen(port, () => console.log(`Servidor lanzado en el puerto ${port}`))

// Ejecutar PORT=1234 node 16-env/index
