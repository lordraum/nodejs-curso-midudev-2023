# Trabajar con mySQL

## Crear modelo mySQl

- Crear moviesdb
- Crear tabla movie
  - Los primary key deben ser inmutables.
  - El tipo de campo `TEXT` es un campo `string` sin límite de caracteres
  - poster es `DECIMAL(2, 1)` Máximo 2 dígitos a la izquierda y máximo un dígito a la derecha 
  - genre al ser una FK se añade después.
- Crear tabla genre
- Crear tabla que relacione movies - genre --> movie_genres
  - mySQL no tiene arrays, entonces se crea una tabla donde haya un campo que pueda contener multiples registros de otro.
- Insertar datos

### UUID

```sql

-- Crear UUID
create table movie (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    -- etc
)

-- insertar 
INSERT INTO movie ( id , /* etc */) VALUES
(UUID_TO_BIN(UUID()), /* etc */ ),

-- convertir bin a UUID para mostrar con select
SELECT BIN_TO_UUID(id) id, /* etc */ FROM movie;
```

### Conectar con BBDD mySQL

- Driver npm --> `mysql2` --> `pnpm i -D mysql2` --> `import mysql from 'mysql2'`
- Crear configuración de conexión
  - host, port, user, password

```javascript
const config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASS,
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)
```

### Realizar consultas para la lógica

Se realizan con el método `connection.query(query)`.

El interrogante `?` Permite añadir valores js para interpolar las querys. Se puede usar más de un interrogante y más de un valor.

```javascript
const [genres] = await connection.query(
  'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
  [lowerCaseGenre]
)
```

### Error de inyección de código

En los inputs del usuario es primordial utilizar la forma anterior de interpolación y no utilizar concatenación o template strings, ya que esto permite que se pueda inyectar código malicioso.

### Establecer UUID

Aunque se puede no pasar, ya que al ser por defecto en la base, esta lo podría crear, es buena practica hacerlo en el modelo, para poder acceder al dato.

Se puede crear el UUID haciendo una consulta SQL

```javascript
    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
```

### try catch

Es necesario usar bloques try catch cuando se utiliza async await. No se debe devolver al usuario el error que llegue al catch. En lugar de usar console.log() usar una traza de servicio interno.

## Inyección de dependencias

Patrón de diseño, en la que un objeto, función, etc, recibe sus dependencias desde fuera. El comportamiento interno depende de como se pase esta información. Esto hace que el objeto pueda funcionar de diferentes maneras, sin hacer cambios en el directamente.

Esto mejora:

- La reutilización.
- El testing.
- El control.

<!-- https://youtu.be/eCWNQfzuuso?t=3460 -->



