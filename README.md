# Iglesia Bíblica Gracia Cajamarca — sitio web

Sitio web de la iglesia, construido con React + TypeScript + Vite + Tailwind CSS.
Es un sitio estático por ahora (sin base de datos ni backend); está pensado para
desplegarse en **Azure Static Web Apps** y evolucionar más adelante hacia un
sitio del instituto con base de datos y API (por ejemplo, Azure Functions +
Azure SQL / Cosmos DB).

## Requisitos

- Node.js 20+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

```bash
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción localmente
npm run lint      # oxlint
```

## Configuración del contenido

Toda la información específica de la iglesia vive en `src/data/`, para que sea
fácil de editar sin tocar los componentes:

- **`src/data/config.ts`** — nombre, dirección, teléfono, correo, redes
  sociales, mapa de Google Maps embebido, y el ID del canal de YouTube.
- **`src/data/ministries.ts`** — tarjetas de ministerios (ícono, nombre,
  descripción, en español e inglés).
- **`src/data/events.ts`** — próximos eventos (fecha, hora, lugar, en español
  e inglés).
- **`src/i18n/translations.ts`** — todos los textos fijos del sitio (menú,
  encabezados, etc.) en español e inglés. El idioma se detecta del navegador
  y se guarda en `localStorage`.

### Transmisión en vivo de YouTube (Sermones)

El sitio usa el embed especial de YouTube `embed/live_stream?channel=...`,
que muestra automáticamente lo que el canal esté transmitiendo en vivo en ese
momento — sin necesidad de API keys, backend, ni actualizar nada
manualmente. Para activarlo:

1. Ve a https://www.youtube.com/account_advanced (con la sesión del canal de
   la iglesia iniciada) y copia el **ID del canal** (empieza con `UC...`).
2. Pégalo en `src/data/config.ts`:

   ```ts
   export const YOUTUBE_CHANNEL_ID: string = 'UCxxxxxxxxxxxxxxxxxxxxxxxx'
   ```

3. Guarda y recarga. La página de Sermones (y la vista previa en Inicio)
   mostrarán la transmisión en vivo automáticamente cuando el canal esté
   transmitiendo, y la lista de prédicas anteriores (uploads playlist) el
   resto del tiempo. Mientras `YOUTUBE_CHANNEL_ID` esté vacío, se muestra un
   mensaje y un enlace al canal.

### Mapa de Google Maps

`churchInfo.googleMapsEmbedSrc` en `src/data/config.ts` tiene un embed de
ejemplo. Reemplázalo por el real: en Google Maps, busca la dirección → Compartir
→ Insertar un mapa → copia la URL del `src` del iframe.

## Despliegue en Azure Static Web Apps

1. Sube este proyecto a un repositorio de GitHub.
2. En Azure Portal, crea un recurso **Static Web App**:
   - Build presets: **React**
   - App location: `/`
   - Output location: `dist`
3. Azure creará automáticamente un GitHub Actions workflow
   (`.github/workflows/azure-static-web-apps-*.yml`) que compila y despliega
   el sitio en cada push a la rama principal.
4. `staticwebapp.config.json` (incluido en este repo) configura el
   *fallback* de rutas para que la navegación de React Router funcione
   correctamente en Azure (recargar `/contacto`, por ejemplo, no debe dar 404).

### Evolución futura (instituto con base de datos)

Cuando el sitio crezca para incluir cursos, inscripciones, usuarios, etc., el
camino natural sobre la misma infraestructura de Azure es:

- **Azure Static Web Apps + Azure Functions** (API integrada) para lógica de
  servidor, o **Azure App Service** si se necesita más control.
- **Azure SQL Database** o **Azure Cosmos DB** para persistencia.
- **Microsoft Entra ID / autenticación integrada de Static Web Apps** si se
  necesita login de estudiantes/administradores.

La estructura actual (datos separados en `src/data/`, componentes de
presentación separados de los datos) está pensada para que esos archivos se
reemplacen más adelante por llamadas a una API sin rehacer las páginas.
