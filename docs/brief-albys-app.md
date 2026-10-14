# Brief: App de Alby's

Brief para planificar con Claude la app de Alby's antes de pasar a desarrollarla en un proyecto nuevo de Claude Code.

**Propuesta visual (carrusel de 17 placas):** https://claude.ai/artifact/Qn5J4mtsfNMe1uwbFiRoyf
**Repo con la propuesta y la landing:** `lucasmonti1-crypto/albys` (rama `claude/awesome-noether-xpt9dp`)
**Proyecto de referencia ya funcionando:** `lucasmonti1-crypto/don-bamon-rutas`
**Imágenes adjuntas:** las 17 placas del carrusel (`propuesta/png/01.png` a `17.png`). Usalas como referencia visual de cada pantalla y del estilo (colores oliva, trigo y crema del logo; títulos en Young Serif, texto en Manrope).

---

## 1. Quién soy y qué quiero

Soy Lucas. Armo micro-apps a medida para emprendimientos de amigos y conocidos. Alby's es el primero de una serie (después vienen Vuelta y Vuelta y Cheese Brothers). La idea es empezar chico, mostrar resultados y escalar por etapas.

Lo que necesito de esta charla:
1. Bajar a tierra el alcance de la **etapa 1** y dejar claro qué entra y qué no.
2. Definir la arquitectura técnica reutilizando lo de Don Bamón.
3. Armar la lista de preguntas para el dueño de Alby's antes de arrancar.
4. Terminar con un plan concreto para abrir el proyecto en Claude Code: un CLAUDE.md, la estructura del repo y las primeras tareas.

---

## 2. El negocio: Alby's

- **Qué es:** emprendimiento familiar de productos naturales. Lema: "Lo natural, directo a tu casa".
- **Instagram:** @albys.ar (unos 680 seguidores). Contacto: Joaquín (@cocoshalbanese).
- **Pedidos:** por WhatsApp al +54 9 11 2569 4531. Toman pedidos durante la semana y **entregan los jueves**.
- **Zona de entrega:** zona norte (San Isidro, Nordelta y alrededores).
- **Promo:** regalo en la primera compra si mencionan el flyer.
- **Otros:** organizan la "Copa Alby's", un torneo de rugby.

**Productos y precios (del flyer, octubre 2026):**

| Producto | Presentación | Precio |
|---|---|---|
| Granola casera | 250 g / 500 g / 800 g | $7.000 / $11.500 / $18.000 |
| Pituquis (galletas de avena, pasas y nuez) | x6 / x12 | $3.300 / $5.500 |
| Maple de huevos de campo | 30 unidades | $7.900 |
| Miel 100% natural | 1 kg | $10.000 |
| Mix clásico (almendra, maní, pasas y cajú) | 100 g / 200 g | $3.800 / $6.600 |
| Mix premium (almendra, nuez, cajú y avellana) | 100 g / 200 g | $4.400 / $7.700 |
| Frutos secos | 200 g: nuez mariposa / almendras / avellanas | $5.000 / $6.000 / $7.000 |

**Cómo trabajan hoy (supuesto, a confirmar):** los pedidos llegan sueltos por WhatsApp e Instagram y se pasan a mano a un Excel. No hay registro claro de quién pagó. La ruta del jueves se arma a ojo. Lo que hay que preparar se cuenta pedido por pedido.

---

## 3. Lo que propusimos (resumen del carrusel)

1. **Excel bien armado** en Google Sheets, con pestañas Pedidos, Clientes, Productos, Repartidores, Cobros e Insumos. Listas desplegables y totales automáticos. Es la base de todo.
2. **Panel de pedidos en vivo:** lee el Sheet cada pocos segundos. Muestra indicadores (pedidos, a cobrar, pendiente), filtros por zona y una tarjeta por pedido con su estado de pago.
3. **Producción:** cuánto preparar el jueves (kilos de granola, paquetes de Pituquis, maples), lista de compras de insumos según receta y etiquetas por pedido.
4. **Rutas por repartidor:** Google Maps optimiza el orden de las paradas y la ruta se manda por WhatsApp.
5. **App del repartidor** (link web, sin instalar nada): parada actual, qué entregar, cuánto cobrar, botón "estoy llegando" por WhatsApp y "marcar entregado y cobrado", que actualiza el Sheet.
6. **Cobros:** quién pagó y quién no, reparto por medio de pago y recordatorio por WhatsApp con el mensaje ya escrito.
7. **Clientes:** etiquetas automáticas (Fiel, Nuevo, Dormido, Bajó) y mensajes a clientes que dejaron de pedir.
8. **Métricas para decidir:** ver la sección 4.
9. **Contenido:** tablero de posts para Instagram y TikTok, kit de marca, mensajes de WhatsApp guardados y biblioteca para Meta Ads.
10. **Landing con catálogo y carrito** que arma el pedido por WhatsApp. Ya está hecha en `albys/landing/index.html`.
11. **Bot de WhatsApp** (última etapa): toma pedidos, "repetir mi último pedido", carga en el Sheet y cierra los pedidos a una hora fija.

**Etapas propuestas:**
- **Etapa 1:** Excel, panel de pedidos, cobros y producción.
- **Etapa 2:** rutas y app del repartidor.
- **Etapa 3:** clientes, métricas, contenido y web.
- **Etapa 4:** bot de WhatsApp y Meta Ads.

---

## 4. Lógica de la página de métricas

Todo sale de las filas del Sheet: cada ítem vendido tiene fecha, cliente, zona, producto, cantidad, precio y estado de pago. Se filtra por período (últimas 8 semanas, este mes o todo) y se agrupa así:

- **Productos:** plata, unidades y porcentaje del total. Con el costo por receta cargado, también el margen: `(precio − costo) / precio`.
- **Zonas:** plata, pedidos, porcentaje del total y ticket promedio (`plata / pedidos`).
- **Clientes:** ranking por plata, frecuencia (en cuántas de las últimas semanas compró), hace cuánto no pide y si debe plata.
  - *Fiel:* compró en 6 o más de las últimas 8 semanas.
  - *Bajó:* solía pedir todas las semanas y lleva 2 o más sin pedir.
  - *Dormido:* 3 semanas o más sin pedir.
  - *Nuevo:* primer pedido dentro del período.
- **Comparación:** cada número contra el período anterior del mismo largo.
- **Conclusiones automáticas** (reglas simples, sin IA):
  - una zona con más del 35% de las ventas → sugerir otro día de entrega;
  - un producto con margen bajo y mucho volumen → revisar el precio;
  - una zona con ticket bajo → pedido mínimo;
  - pocos clientes que concentran mucho → cuidarlos.

---

## 5. Base técnica: Don Bamón (repo `don-bamon-rutas`)

Es una app interna que ya funciona para un emprendimiento de pastas. La idea es partir de ahí.

- **Stack:** React 18, Vite, Tailwind y React Router. El backend son funciones serverless en Vercel (Node). Supabase (Postgres) para direcciones, rutas, ajustes y login. Google Maps Platform para geocodificación, direcciones y el mapa.
- **Lectura del Sheet** (`api/_lib/sheet.js`): lee las pestañas por nombre con el endpoint `gviz/tq?tqx=out:csv`. El Sheet tiene que estar compartido como "cualquiera con el vínculo: lector". Cruza Pedidos, Clientes e Items Pedido y arma pedidos completos.
- **Pedidos en vivo:** el hook `useSheetOrders` refresca cada 45 s y la API cachea 20 s.
- **Optimizador de rutas** (`api/optimize-route.js`): geocodifica en paralelo y usa Directions con `optimize:true`. Si hay más de 23 paradas, las parte en tramos. Devuelve links de Google Maps para el celular, uno por tramo cada 10 paradas.
- **Botones de WhatsApp:** links `wa.me` con el texto ya escrito, tanto por cliente como para mandar la ruta.
- **Lector de imágenes con Gemini 2.5 Flash:** lee capturas de WhatsApp o fotos de listas y saca las direcciones.
- **Login:** link mágico de Supabase con lista de emails permitidos (`allowed_emails` más un trigger). También tiene control de uso y presupuesto de la API.
- **Costo de Maps estimado:** unos USD 11 por mes para 100 rutas, dentro de lo gratuito.

**Diferencias que necesita Alby's:**
- **Escribir en el Sheet:** el repartidor marca "entregado y cobrado", así que gviz no alcanza porque es solo lectura. Hace falta la API de Google Sheets con una cuenta de servicio, o usar Supabase como fuente y sincronizar con el Sheet. **Hay que decidir esto.**
- **Varios repartidores:** una ruta por repartidor y una vista web para cada uno (link con token, sin cuenta).
- **Productos con variantes** (250 g, 500 g, 800 g, x6, x12) y recetas para calcular la producción.
- **Métricas e historial:** guardar fotos semanales en Supabase o leer el histórico del Sheet.
- **Hosting:** el plan gratis de Vercel no permite uso comercial. Hay que evaluar Vercel Pro (USD 20 por mes) o Netlify / Cloudflare Pages.

---

## 6. Modelo comercial (privado, no se le muestra al cliente)

- 4 semanas de prueba gratis con la etapa 1. Después, cobro por pedido entregado, que sube con cada etapa:
  - etapa 1: $300 por pedido;
  - con rutas: $400;
  - con clientes y métricas: $500;
  - con bot: $600, más lo que cobra Meta por mensaje.
- La alternativa es un abono semanal fijo, de $9.000 a $20.000 según la etapa.
- La landing va de regalo.
- Regla: lo que pagan no debería pasar del ~5% de lo que vende el negocio.
- Ajuste por inflación cada 3 meses, atado a lo que suban sus propios precios.
- El bot va recién cuando tengan unos 50 pedidos por semana. Antes alcanza con los botones `wa.me`, que son gratis.

---

## 7. Preguntas para el dueño de Alby's (para hacer antes de arrancar)

**Volumen y operación**
1. ¿Cuántos pedidos tienen por semana? ¿Cuál es el ticket promedio?
2. ¿Hasta qué día y hora toman pedidos para el jueves?
3. ¿A qué zonas entregan exactamente? ¿Cobran envío o hay pedido mínimo?
4. ¿Cuántos repartidores tienen y quiénes son? ¿Reparten en auto, moto o bici? ¿Salen todos desde el mismo lugar? ¿Desde dónde?
5. ¿Quién arma los pedidos y quién carga los datos?

**Datos actuales**
6. ¿Tienen un Excel o Sheet hoy? ¿Me lo pueden compartir, aunque sea de ejemplo?
7. ¿Tienen una lista de clientes con dirección y teléfono?
8. ¿Les sirve el historial de pedidos anteriores para las métricas?

**Plata**
9. ¿Cómo cobran: transferencia, efectivo, Mercado Pago? ¿Qué alias usan?
10. ¿Cuándo cobran: antes del jueves, en la entrega o las dos cosas?
11. ¿Saben cuánto les cuesta hacer cada producto (receta e insumos)? Lo necesito para producción y márgenes.

**Herramientas**
12. ¿Usan WhatsApp Business? ¿En qué celular, y quién lo maneja?
13. ¿Tienen cuenta de Google para el Sheet? ¿Quién va a ver la app y desde qué dispositivo?
14. ¿Qué les duele más hoy? Con eso definimos la etapa 1.

---

## 8. Lo que quiero que salga de esta charla

1. **Alcance de la etapa 1** cerrado: pantallas, qué datos lee y escribe, y qué no entra.
2. **Decisión de arquitectura:** Sheet como fuente única de datos o Supabase como base con sincronización al Sheet. Cómo escribe el repartidor.
3. **Estructura del Sheet:** pestañas, columnas y validaciones. Una plantilla que yo pueda crear.
4. **Estructura del repo nuevo y un CLAUDE.md inicial** para el proyecto de Claude Code (por ejemplo `albys-app`), partiendo de `don-bamon-rutas`.
5. **Lista de tareas de la etapa 1**, ordenadas y chicas, para arrancar a programar.
6. **Riesgos:** cuotas de Google, privacidad de los datos de clientes, quién mantiene el Sheet si yo no estoy.
