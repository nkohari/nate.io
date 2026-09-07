#!/usr/bin/env node

const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const DEFAULT_PORT = 3001;
const DEFAULT_CALLBACK_PATH = '/spotify/auth';
const DEFAULT_SCOPES = ['user-read-currently-playing', 'user-top-read'];

function parseArgs(argv) {
  const args = {
    callbackPath: DEFAULT_CALLBACK_PATH,
    port: DEFAULT_PORT,
    scopes: DEFAULT_SCOPES,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--port' && next) {
      args.port = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === '--redirect-uri' && next) {
      args.redirectUri = next;
      index += 1;
    } else if (arg === '--scope' && next) {
      args.scopes = next.split(/[,\s]+/).filter(Boolean);
      index += 1;
    } else if (arg === '--callback-path' && next) {
      args.callbackPath = next.startsWith('/') ? next : `/${next}`;
      index += 1;
    } else {
      throw new Error(`Unknown or incomplete option: ${arg}`);
    }
  }

  if (!Number.isInteger(args.port) || args.port < 1 || args.port > 65535) {
    throw new Error('--port must be an integer between 1 and 65535.');
  }

  return args;
}

function printHelp() {
  console.log(`
Usage:
  npm run spotify:auth
  npm run spotify:auth -- --port 9090
  npm run spotify:auth -- --redirect-uri http://127.0.0.1:3001/spotify/auth

Before running, add the redirect URI to your Spotify app:
  http://127.0.0.1:3001/spotify/auth

Options:
  --port <port>             Local callback port. Default: ${DEFAULT_PORT}
  --callback-path <path>    Local callback path. Default: ${DEFAULT_CALLBACK_PATH}
  --redirect-uri <uri>      Full redirect URI. Overrides --port and --callback-path.
  --scope <scopes>          Space- or comma-separated scopes.
`);
}

function readEnvFile(envPath) {
  if (!fs.existsSync(envPath)) {
    return { values: {}, lines: [] };
  }

  const text = fs.readFileSync(envPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const values = {};

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    values[match[1]] = unquoteEnvValue(match[2]);
  }

  return { values, lines };
}

function unquoteEnvValue(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function formatEnvValue(value) {
  if (/^[A-Za-z0-9._~:/+=-]+$/.test(value)) {
    return value;
  }

  return JSON.stringify(value);
}

function writeEnvValues(envPath, updates) {
  const { lines } = readEnvFile(envPath);
  const remaining = new Map(Object.entries(updates));
  const nextLines = lines.map((line) => {
    const match = line.match(/^(\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*=\s*)(.*)$/);

    if (!match || !remaining.has(match[2])) {
      return line;
    }

    const value = remaining.get(match[2]);
    remaining.delete(match[2]);
    return `${match[1]}${match[2]}${match[3]}${formatEnvValue(value)}`;
  });

  if (nextLines.length > 0 && nextLines[nextLines.length - 1] !== '') {
    nextLines.push('');
  }

  for (const [key, value] of remaining) {
    nextLines.push(`${key}=${formatEnvValue(value)}`);
  }

  fs.writeFileSync(envPath, `${nextLines.join('\n').replace(/\n+$/, '')}\n`);
}

function parseRedirectUri(redirectUri) {
  const url = new URL(redirectUri);

  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1') {
    throw new Error('Redirect URI must start with http://127.0.0.1.');
  }

  if (!url.port) {
    throw new Error('Redirect URI must include an explicit port, such as :8888.');
  }

  return url;
}

async function promptForMissingCredentials(env) {
  const rl = readline.createInterface({ input, output });

  try {
    if (!env.SPOTIFY_CLIENT_ID) {
      env.SPOTIFY_CLIENT_ID = await rl.question('Spotify client ID: ');
    }

    if (!env.SPOTIFY_CLIENT_SECRET) {
      env.SPOTIFY_CLIENT_SECRET = await rl.question('Spotify client secret: ');
    }
  } finally {
    rl.close();
  }

  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET) {
    throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are required.');
  }
}

function waitForAuthorizationCode({ callbackPath, port, state }) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url, `http://${request.headers.host}`);

      if (requestUrl.pathname !== callbackPath) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not found');
        return;
      }

      if (requestUrl.searchParams.get('state') !== state) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Spotify authorization failed: state mismatch.');
        reject(new Error('Spotify authorization failed: state mismatch.'));
        server.close();
        return;
      }

      const error = requestUrl.searchParams.get('error');
      if (error) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end(`Spotify authorization failed: ${error}`);
        reject(new Error(`Spotify authorization failed: ${error}`));
        server.close();
        return;
      }

      const code = requestUrl.searchParams.get('code');
      if (!code) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Spotify authorization failed: missing code.');
        reject(new Error('Spotify authorization failed: missing code.'));
        server.close();
        return;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(`
        <!doctype html>
        <meta charset="utf-8">
        <title>Spotify authorized</title>
        <body style="font-family: system-ui, sans-serif; line-height: 1.5; padding: 2rem;">
          <h1>Spotify authorized</h1>
          <p>You can close this tab and return to your terminal.</p>
        </body>
      `);

      resolve(code);
      server.close();
    });

    server.on('error', reject);
    server.listen(port);
  });
}

async function exchangeCodeForTokens({ clientId, clientSecret, code, redirectUri }) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    const description = body.error_description ? `: ${body.error_description}` : '';
    throw new Error(
      `Spotify token request failed (${response.status}): ${body.error}${description}`,
    );
  }

  if (!body.access_token || !body.refresh_token) {
    throw new Error('Spotify token response did not include both access_token and refresh_token.');
  }

  return body;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const envPath = path.resolve(process.cwd(), '.env');
  const { values: env } = readEnvFile(envPath);
  await promptForMissingCredentials(env);

  const redirectUri = args.redirectUri ?? `http://127.0.0.1:${args.port}${args.callbackPath}`;
  const redirectUrl = parseRedirectUri(redirectUri);
  const callbackPath = redirectUrl.pathname;
  const state = crypto.randomBytes(24).toString('hex');

  const authorizeUrl = new URL(AUTH_URL);
  authorizeUrl.searchParams.set('client_id', env.SPOTIFY_CLIENT_ID);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', args.scopes.join(' '));
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('show_dialog', 'true');

  const codePromise = waitForAuthorizationCode({
    callbackPath,
    port: Number.parseInt(redirectUrl.port, 10),
    state,
  });

  console.log('Open this URL in your browser and approve the Spotify app:\n');
  console.log(authorizeUrl.toString());
  console.log('\nWaiting for Spotify to redirect back...');

  const code = await codePromise;
  const tokens = await exchangeCodeForTokens({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    code,
    redirectUri,
  });

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  writeEnvValues(envPath, {
    SPOTIFY_CLIENT_ID: env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: tokens.refresh_token,
  });

  console.log('\nUpdated .env with fresh Spotify credentials.');
  console.log(`Access token expires at ${expiresAt}.`);
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
