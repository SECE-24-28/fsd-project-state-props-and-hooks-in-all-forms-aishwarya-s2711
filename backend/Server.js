const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

// ── Validate env vars ─────────────────────────────────────────────────────────
['MONGO_URL', 'JWT_SECRET'].forEach(k => {
  if (!process.env[k]) { console.error(`❌ Missing env var: ${k}`); process.exit(1); }
});

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS — allow Vite dev server + localhost ──────────────────────────────────
const ALLOWED = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
const corsOpts = {
  origin: (origin, cb) => (!origin || ALLOWED.includes(origin)) ? cb(null, true) : cb(null, true), // allow all in dev
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOpts));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Dev request logger ────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ── Health & root — MUST be before 404 handler ────────────────────────────────
app.get('/', (_req, res) => res.json({ message: 'TravelGo API \u2705', status: 'running', version: '1.0.0' }));

app.get('/api/health', (_req, res) => {
  const states = ['disconnected','connected','connecting','disconnecting'];
  res.json({
    status:    'ok',
    mongo:     states[mongoose.connection.readyState] || 'unknown',
    uptime:    `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    env:       process.env.NODE_ENV || 'development',
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routers/authRoutes'));
app.use('/api/packages', require('./routers/packageRoutes'));
app.use('/api/bookings', require('./routers/bookingRoutes'));
app.use('/api/users',    require('./routers/userrouter'));
app.use('/api/admin',    require('./routers/adminRoutes'));
app.use('/api/reviews',  require('./routers/reviewRoutes'));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: `Not found: ${req.method} ${req.path}` }));

// ── Global error handler ──────────────────────────────────────────────────────
// 4-arg signature required by Express — do NOT remove _next
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ message: `${field} already exists` });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// ── MongoDB + Boot ────────────────────────────────────────────────────────────
mongoose.connection.on('disconnected', () => console.warn('\u26A0\uFE0F  MongoDB disconnected'));
mongoose.connection.on('reconnected',  () => console.log('\u2705 MongoDB reconnected'));
mongoose.connection.on('error',        e  => console.error('\u274C MongoDB error:', e.message));

(async () => {
  try {
    console.log('\uD83D\uDD04 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS:          45000,
      maxPoolSize:              10,
    });
    console.log(`\u2705 MongoDB connected  DB:${mongoose.connection.name}  Host:${mongoose.connection.host}`);
  } catch (err) {
    console.error('\u274C MongoDB connection failed:', err.message);
    console.error('   Tip: Check MONGO_URL in backend/.env and Atlas IP whitelist');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log('');
    console.log('\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510');
    console.log('\u2502  \uD83D\uDE80 TravelGo Backend running              \u2502');
    console.log(`\u2502  URL   : http://localhost:${PORT}              \u2502`);
    console.log(`\u2502  Health: http://localhost:${PORT}/api/health    \u2502`);
    console.log('\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518');
  });
})();
