# Para ti 🌻

Una pequeña página web animada: un perrito panzón entrega un ramo de girasoles en un jardín nocturno lleno de luciérnagas doradas, mientras aparece un mensaje escrito a mano en letra cursiva dorada.

Hecha solo con HTML, CSS y JavaScript puro. Sin dependencias, sin frameworks, sin proceso de compilación.

## Vista previa de la experiencia

1. El fondo es un degradado de azul marino a azul mar.
2. Los girasoles del jardín brotan uno por uno: primero crece el tallo, luego las hojas y al final florece la cabeza.
3. El perrito sube desde abajo con el ramo en las patas.
4. Aparecen las luciérnagas doradas flotando por toda la pantalla.
5. Se muestra el mensaje: *"Conmigo no serás espectadora 💛"*.

Después de la entrada, todo sigue en movimiento suave: las flores se mecen, el perrito respira, parpadea, mueve las orejas y la cola, y el ramo sube y baja levemente.

## Estructura del proyecto

```
.
├── index.html   # Estructura y dibujo SVG del perrito y el ramo
├── style.css    # Estilos, capas y animaciones
└── script.js    # Generación del jardín y de las luciérnagas
```

## Cómo usarla

No necesita instalación. Solo:

1. Coloca los tres archivos en la misma carpeta.
2. Abre `index.html` en cualquier navegador moderno.

También puedes subirla a cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.) para compartirla con un enlace.

> **Nota:** la tipografía *Great Vibes* se carga desde Google Fonts, así que hace falta internet para verla. Sin conexión, la página se ve igual pero el mensaje usa una fuente cursiva del sistema (`Brush Script MT` / `Segoe Script`).

## Cómo funciona

### `index.html`
- Contiene un único `<svg id="art">` con el perrito, el ramo de girasoles, el papel rosa y los moños, dibujados a mano con formas SVG.
- Define los filtros de resplandor (`glow`, `glowS`) y los degradados de pétalos, centro, papel y colina.
- Incluye un `<canvas id="fireflies">` para las luciérnagas y el bloque `.message` con el texto final.
- Los girasoles del ramo reutilizan el símbolo `#sf` con `<use>`.

### `style.css`
- Define la paleta base en variables CSS (`--navy`, `--sea`).
- Organiza las capas con `z-index`: escena (1), luciérnagas (2) y mensaje (3).
- Las animaciones de entrada se activan cuando `.scene` recibe la clase `.go`.
- Las animaciones continuas (`sway`, `breathe`, `bob`, `wag`, `blink`, `offer`) dan vida al jardín y al perrito.
- Respeta `prefers-reduced-motion`: si el usuario tiene activada esa opción, se desactivan los movimientos continuos.

### `script.js`
- `buildSunflowerSymbol()` construye el girasol reutilizable: 32 pétalos en dos capas, el centro y un patrón de semillas en espiral (ángulo áureo).
- `buildGarden()` genera los 8 girasoles del jardín a partir de un arreglo con posición, altura y escala. Cada uno tiene tallo curvo, dos hojas y cabeza con resplandor, con retrasos escalonados para que broten en secuencia.
- `startFireflies()` dibuja las luciérnagas en un canvas con degradados radiales, parpadeo y deriva suave. La cantidad se ajusta al tamaño de la pantalla (entre 28 y 90) y respeta la densidad de píxeles (máx. 2x).
- Al final, un doble `requestAnimationFrame` asegura que el navegador pinte el estado inicial antes de lanzar la animación de brote.

## Personalización

| Qué quieres cambiar | Dónde |
|---|---|
| El mensaje | `index.html`, dentro de `<p class="gold">` |
| El título de la pestaña | `index.html`, etiqueta `<title>` |
| Colores del fondo | `style.css`, variables `--navy` y `--sea` |
| Colores de los girasoles | `index.html`, degradados `gPetalOut`, `gPetalIn` y `gCenter` |
| Cantidad, posición y tamaño de los girasoles | `script.js`, arreglo `flowers` dentro de `buildGarden()` |
| Cantidad de luciérnagas | `script.js`, línea del cálculo de `n` en `resize()` |
| Velocidad del brote | `script.js` (variable `d`) y duraciones en `style.css` |
| Velocidad de la cola, respiración, etc. | `style.css`, sección "Perrito" |
| Color del pelaje del perrito | `index.html`, colores `#f0c27b`, `#c98a4b` y `#fff0d2` |

## Accesibilidad

- El SVG tiene `role="img"` y un `aria-label` que describe la escena.
- El canvas de luciérnagas está marcado con `aria-hidden="true"` porque es decorativo.
- Se reduce el movimiento para quienes lo prefieren.

## Compatibilidad

Funciona en navegadores modernos (Chrome, Edge, Firefox, Safari) en escritorio y móvil. Usa `background-clip: text`, `transform-box` y `pathLength`, todos con buen soporte actual.

## Créditos

- Tipografía: [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) (Google Fonts, licencia OFL).
- Ilustración y código: hechos a mano para esta página.
