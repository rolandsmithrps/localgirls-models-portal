import Ably from "ably";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.ABLY_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "missing_env", message: "ABLY_API_KEY not set" });
    const client = new Ably.Rest(apiKey);
    const tokenRequest = await client.auth.createTokenRequest({ clientId: "browser" });
    res.status(200).json(tokenRequest);
  } catch (e) {
    res.status(500).json({ error: "token_error", message: e.message });
  }
}
