# Alby’s · Propuesta de micro-app + landing

Material para presentarle a Alby’s (granola, Pituquis, frutos secos, miel y huevos de campo, entregas los jueves en zona norte) una app a medida, basada en lo que ya funciona en **Don Bamón** (`don-bamon-rutas`).

## Qué hay

| Carpeta | Qué es |
|---|---|
| `propuesta/png/` | Carrusel de 17 placas 1080×1350 (formato Instagram 4:5), listas para mandar por WhatsApp o subir. |
| `propuesta/albys-propuesta.mp4` | Las mismas 17 placas en video (con fundidos). |
| `propuesta/slides.html` | La fuente de las placas (HTML/CSS). Editás textos acá y volvés a renderizar. |
| `propuesta/visor.html` | Visor del carrusel + video. |
| `landing/` | Landing de Alby’s: catálogo con precios, carrito y pedido que se manda por WhatsApp ya escrito. HTML estático, sin build. |
| `assets/` | Logo y fotos de producto recortadas de los flyers de Instagram. |

## Las 17 placas

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
12. Números del negocio (ventas por semana)
13. Métricas para decidir: productos, zonas y mejores clientes, con conclusiones
14. La web para el link de la bio + ideas extra
15. Contenido: tablero de posts, carruseles, historias y TikToks por estado y fecha
16. Marca, mensajes guardados de WhatsApp y biblioteca para Meta Ads
17. Plan por etapas y cierre

## Lógica de la página de métricas

Todo sale de las filas del Excel (pestañas Pedidos + Items + Clientes + Productos). Cada ítem vendido es una fila con fecha, cliente, zona, producto, cantidad, precio y estado de pago; la app filtra por período (últimas 8 semanas, este mes, todo) y agrupa:

- **Productos**: plata vendida, unidades y % del total. Con el costo por receta cargado en Productos, calcula el margen: `(precio − costo) / precio`. Así se ve qué vende más y qué deja más.
- **Zonas**: plata, cantidad de pedidos, % del total y ticket promedio (`plata / pedidos`). Sirve para decidir días de entrega, pedido mínimo o costo de envío.
- **Clientes**: ranking por plata en el período, en cuántas de las semanas compró (frecuencia), hace cuánto no pide y si debe algo. Etiquetas automáticas: *Fiel* (compró en 6+ de las últimas 8 semanas), *Bajó* (frecuencia cayó o no pide hace 2+ semanas cuando solía pedir todas), *Dormido* (3+ semanas sin pedir), *Nuevo* (primer pedido en el período).
- **Comparación**: cada número contra el período anterior del mismo largo (+18%, etc.).
- **Conclusiones automáticas** (reglas simples, sin IA): zona con más del 35% de las ventas → sugerir otro día de entrega; producto con margen bajo pero mucho volumen → revisar precio o usarlo de gancho; zona con ticket promedio por debajo del general → sugerir pedido mínimo; pocos clientes que suman mucho → cuidarlos.

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

---

## Otras propuestas en este repo

| Carpeta | Qué es |
|---|---|
| `vueltayvuelta/propuesta/` | Carrusel de 16 placas para Vuelta y Vuelta (catering de asados): calculadora de carne, presupuesto y margen, presupuestos en PDF, calendario sincronizado, compras, señas y saldos, historial de eventos, métricas, contenido, bot y web. |
| `vueltayvuelta/landing/` | Landing de Vuelta y Vuelta con la persona que cocina, servicio, galería y un formulario que arma la consulta (WhatsApp o Instagram). El número de WhatsApp va en la constante `WA`. |
| `cheese-brothers/propuesta/` | Carrusel de 17 placas para Cheese Brothers: pedidos del viernes, plan de corte por queso y por cliente, stock de hormas, precios y margen, rutas por repartidor, cobros, clientes, métricas, cajas navideñas, contenido y bot. |
| `tools/` | `build-slides.py` arma el `slides.html` de cada propuesta (base común + tokens de la marca) y `render.mjs` lo pasa a PNG: `node tools/render.mjs vueltayvuelta`. |
