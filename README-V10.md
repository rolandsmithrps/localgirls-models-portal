
# Model Portal v10 — Zoom Host (keeps your UI)
**Option A: Host in Zoom app (recommended)**
- No env vars needed on portal. Keep your UI. Members join via members site.

**Option B: Host in browser on the portal**
1) On Vercel for `models.localgirls.io`, set env vars: `ZOOM_SDK_KEY` (Client ID), `ZOOM_SDK_SECRET` (Client Secret).
2) Add these files to your portal repo: `zoom-host.html`, `zoom-config.js`, `api/zoom-signature.js`, `go-live-zoom-inject.js`.
3) On your portal page (dashboard/room), add before </body>:
   <script src="/go-live-zoom-inject.js" defer></script>
4) Edit `/zoom-config.js` with SDK key, meeting number, passcode.
5) Deploy. Click **Go Live (Zoom) — v10** to host via SDK.
