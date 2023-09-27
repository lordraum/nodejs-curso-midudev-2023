// process.env => variables de entorno
// ejemplo process.env.PORT

const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.PORT)

const http = require('node:http')
const PORT = process.env.PORT

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola mundo')
})

server.listen(PORT, () => console.log(`Servidor lanzado en http://localhost:${PORT}`))

// Ejecutar PORT=1234 node 16-env/index
