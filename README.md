# Vértice Racing — plantilla web de escudería

Plantilla estática de sitio web para un equipo de competición. HTML, CSS y
JavaScript sin frameworks ni dependencias. Todo el contenido es ficticio y
sustituible.

**Demo:** https://vertice-racing.vercel.app

---

## Contenido

- **Portada** (`src/index.html`): hero, escudería, historia en carrusel
  horizontal, temporadas con pestañas y gráfico, pilotos, monoplaza, noticias y CTA.
- **Noticias** (`src/noticias.html`): rejilla de entradas estáticas.
- **Únete** (`src/registro.html`): formulario demostrativo con validación en cliente.

## Estructura

```
vertice-racing/
├─ src/            index.html · noticias.html · registro.html
├─ estilos/        index.css (sistema de diseño completo)
├─ js/             demo-data.js · index.js · registro.js
├─ imgs/           favicon.svg
├─ docs/           política de privacidad y términos (plantilla)
└─ vercel.json     rewrites, caché y cabeceras
```

## Cómo personalizarla

1. **Datos del equipo** — `js/demo-data.js`: nombre, chasis, motor, jefe de
   equipo, temporadas y estadísticas de pilotos. La portada se repinta sola.
2. **Colores** — variables CSS al principio de `estilos/index.css`
   (`--green`, `--lime`, `--ink`, `--paper`).
3. **Textos** — directamente en los tres ficheros de `src/`.
4. **Imágenes** — las cajas con clase `.ph` son marcadores de posición.
   Sustitúyelas por `<img>` con tus fotos:
   ```html
   <div class="driver-media driver-media-cut">
     <img src="../imgs/mi-piloto.webp" alt="Descripción" loading="lazy" />
   ```
5. **Formulario** — `js/registro.js` solo valida y muestra confirmación.
   El bloque donde conectar el envío real está marcado con un comentario.

## Desarrollo local

```bash
python -m http.server 8000
# abrir http://localhost:8000/src/index.html
```

## Despliegue

```bash
vercel --prod
```

`vercel.json` sirve `/` como portada y resuelve `/noticias` y `/registro` sin
extensión.

## Antes de publicar

- [ ] Sustituir textos, nombres y datos por los reales (o mantenerlos ficticios).
- [ ] Cambiar logo y favicon.
- [ ] Reemplazar los marcadores `.ph` por imágenes propias o con licencia.
- [ ] Revisar la política de privacidad si el formulario envía datos.
- [ ] Añadir metadatos de compartición (`og:image`, `og:title`).

## Licencia

Uso libre para proyectos propios y comerciales. El contenido ficticio no
representa a ninguna organización real.
