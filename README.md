# bigmelo-blog

Blog editorial bilingüe de Bigmelo, construido con Astro, MDX y TypeScript.

## Organización

- La raíz contiene Docker, infraestructura y automatización.
- El proyecto Astro vive en `src/`.
- Los artículos están en `src/src/content/blog/{es,en}`.
- Las categorías están en `src/src/data/categories/{es,en}`.
- Producción es un sitio estático privado en S3, servido por CloudFront.

## Desarrollo local

```bash
cp src/.env.example src/.env
docker compose up --build
```

El blog queda disponible en http://localhost:3002.

También puede ejecutarse sin Docker:

```bash
cd src
npm ci
npm run dev
```

Astro queda disponible en http://localhost:4321.

## Crear un artículo

1. Duplica un archivo `.mdx` del idioma correspondiente.
2. Actualiza título, descripción, fechas, categorías, etiquetas e imagen.
3. Usa `draft: true` mientras no deba aparecer en producción.
4. Ejecuta `npm run check && npm run build` antes de publicar.

Los cambios enviados a la rama `prod` se despliegan en https://blog.bigmelo.com.
