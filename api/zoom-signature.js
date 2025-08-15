
/** Optional: only needed if hosting via portal domain. */
const jwt = require('jsonwebtoken');
const SDK_KEY = process.env.ZOOM_SDK_KEY;
const SDK_SECRET = process.env.ZOOM_SDK_SECRET;
module.exports = async (req, res) => {
  try {
    if (!SDK_KEY || !SDK_SECRET) return res.status(500).json({ error: 'Missing ZOOM_SDK_KEY or ZOOM_SDK_SECRET env vars' });
    const meetingNumber = (req.query && req.query.mn) || (req.body && req.body.mn);
    const role = Number((req.query && req.query.role) || (req.body && req.body.role) || 1);
    if (!meetingNumber) return res.status(400).json({ error: 'Missing meeting number (?mn=...)' });
    const iat = Math.round(Date.now()/1000) - 30; const exp = iat + 60*2;
    const payload = { sdkKey: SDK_KEY, mn: meetingNumber, role, iat, exp, appKey: SDK_KEY, tokenExp: exp };
    const signature = jwt.sign(payload, SDK_SECRET, { algorithm: 'HS256' });
    res.status(200).json({ signature });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
