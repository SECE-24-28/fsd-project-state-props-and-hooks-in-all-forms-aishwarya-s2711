const http = require('http');

function httpReq(method, path, body, token) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0,
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
    };
    const req = http.request(options, (res) => {
      let str = '';
      res.on('data', (c) => str += c);
      res.on('end', () => {
        try { resolve({ s: res.statusCode, b: JSON.parse(str) }); }
        catch { resolve({ s: res.statusCode, b: str }); }
      });
    });
    req.on('error', (e) => resolve({ s: 0, b: e.message }));
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  let pass = 0, fail = 0;
  const ok  = (m) => { pass++; console.log('  \u2705 ' + m); };
  const bad = (m) => { fail++; console.log('  \u274C ' + m); };

  console.log('\n--- API Route Tests (against running server on :5000) ---\n');

  // Root
  let r = await httpReq('GET', '/');
  r.s === 200 ? ok('GET /  → ' + r.s + '  "' + r.b.message + '"') : bad('GET / → ' + r.s);

  // Health
  r = await httpReq('GET', '/api/health');
  r.s === 200 ? ok('GET /api/health  → ' + r.s + '  mongo:' + r.b.mongo + '  uptime:' + r.b.uptime)
              : bad('GET /api/health → ' + r.s);

  // Packages
  r = await httpReq('GET', '/api/packages');
  r.s === 200 ? ok('GET /api/packages → ' + r.s + '  total:' + (r.b.total || 0))
              : bad('GET /api/packages → ' + r.s + ' ' + JSON.stringify(r.b));

  // Signup
  const email = 'apitest_' + Date.now() + '@travelgo.com';
  r = await httpReq('POST', '/api/auth/signup', { name: 'API Test', email, password: 'Api@1234', role: 'user' });
  let token = '';
  if (r.s === 201 && r.b.token) { ok('POST /api/auth/signup → 201  TOKEN_OK'); token = r.b.token; }
  else if (r.s === 400)          { ok('POST /api/auth/signup → 400 already exists'); }
  else                           { bad('POST /api/auth/signup → ' + r.s + ' ' + JSON.stringify(r.b)); }

  // Login
  r = await httpReq('POST', '/api/auth/login', { email, password: 'Api@1234' });
  if (r.s === 200 && r.b.token) { ok('POST /api/auth/login  → 200  TOKEN_OK'); token = r.b.token; }
  else                          { bad('POST /api/auth/login  → ' + r.s + ' ' + JSON.stringify(r.b)); }

  // /me
  if (token) {
    r = await httpReq('GET', '/api/auth/me', null, token);
    r.s === 200 ? ok('GET /api/auth/me       → 200  user:' + r.b.name + ' role:' + r.b.role)
                : bad('GET /api/auth/me       → ' + r.s);

    r = await httpReq('GET', '/api/bookings/my', null, token);
    r.s === 200 ? ok('GET /api/bookings/my   → 200  bookings:' + (Array.isArray(r.b) ? r.b.length : 0))
                : bad('GET /api/bookings/my   → ' + r.s + ' ' + JSON.stringify(r.b));
  }

  // Users — no auth (must 401)
  r = await httpReq('GET', '/api/users');
  (r.s === 401 || r.s === 403) ? ok('GET /api/users (no auth) → ' + r.s + ' blocked correctly')
                                : bad('GET /api/users → expected 401/403, got ' + r.s);

  console.log('\n  Passed:' + pass + '  Failed:' + fail + '\n');
  process.exit(fail === 0 ? 0 : 1);
})();
