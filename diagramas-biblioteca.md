# Biblioteca personal de libros: diagramas

API: Open Library (`https://openlibrary.org/search.json?title=...` y `?author=...`). Portadas: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`.



## Diagrama de clases

```mermaid
classDiagram
  direction LR

  class Autor {
    +String nombre
  }

  class Libro {
    +String id
    +String titulo
    +Autor[] autores
    +Number anio
    +String portadaUrl
    +Date fechaInsercion
    +getNombresAutores() String
  }

  class Biblioteca {
    +Libro[] libros
    +Number usuarioId
    +agregar(libro) void
    +eliminar(id) void
    +contiene(id) Boolean
    +ordenar(criterio) Libro[]
    +guardar() void
    +cargar() void
  }

  class BuscadorLibro {
    +ServicioApi api
    +buscar(texto, tipo) Promise~ResultadoBusqueda~
  }

  class ServicioApi {
    +String urlBase
    +obtenerLibros(texto, tipo) Promise~Object[]~
  }

  class ResultadoBusqueda {
    +String termino
    +Libro[] exactos
    +Libro[] coincidentes
    +clasificar(libros) void
  }

  class ControladorDOM {
    +Biblioteca biblioteca
    +BuscadorLibro buscador
    +iniciar() void
    +mostrarResultados(resultado) void
    +mostrarBiblioteca() void
  }

  Libro "1" *-- "1..*" Autor : composición
  Biblioteca "1" o-- "0..*" Libro : contiene
  ResultadoBusqueda "1" o-- "0..*" Libro : agrupa
  BuscadorLibro ..> ResultadoBusqueda : crea
  BuscadorLibro *-- ServicioApi : usa
  ControladorDOM *-- Biblioteca
  ControladorDOM *-- BuscadorLibro
```

## Flujo de la aplicación

```mermaid
flowchart TD
  A([Abrir la página]) --> B[Biblioteca.cargar desde localStorage]
  B --> C[Mostrar la biblioteca]
  C --> H[/Esperar acción del usuario/]
  H --> I{¿Qué acción?}
  I -- Buscar --> S[[Flujo de búsqueda]] --> H
  I -- Añadir --> J{¿Ya está guardado?}
  J -- Sí --> H
  J -- No --> J2[agregar con fecha actual] --> K
  I -- Eliminar --> L[eliminar por id] --> K
  K[guardar en localStorage] --> C
  I -- Ordenar --> N[ordenar por fecha, A-Z o Z-A] --> C
```

## Flujo de búsqueda

```mermaid
flowchart TD
  A[/Escribe un término y elige título o autor/] --> B{¿Está vacío?}
  B -- Sí --> Z([Fin])
  B -- No --> C["ServicioApi.obtenerLibros: fetch a Open Library por title o author"]
  C --> D{¿Ha ido bien?}
  D -- No --> E[Mostrar mensaje de error] --> Z
  D -- Sí --> F[Crear un Libro por cada resultado]
  F --> G{¿Coincide exacto con el término?}
  G -- Sí --> G1[exactos]
  G -- No --> G2[coincidentes]
  G1 --> H[Mostrar las dos listas con botón Añadir]
  G2 --> H
  H --> Z
```

## Flujo de datos (secuencia)

```mermaid
sequenceDiagram
  actor U as Usuario
  participant I as ControladorDOM
  participant B as BuscadorLibro
  participant S as ServicioApi
  participant API as API Open Library
  participant R as ResultadoBusqueda
  participant Bi as Biblioteca

  U->>I: Busca "dune"
  I->>B: await buscar("dune", "titulo")
  B->>S: await obtenerLibros("dune", "titulo")
  S->>API: fetch(search.json?title=dune)
  API-->>S: JSON con docs
  S-->>B: docs
  B->>R: clasificar(libros)
  B-->>I: ResultadoBusqueda
  I-->>U: Muestra exactos y coincidentes
  U->>I: Clic en Añadir
  I->>Bi: agregar(libro) y guardar()
  I-->>U: Biblioteca actualizada sin recargar
```
