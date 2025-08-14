module.exports = async (_req, res) => {
  try {
    if (process.env.ICE_JSON) { try { const a=JSON.parse(process.env.ICE_JSON); if (Array.isArray(a)) return res.status(200).json({ iceServers: a }); } catch {} }
    if (process.env.TURN_URL) {
      const urls = process.env.TURN_URL.split(',').map(u=>u.trim()).filter(Boolean);
      const iceServers = [{ urls }];
      const u = process.env.TURN_USERNAME, p = process.env.TURN_CREDENTIAL;
      if (u && p) { iceServers[0].username=u; iceServers[0].credential=p; }
      return res.status(200).json({ iceServers });
    }
    const ident = process.env.XIRSYS_IDENT, secret = process.env.XIRSYS_SECRET, channel = process.env.XIRSYS_CHANNEL || 'localgirls';
    if (ident && secret) {
      const endpoint = `https://global.xirsys.net/_turn/${encodeURIComponent(channel)}`;
      const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + Buffer.from(`${ident}:${secret}`).toString('base64') };
      try {
        const r = await fetch(endpoint, { method: 'PUT', headers, body: JSON.stringify({ format: 'ice' }) });
        const j = await r.json();
        const list = (j && (j.v && j.v.iceServers || j.iceServers)) || null;
        if (Array.isArray(list) && list.length) return res.status(200).json({ iceServers: list });
      } catch (e) {}
    }
    return res.status(200).json({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });
  } catch (e) {
    return res.status(200).json({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });
  }
};
