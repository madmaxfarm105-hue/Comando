const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

async function verifyGoogleToken(token) {
  if (!token) {
    throw new Error('Google token not provided');
  }

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Invalid Google token payload');
  }

  return payload;
}

module.exports = { verifyGoogleToken };