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

## Conectar con BBDD mySQL

- Driver npm --> `mysql2` --> `pnpm i -D mysql2` --> `import mysql from 'mysql2'`
- Crear configuración de conexión
  - host, user, password



