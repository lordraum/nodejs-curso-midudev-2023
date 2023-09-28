# Apuntes clase 02

## Protocolo HTTP

Protócolo de transmisión de información más usado en internet.

### Petición HTTP

Petición --> Request --> Solicita información a través de datos envíados en una url. Las peticiones HTTP se pueden ver en el navegador en devtools => Network (red), recargar web.

### Partes de la petición
- url, headers, method, body (Opcional, según la petición)
    - url --> Solicita el recurso
    - headers --> Información acerca de la solicitud (contexto)
    - method --> Tipo de solicitud (GET, POST. PUT, DELETE)
    - body --> Datos que queremos transmitir

### Respuesta => response
El servidor procesa la solicitud y devuelve una respuesta.

### Partes de la respuesta
- statuscode, headers, body
  - User-agent --> Cabecera que identifica al cliente

### Métodos request
- `req.setHeader()` --> Establece una cabecera
- `req.url` --> path de la solicitud

```js
// El header una vez definido funciona para diferentes repsuestas

res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // Header para devolver html en codificación utf-8
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de inicio<h1/>')
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto<h1/>')
}
```

- Enviar imagen jpg en la respuesta

```js
  else if (req.url === '/imagen-solicitada.jpg') {
    fs.readFile('./paisaje.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    }) 

```

- Manejo del error en la solicitud

```js
} else {
    res.statusCode = 404 // Not Found
    res.end('<h1>Error 404</h1>')
  }
```

### Tipos de status code
- 100-199: Respuestas informativas
- 200-299: Respuestas satisfactorias
- 300-399: Redirecciones
- 400-499: Errores en la solicitud (cliente)
- 500-599: Errores en la respuesta (servidor)
- http.cat => Web que ilustra todos los tipos de error
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status => Documentación MDN status code

### statusCode más usados
- 200 OK (Default)
- 301 Movend Permanently
- 400 Bad Request
- 404 Not found
- 500 Internal Server Error

### Headers más usados
- res.setHeader()
  -  'Content-Type'
    -  'text-plain'
    -  'text-html; charset=utf-8'
    -  'image/type' => ejemplo 'image/png'

### Buffer de datos

Son Los datos a enviar pero en forma binaria con espacio reservado en memoria de forma temporal. El buffer de datos procesa y codifica los da datos, los envia en partes (chunks).

### Ejercicio 

[ ] Crear función processRequest que maneje la petición, para despues ser llamada en http.createServer(foo).
[ ] Crear los endpoints '/' y 'about', devolver un h1.
[ ] Crear un endpoint para devolver una imagen.
[ ] Devolver statut codes de error en cada caso y en general.

## Watch
Comando `node --watch filename` --> Ejecuta el archivo y actualiza cada que se haga un cambio.

```json
// package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --watch 03-express/index" //node watch script
  },
```


