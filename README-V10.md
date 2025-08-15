# Model Portal v10 — Host with Zoom (Meeting SDK)

## What you get
- `dashboard.html` — visible **v10** badge + **Open as Host** button.
- `zoom-host.html` — hosts the Zoom meeting in the browser.
- `zoom-config.js` — set your Client ID (SDK Key), Meeting Number, Passcode.
- `api/zoom-signature.js` — serverless signature endpoint (required by Zoom SDK).
- `package.json` — `jsonwebtoken` dependency.

## Setup
1) In Zoom (General App with Meeting SDK enabled), copy **Client ID** and **Client Secret**.
2) Vercel → `models.localgirls.io` → Environment Variables:
   - `ZOOM_SDK_KEY` = Client ID
   - `ZOOM_SDK_SECRET` = Client Secret
3) Edit `/zoom-config.js` with:
   - `SDK_KEY` = Client ID
   - `MEETING_NUMBER` = recurring meeting ID (digits only)
   - `PASSCODE` = meeting passcode
4) Deploy. Open `/dashboard.html` and click **Open as Host**.
