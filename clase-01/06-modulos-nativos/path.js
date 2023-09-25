const path = require('node:path')

const filePath = path.join('content', 'subfolder', 'test.txt')

console.log(filePath)

const base = path.basename('/tmp/files/file.txt')

const filename = path.basename('/tmp/files/file.txt', '.txt')

const extension = path.extname('/tmp/files/file.txt')

console.log(base, filename, extension)
