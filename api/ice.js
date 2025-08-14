// /api/ice.js — CommonJS
module.exports = async (_req, res) => {
  try {
    const servers = [{ urls: ['stun:stun.l.google.com:19302'] }];
    if (process.env.TURN_URL && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL) {
      servers.push({
        urls: process.env.TURN_URL.split(','),
        username: process.env.TURN_USERNAME,
        credential: process.env.TURN_CREDENTIAL,
      });
    }
    if (process.env.ICE_JSON) {
      try {
        const extra = JSON.parse(process.env.ICE_JSON);
        if (Array.isArray(extra)) servers.push(...extra);
      } catch {}
    }
    res.status(200).json({ iceServers: servers });
  } catch (e) {
    res.status(200).json({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });
  }
};
