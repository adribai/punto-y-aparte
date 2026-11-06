# PUNTO Y APARTE

## BIBLIOTECA PERSONAL DE LIBROS

Es un proyecto de foro de lectura creado con HTML, CSS y JAVASCRIPT.
Permite buscar libros reales en la API de Open Library por título, autor o ISBN, ver los resultados separados en exactos y coincidentes, guardarlos en una biblioteca personal y ordenarlos. La biblioteca se guarda en el navegador con `localStorage`.


## FUNCIONALIDADES

Acciones en las dos páginas principales:

- Buscar libros por título, por autor o por ISBN.
- Validar la búsqueda y mostrar un aviso cuando el texto tiene menos de 2 caracteres.
- Limpiar guiones y espacios del ISBN antes de buscar.
- Ver los resultados separados en **exactos** (el título o el autor coincide con lo buscado, sin tener en cuenta mayúsculas ni tildes) y **coincidentes**.
- Ver cada libro con portada, título, autores y año de publicación. Si no tiene portada, se muestra una imagen por defecto.
- Añadir libros a la biblioteca personal. El botón cambia a "En tu biblioteca" para evitar duplicados.
- Eliminar libros de la biblioteca.
- Ordenar la biblioteca por fecha de inserción (recientes o antiguos primero) y por título (A-Z y Z-A).
- Mostrar mensajes de carga, sin resultados y error de conexión.

Los libros se obtienen de la API pública de Open Library a través de `js/services/OpenLibraryApiService.js`.

## NAVEGACIÓN

1. **Inicio (`index.html`):** se escribe un título, un autor o un ISBN y se elige el tipo de búsqueda.
2. **Validación:** si el texto es demasiado corto, se muestra un aviso bajo el formulario.
3. **Resultados:** aparecen en la misma página, sin recargarla, en dos filas: resultados exactos y resultados coincidentes.
4. **Añadir:** cada tarjeta tiene un botón para guardar el libro en la biblioteca personal.
5. **Perfil (`pages/profile.html`):** en *Mi biblioteca* se ven los libros guardados, con la fecha en que se añadieron y el total de libros.
6. **Ordenar y eliminar:** se cambia el orden con el selector y se quitan libros con el botón *Eliminar*.

La navegación compartida enlaza Inicio, Perfil y Únete al foro. El formulario de *Únete al foro* (`pages/contact.html`), las opiniones de Inicio y los apartados *Leyendo ahora* y *Mis reseñas* del perfil son visuales y están fuera del alcance funcional de esta versión.

## ESTRUCTURA

```text
punto-y-aparte/
├── index.html                       # Inicio: buscador, resultados y opiniones
├── README.md
├── diagramas-biblioteca.md          # Diagramas de clases y de flujo
├── assets/
│   ├── favicon.png
│   └── images/                      # Portadas del prototipo e imagen sin portada
├── pages/
│   ├── profile.html                 # Perfil y Mi biblioteca
│   └── contact.html                 # Formulario para unirse al foro
├── styles/
│   ├── style.css                    # Estilos de Inicio, buscador y tarjetas
│   ├── profile_styles.css           # Estilos del perfil y de Mi biblioteca
│   └── contact_styles.css           # Estilos del formulario
└── js/
    ├── main.js                      # Punto de entrada de la aplicación
    ├── components/
    │   └── BookCard.js              # Crea la tarjeta HTML de un libro
    ├── models/
    │   ├── Book.js                  # Datos de un libro
    │   ├── BookSearch.js            # Búsqueda y clasificación
    │   ├── Library.js               # Biblioteca personal y localStorage
    │   └── SearchResult.js          # Resultados exactos y coincidentes
    ├── services/
    │   └── OpenLibraryApiService.js # Llamadas a la API de Open Library
    ├── ui/
    │   └── DOMController.js         # Eventos y renderizado de la interfaz
    └── utils/
        └── Errors.js                # Errores personalizados
```

## CLASES

| Clase | Responsabilidad |
| --- | --- |
| `Book` | Representa un libro: id, título, autores, año, portada y fecha en que se añadió. Devuelve los autores como texto y la URL de la portada, y se reconstruye desde `localStorage` con `fromJSON`. |
| `SearchResult` | Guarda el término buscado y clasifica los libros en resultados exactos y coincidentes. |
| `BookSearch` | Recibe el texto y el tipo de búsqueda, pide los libros a la API y devuelve un `SearchResult`. |
| `Library` | Añade y elimina libros, evita duplicados, los ordena por fecha o título y los guarda y carga de `localStorage`. |
| `DOMController` | Registra los eventos de la página y pinta los resultados y la biblioteca sin recargar. Contiene una `Library` y un `BookSearch`. |
| `FailureDoingFetchError` | Error propio que hereda de `Error` y guarda el código de estado de la respuesta cuando falla el `fetch`. |

## EJECUCIÓN

Como la aplicación usa módulos de JavaScript (`import` y `export`), hay que abrirla desde un servidor local y no directamente como archivo (`file://`). Por ejemplo, puedes usar **Live Server** desde Visual Studio Code:

1. Abre la carpeta `punto-y-aparte` en Visual Studio Code.
2. Inicia Live Server desde `index.html`.
3. Prueba el flujo de búsqueda, añadir a la biblioteca, ordenar y eliminar en el navegador.

No hace falta instalar dependencias ni tener clave de API.

## DATOS Y SERVICIOS

- **Open Library Search API:** devuelve los libros que coinciden con la búsqueda (`https://openlibrary.org/search.json?title=...`, `?author=...` o `?isbn=...`). La integración está encapsulada en `OpenLibraryApiService.js`.
- **Open Library Covers API:** proporciona las portadas a partir del identificador de portada (`https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`).
- **`localStorage`:** guarda la biblioteca personal con la clave `pya-library`, de forma que se conserva al recargar o cerrar el navegador y se comparte entre las páginas.

## FUERA DEL ALCANCE

- Inicio de sesión y creación de cuenta. El formulario de *Únete al foro* es solo visual.
- Recomendaciones de libros.
- Opiniones, reseñas y comentarios dinámicos.
- Sincronizar la biblioteca entre dispositivos o usuarios.



Adrián Baile Campos