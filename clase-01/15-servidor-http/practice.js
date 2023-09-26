const http = require('http')

const PORT = 3001

const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('<h1>Hello world</h1>')
})

server.listen((3001), () => console.log(`Servidor lanzado en http://localhost:${PORT}`))
