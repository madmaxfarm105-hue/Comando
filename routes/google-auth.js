// google-auth.js
// This file handles Google OAuth 2.0 authentication

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('YOUR_CLIENT_ID');

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_CLIENT_ID',  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = { verify };