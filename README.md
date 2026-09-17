# Iglesia Bíblica Gracia Cajamarca — sitio web

Sitio web de la iglesia, construido con React + TypeScript + Vite + Tailwind CSS.
Es principalmente un sitio estático, desplegado en **Azure Static Web Apps**,
con una única pieza dinámica: la página de Sermones, respaldada por una Azure
Function independiente (`functions/`) que sondea YouTube — ver más abajo.
Está pensado para evolucionar más adelante hacia un sitio del instituto con
base de datos y API (por ejemplo, más Azure Functions + Azure SQL / Cosmos DB).

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
  sociales, y mapa de Google Maps embebido. (El canal/playlists de YouTube
  se configuran aparte, como variables de entorno — ver la siguiente
  sección.)
- **`src/data/ministries.ts`** — tarjetas de ministerios (ícono, nombre,
  descripción, en español e inglés).
- **`src/data/events.ts`** — próximos eventos (fecha, hora, lugar, en español
  e inglés).
- **`src/i18n/translations.ts`** — todos los textos fijos del sitio (menú,
  encabezados, etc.) en español e inglés. El idioma se detecta del navegador
  y se guarda en `localStorage`.

### Transmisión en vivo y prédicas de YouTube (Sermones)

La página de Sermones **no llama a YouTube directamente desde el
navegador**. En su lugar:

1. Una **Azure Function independiente** (carpeta [`functions/`](functions/))
   revisa cada 5 minutos si el canal está en vivo y trae los videos más
   recientes de las listas de reproducción configuradas, y guarda el
   resultado en Blob Storage.
2. El sitio llama a esa Function (`GET /api/sermons`) y vuelve a consultarla
   cada 60 segundos mientras la página está abierta, para reflejar cambios
   de "en vivo" sin recargar.
3. Además, un script de **build-time** (`scripts/fetch-sermons.mjs`, que
   corre automáticamente antes de `npm run build` vía `prebuild`) trae una
   foto inicial de los mismos datos y la guarda en
   `src/data/sermons.generated.json`, para que el sitio siempre tenga
   contenido real incluso antes de que la Function haga su primer sondeo, o
   si llegara a fallar temporalmente.

Ver [`functions/README.md`](functions/README.md) para: cómo conseguir una
API key de YouTube Data API v3, dónde sacar el Channel ID y los IDs de las
listas de reproducción, y cómo desplegar la Function a Azure. Para
desarrollo local, copia `.env.local.example` a `.env.local` y llena esos
mismos valores — así `npm run dev` / `npm run build` usan datos reales sin
necesitar la Function desplegada.

Mientras no haya credenciales configuradas (ni localmente ni en la Function
desplegada), la sección de Sermones muestra un mensaje y un enlace al canal,
sin romperse.

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
5. En **Configuration → Application settings** del recurso Static Web App,
   agrega `VITE_SERMONS_API_URL` con la URL de la Azure Function desplegada
   (ver [`functions/README.md`](functions/README.md)), por ejemplo
   `https://ibg-cajamarca-sermons.azurewebsites.net/api/sermons` — y agrega
   las mismas variables (`YOUTUBE_API_KEY`, etc.) como *build secrets* del
   workflow de GitHub Actions si quieres que el paso `prebuild` también
   traiga datos reales en cada build (opcional, ya que la Function los sirve
   en tiempo real de todas formas).

La Function de Sermones (`functions/`) es un recurso de Azure aparte —no se
despliega junto con el sitio— porque las *Managed Functions* integradas de
Static Web Apps (gratis) solo soportan triggers HTTP, y el sondeo cada 5
minutos necesita un trigger de tipo Timer. Ver
[`functions/README.md`](functions/README.md) para desplegarla (sigue
funcionando en el nivel gratuito de Azure Functions).

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
