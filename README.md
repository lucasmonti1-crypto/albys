# Alby’s · Propuesta de micro-app + landing

Material para presentarle a Alby’s (granola, Pituquis, frutos secos, miel y huevos de campo, entregas los jueves en zona norte) una app a medida, basada en lo que ya funciona en **Don Bamón** (`don-bamon-rutas`).

## Qué hay

| Carpeta | Qué es |
|---|---|
| `propuesta/png/` | Carrusel de 14 placas 1080×1350 (formato Instagram 4:5), listas para mandar por WhatsApp o subir. |
| `propuesta/albys-propuesta.mp4` | Las mismas 14 placas en video (51 s, con fundidos). |
| `propuesta/slides.html` | La fuente de las placas (HTML/CSS). Editás textos acá y volvés a renderizar. |
| `propuesta/visor.html` | Visor del carrusel + video. |
| `landing/` | Landing de Alby’s: catálogo con precios, carrito y pedido que se manda por WhatsApp ya escrito. HTML estático, sin build. |
| `assets/` | Logo y fotos de producto recortadas de los flyers de Instagram. |

## Las 14 placas

1. Portada: “La app de Alby’s”
2. Cómo es un jueves hoy (WhatsApp, cobros, ruta a ojo, cuánto preparar)
3. Cómo se conecta: Google Sheets, WhatsApp, Google Maps, repartidores, cobros, web
4. Paso 1: el Excel bien armado (pestañas Pedidos, Clientes, Productos, Repartidores, Cobros, Insumos)
5. Panel de pedidos en vivo (igual que la Hoja de Ruta de Don Bamón, se refresca sola)
6. Producción: cuánto preparar el jueves + lista de compras + etiquetas
7. Una ruta por repartidor con Google Maps
8. App del repartidor + aviso “estoy llegando” por WhatsApp
9. Cobros: quién pagó y quién no, recordatorio con un toque
10. CRM: clientes fieles, nuevos y dormidos, mensajes masivos
11. Bot de WhatsApp que toma pedidos (etapa siguiente)
12. Números del negocio
13. La web para el link de la bio + ideas extra
14. Plan por etapas y cierre

Los nombres de clientes, montos y métricas de las placas son de ejemplo. Los productos y precios salen del flyer real de Alby’s.

## Regenerar placas y video

```bash
npx http-server -p 8765 .          # servir la raíz del repo
node propuesta/render.mjs          # PNG
node propuesta/render.mjs --video  # PNG + MP4 (necesita ffmpeg)
```

Requiere Playwright (`npm i -D playwright`). Si usás un Chromium propio: `CHROMIUM=/ruta/a/chrome`.

## Landing

Abrí `landing/index.html` en el navegador o subí la carpeta `landing/` a Vercel, Netlify o GitHub Pages. Precios y productos están en el array `PRODUCTS` del script al final del archivo. El número de WhatsApp está en la constante `WA`.
