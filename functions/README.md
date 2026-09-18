# Church website backend — Azure Functions

Standalone Azure Function App (separate from the static site) that backs
two things: the Sermones page's live/playlist data, and the Contact page's
"send message" form. It's standalone (not Static Web Apps' built-in
"Managed Functions") because that only supports HTTP triggers, and the
sermons polling needs a Timer trigger — a separate Function App like this
one is required for that, and works fine on the **Free**/Consumption tier.

Four functions:

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
- **`sendContactMessage`** (HTTP `POST /api/contact`) — the Contact page's
  form posts `{ name, email, message }` here; it sends an email via Azure
  Communication Services (see setup below) to the church's inbox, with
  `replyTo` set to the visitor's address so replying goes straight to them.
  Includes a honeypot field (`website`) for basic spam filtering with no
  external CAPTCHA dependency.

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

## 3. Set up Azure Communication Services (for the contact form)

1. Azure Portal → Create a resource → **"Email Communication Services"** →
   Create. Any region.
2. Inside that resource → **Provision domains** → **Add domain** → pick
   **Azure Managed Domain** — this gives you a working sender address
   instantly (`DoNotReply@<random>.azurecomm.net`), no DNS records to add.
   (You can add your own domain later under **Custom domains** if you'd
   rather send from `@ibgcajamarca.org` — that needs a few DNS TXT/CNAME
   records at your registrar, similar to what we did for the site's custom
   domain, but isn't required for this to work.)
3. Create a **"Communication Services"** resource (a different resource
   type, despite the similar name) → Create → on the **Email** tab, link
   the Email Communication Services resource from step 1 as its domain.
4. Communication Services resource → **Keys** (left sidebar) → copy the
   **Connection string**.
5. Note the sender address from step 2 (Email Communication Services →
   Provision domains → your domain → the `DoNotReply@...azurecomm.net`
   address shown there) — you'll need both values in the next step.

## 4. Configure locally

```bash
cp local.settings.json.example local.settings.json
```

Fill in `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, and `YOUTUBE_PLAYLISTS_JSON`
(a JSON array of `{ "id": "...", "label": "..." }`, one per playlist you
want shown — the label is what's displayed as the section heading, in
whichever language you write it), plus `ACS_CONNECTION_STRING`,
`ACS_SENDER_ADDRESS`, and `CONTACT_RECIPIENT_EMAIL` (where contact form
messages get delivered — usually the same as `churchInfo.email` in the
site's `src/data/config.ts`) from step 3 above.

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
9am–1pm Lima time when you run it — see `src/lib/schedule.ts`. Test the
contact endpoint with:

```bash
curl -X POST http://localhost:7071/api/contact -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## 5. Deploy to Azure

1. Create a **Function App** in the Azure Portal: Runtime stack "Node.js",
   version 20 LTS, hosting plan **Consumption** (Y1) — this is the free
   tier that still supports Timer triggers, unlike SWA Managed Functions.
2. Under **Environment variables** (Configuration → Application settings in
   older portal layouts), add `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`,
   `YOUTUBE_PLAYLISTS_JSON`, `ACS_CONNECTION_STRING`, `ACS_SENDER_ADDRESS`,
   `CONTACT_RECIPIENT_EMAIL` (same values as your `local.settings.json`),
   and `ALLOWED_ORIGIN` set to the site's real domain (e.g.
   `https://www.ibgcajamarca.org`) once it's live — this locks down both
   `getSermons` and `sendContactMessage`'s CORS response instead of
   allowing any origin.
3. Deploy from this folder — easiest via VS Code's "Azure Functions"
   extension: sign in, right-click the `functions` folder → **"Deploy to
   Function App..."** → pick your Function App. (Or `func azure
   functionapp publish <your-function-app-name>` if you have Azure
   Functions Core Tools installed, or wire up a GitHub Actions workflow via
   the Function App's "Deployment Center" — scoped to the `functions/`
   folder as the app root.)
4. Copy the Function App's URL (`https://<name>.azurewebsites.net`) and set
   it as both `VITE_SERMONS_API_URL=https://<name>.azurewebsites.net/api/sermons`
   and `VITE_CONTACT_API_URL=https://<name>.azurewebsites.net/api/contact`
   in the website's own build configuration (GitHub Actions repo secrets,
   or `.env.local` for local dev of the website) — see the root `README.md`.

## Why polling instead of a webhook

YouTube doesn't offer a simple webhook for "this channel just went live"
without setting up PubSubHubbub/WebSub subscriptions and a public callback
endpoint with its own verification handshake — meaningfully more moving
parts for a small church site. A 5-minute poll is a reasonable trade-off:
it's near-real-time for viewers, costs only a handful of YouTube API quota
units per run (see the comment in `src/lib/youtube.ts` for the exact
budget), and needs no extra infrastructure beyond this one Function App.
