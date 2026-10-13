# Arma slides.html de una propuesta: base de componentes + tokens de la marca + placas.
# Uso: python3 tools/build-slides.py <carpeta>   (lee <carpeta>/propuesta/tokens.css y slides.part.html)
import sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
d = root / sys.argv[1] / 'propuesta'
base = (root / 'tools' / 'slides-base.css').read_text()
tokens = (d / 'tokens.css').read_text()
body = (d / 'slides.part.html').read_text()
title = (d / 'title.txt').read_text().strip()
fonts = (d / 'fonts.txt').read_text().strip()
html = f'''<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="{fonts}">
<style>
{base.replace('/*TOKENS*/', tokens)}
</style>
</head>
<body>
{body}
</body>
</html>
'''
(d / 'slides.html').write_text(html)
print('ok', d / 'slides.html')
