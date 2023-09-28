const http = require('node:http')
const fs = require('node:fs')
const PORT = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio<h1/>')
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto<h1/>')
  } else if (req.url === '/imagen-solicitada.jpg') {
    fs.readFile('./paisaje.jpg', (err, data) => {
      res.statusCode = 404 // Not Found
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.end('<h1>Error 404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => console.log(`Servidor lanzado en http://localhost:${PORT}`))
