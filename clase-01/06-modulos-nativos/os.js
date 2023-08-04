// nodejs tiene una gran cantidad de modulos nativos que permiten realizar multiples funcionalidades dentro de una aplicación.

// forma de importar modulos nativos

const os = require('node:os')

// os => Da información acerca del sistema operativo

console.log('SO', os.platform())
console.log('SO Version', os.release())
console.log('Arquitectura', os.arch())
console.log("CPU's", os.cpus())
console.log('memoria libre', os.freemem() / 1024 / 1024)
console.log('memoria total', os.totalmem() / 1024 / 1024)
console.log('tiempo encendido', os.uptime() / 60 / 60)
