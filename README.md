# Model Portal (Minimal WebRTC + Ably Signaling)

This repo is a ready-to-deploy rebuild of your Model Portal with:
- One-to-one WebRTC video room at `/room/<slug>`
- Ably Realtime signaling with Presence (for online badge)
- TURN/STUN via `/api/ice` (supports Xirsys or static TURN)
- Simple dashboard & redirect flow (no real auth)

## Files
- `index.html` → link to login
- `login.html` → redirects to dashboard
- `dashboard.html` → "Go Live" link to `/room/taylored2u?host=1`
- `room.html` → WebRTC UI (local + remote video, presence counter)
- `vercel.json` → rewrite `/room/(.*)` to `room.html`
- `api/ably-token.js` → Ably token issuance
- `api/ice.js` → TURN/STUN config (reads from env)
- `api/presence.js` → Online status for member site
- `package.json` → dependency: `ably`

## Environment Variables (Vercel → Settings → Environment Variables)
Required:
- `ABLY_API_KEY`

TURN options (choose one path):
- `ICE_JSON` → a JSON array of iceServers
- or `TURN_URL` (comma-separated), `TURN_USERNAME`, `TURN_CREDENTIAL`
- or `XIRSYS_IDENT`, `XIRSYS_SECRET`, `XIRSYS_CHANNEL`

## Member Site "Online" Badge
Poll:
```
GET https://<portal-domain>/api/presence?room=taylored2u
→ { "room": "taylored2u", "online": true, "count": 1 }
```

## Deploy
1. Push to GitHub.
2. Import repo into Vercel.
3. Add env vars.
4. Deploy. Done.

## Troubleshooting
- Use HTTPS/WSS.
- Check `/api/ice` returns a TURN server (DevTools → Network).
- If embedded in an iframe, set `allow="camera; microphone; autoplay"` and verify Permissions-Policy.
- Use `chrome://webrtc-internals` to debug ICE.
