const fs = require('node:fs')

fs.readFile('./paisaje.jpg', (err, file) => err ? console.log('error') : console.log(file))
