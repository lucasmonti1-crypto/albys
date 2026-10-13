---
name: propuesta-negocio
description: Arma la propuesta visual de micro-app para un emprendimiento (carrusel de placas + visor publicado + landing opcional), con el método que usamos para Alby's, Vuelta y Vuelta y Cheese Brothers. Usar cuando Lucas pida "una propuesta", "un artefacto como el de Alby's", "mostrarle a un negocio lo que le puedo hacer" o pase el Instagram de un negocio nuevo.
---

# Propuesta visual para un negocio

Lucas ofrece micro-apps a emprendimientos (pedidos, Excel, rutas, cobros, clientes, métricas, contenido, bot de WhatsApp). La propuesta es una **muestra visual**, no el desarrollo: tiene que hacer que el dueño entienda en 2 minutos qué le resolvería. Precisión justa: números de ejemplo que cierren entre sí, sin sobre-especificar.

## 1. Entender el negocio
- Instagram suele estar bloqueado desde la nube: trabajar con las capturas que manda Lucas (bio, destacados, posts, flyers, página de links). Sacar productos, precios, zonas, días de entrega, tono y colores.
- Recortar logo y 4–8 fotos de las capturas a `<negocio>/assets/` (PIL). **Nunca** subir las capturas originales al repo (es público y muestran su escritorio).
- Preguntar solo lo que cambia la propuesta (nombre del dueño, precio de referencia). Lo demás: suponer y marcar "de ejemplo".

## 2. Elegir las placas (14–17, formato 1080×1350)
Estructura que funciona:
1. Portada con la marca y la promesa ("La app de X").
2. Cómo es hoy: chat de WhatsApp caótico + 4 dolores concretos del rubro.
3. Cómo se conecta (Sheets, WhatsApp, Maps, PDF, etc.).
4. El Excel bien armado (mención a Don Bamón como caso real).
5–11. Una placa por función, cada una con una pantalla mockup creíble. Elegir según el rubro:
   - Reparto semanal (Alby's, Cheese Brothers): pedidos en vivo, producción / plan de corte, stock, rutas por repartidor, app del repartidor, cobros.
   - Eventos (Vuelta y Vuelta): calculadora de insumos, presupuesto y margen, presupuesto PDF, calendario sincronizado, compras, señas y saldos, historial.
12. Clientes (etiquetas fiel / nuevo / dormido + mensaje masivo).
13. Métricas para decidir: rankings + 3 conclusiones con acción ("→ ...").
14. Contenido: tablero de posts, mensajes guardados, kit de marca, Meta Ads.
15. Bot de WhatsApp (siempre como etapa siguiente).
16. Web / landing + chips de "más ideas".
17. Plan por etapas + "¿Lo probamos un mes?".
Sumar siempre 2–4 ideas propias específicas del rubro (ej.: cajas navideñas, merma de corte, aniversario de eventos).

## 3. Construir
- Base de componentes compartida: `tools/slides-base.css`. Cada negocio tiene `<negocio>/propuesta/{tokens.css, slides.part.html, title.txt, fonts.txt}`.
- `python3 tools/build-slides.py <negocio>` arma `slides.html`.
- Servidor estático en la raíz del repo y `node tools/render.mjs <negocio>` → `propuesta/png/NN.png` (`CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `BASE=http://localhost:PUERTO`).
- Identidad de cada marca: colores del logo, una tipografía display que se parezca a la del logo, Manrope de cuerpo.
- Revisar el render con una hoja de contacto y corregir lo que se corta o se pisa (etiquetas de mapa, columnas angostas).

## 4. Publicar
- Visor: copiar `<otro>/propuesta/visor.html` (2 placas por vista en compu, 1 en celu, hover que agranda, clic para ver en grande) y ajustar título, `N` y colores. Publicarlo como Artifact con `files` = las PNG.
- Los artifacts quedan privados: recordarle a Lucas que los comparta desde "Compartir".
- La landing del negocio **no** se publica como artifact (se presenta como el sitio del negocio): queda como archivo en `<negocio>/landing/` y se muestra dentro de una placa.
- Commit y push a la rama de trabajo.

## 5. Precio (privado, solo para Lucas)
Modelo que le cierra a un emprendimiento: prueba gratis de 4 semanas, después cobro por pedido o abono semanal chico que sube por etapa; nunca más del ~5% de lo que vende el negocio; el bot al final. Ver el artifact "Precio para Alby's" como referencia.
