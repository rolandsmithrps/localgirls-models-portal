const Ably = require('ably/promises');

module.exports = async (req, res) => {
  // CORS: allow browser fetches from member site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const apiKey = process.env.ABLY_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'missing_env', message: 'ABLY_API_KEY not set' });
    const client = new Ably.Rest(apiKey);

    const room = (req.query && req.query.room) || (req.body && req.body.room);
    if (!room) return res.status(400).json({ error: 'bad_request', message: 'room query param required' });

    const channel = client.channels.get('room:' + room);
    const members = await channel.presence.get();
    const online = Array.isArray(members) && members.length > 0;

    return res.status(200).json({ room, online, count: members.length });
  } catch (e) {
    return res.status(500).json({ error: 'presence_error', message: e.message || String(e) });
  }
};
