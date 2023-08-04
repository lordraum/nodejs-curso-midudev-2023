const net = require('node:net')

function findAvailablePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0)
          .then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }

// Pasos

// Importar net

// Crear función para verificar puerto
// => promesa => res, rej
// => Crear server => Escuchar => Cerrar server => resolve port (devolver puerto)

// Escuchar evento error en el servidor
// Error Puerto en uso => Ejecutar función(0) => resolver puerto
// => reject err
