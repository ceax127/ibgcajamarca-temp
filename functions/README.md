# Sermones — Azure Function backend

Standalone Azure Function App (separate from the static site) that polls
YouTube on a timer and serves the result to the church website. It exists
because Azure Static Web Apps' built-in "Managed Functions" only support
HTTP triggers — a Timer trigger (needed for polling) requires either a
separate Function App like this one (works on the **Free**/Consumption
tier) or linking a "bring your own backend" into Static Web Apps, which
needs the paid Standard plan. This keeps the whole site on free tiers.

Three functions:

- **`pollLiveStatus`** (Timer, fires every 5 minutes, every day) — but only
  actually calls YouTube during the church's Sunday service window
  (~9am–1pm Lima time, hardcoded in `src/lib/schedule.ts` since Lima is
  UTC-5 year-round). Every other invocation is a no-op. This matters
  because the church only streams live on Sundays — polling YouTube every 5
  minutes around the clock would mean ~98% of those calls check a status
  that never changes.
- **`pollPlaylists`** (Timer, every 6 hours, every day) — fetches the
  channel's "uploads" playlist plus every curated playlist. New sermons go
  up roughly once a week, so this only needs to be coarse; it doesn't need
  the Sunday-only restriction since content can in principle be uploaded
  any day.
- **`getSermons`** (HTTP `GET /api/sermons`) — serves the cached result (a
  merge of whatever `pollLiveStatus` and `pollPlaylists` last wrote). The
  website's frontend calls this, polling it every 60s while the
  Sermones/Home page is open — it never calls YouTube directly, so there's
  no API key in the browser and no per-visitor YouTube quota usage.

### Quota budget

At 5 min/24-7 (the old single-timer design), worst case was ~1,152 units/day
(12% of the 10,000/day default quota) — never actually at risk of running
out, but wasteful relative to how the channel is actually used. The current
split schedule cuts that dramatically: live checks only run during ~4 hours
on Sundays (≈48 calls/week, 1 unit each when a candidate is found), and
playlist checks run 4×/day every day (≈28 calls/week × ~3 playlists ≈ 84
units/week). Total is well under 1,000 units/week instead of up to 8,000.

## 1. Get a YouTube Data API v3 key

1. Go to [console.cloud.google.com](https://console.cloud.google.com), sign
   in with the account that manages the church's YouTube channel (or any
   Google account), and create a project (or pick an existing one).
2. **APIs & Services → Library** → search "YouTube Data API v3" → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → API key**. Copy it.
4. Click **Restrict key** → under "API restrictions" pick "Restrict key" →
   select only "YouTube Data API v3", so the key can't be used for anything
   else if it ever leaks.

## 2. Find the channel ID and playlist IDs

- **Channel ID**: [youtube.com/account_advanced](https://www.youtube.com/account_advanced)
  while signed into the channel — starts with `UC...`.
- **Playlist IDs**: open the playlist on YouTube, copy the `list=` value
  from the URL (starts with `PL...`).

## 3. Configure locally

```bash
cp local.settings.json.example local.settings.json
```

Fill in `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, and `YOUTUBE_PLAYLISTS_JSON`
(a JSON array of `{ "id": "...", "label": "..." }`, one per playlist you
want shown — the label is what's displayed as the section heading, in
whichever language you write it).

`local.settings.json` is gitignored — never commit it.

### Run locally

Requires [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)
and the [Azurite storage emulator](https://learn.microsoft.com/azure/storage/common/storage-use-azurite)
(`npm install -g azurite`, then run `azurite` in a separate terminal — the
timer trigger needs a storage account even locally).

```bash
npm install
npm start
```

This starts the Function App at `http://localhost:7071`. Trigger a poll
manually instead of waiting for the schedule:

```bash
curl -X POST http://localhost:7071/admin/functions/pollPlaylists -H "Content-Type: application/json" -d "{}"
curl -X POST http://localhost:7071/admin/functions/pollLiveStatus -H "Content-Type: application/json" -d "{}"
curl http://localhost:7071/api/sermons
```

Note `pollLiveStatus` only does anything if it's actually Sunday
9am–1pm Lima time when you run it — see `src/lib/schedule.ts`.

## 4. Deploy to Azure

1. Create a **Function App** in the Azure Portal: Runtime stack "Node.js",
   version 20 LTS, hosting plan **Consumption** (Y1) — this is the free
   tier that still supports Timer triggers, unlike SWA Managed Functions.
2. Under **Configuration → Application settings**, add `YOUTUBE_API_KEY`,
   `YOUTUBE_CHANNEL_ID`, `YOUTUBE_PLAYLISTS_JSON` (same values as your
   `local.settings.json`), and `ALLOWED_ORIGIN` set to the site's real
   domain (e.g. `https://ibgcajamarca.org`) once it's live — this locks
   down `getSermons`'s CORS response instead of allowing any origin.
3. Deploy from this folder:

   ```bash
   npm run build
   func azure functionapp publish <your-function-app-name>
   ```

   Or wire up a GitHub Actions workflow (Azure's Function App "Deployment
   Center" can generate one, scoped to the `functions/` folder as the app
   root).
4. Copy the Function App's URL (`https://<name>.azurewebsites.net`) and set
   it as `VITE_SERMONS_API_URL=https://<name>.azurewebsites.net/api/sermons`
   in the website's own deployment configuration (Azure Static Web Apps →
   Configuration → Application settings, or `.env.local` for local dev of
   the website) — see the root `README.md`.

## Why polling instead of a webhook

YouTube doesn't offer a simple webhook for "this channel just went live"
without setting up PubSubHubbub/WebSub subscriptions and a public callback
endpoint with its own verification handshake — meaningfully more moving
parts for a small church site. A 5-minute poll is a reasonable trade-off:
it's near-real-time for viewers, costs only a handful of YouTube API quota
units per run (see the comment in `src/lib/youtube.ts` for the exact
budget), and needs no extra infrastructure beyond this one Function App.
