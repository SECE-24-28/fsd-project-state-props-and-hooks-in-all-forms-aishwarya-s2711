/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

/** Deterministic hash — avoids storing plaintext passwords in localStorage */
function mockHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return 'hashed_' + h.toString(16);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tg_user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('tg_token') || null);

  /* ── persist helper ── */
  const persist = (tok, usr) => {
    localStorage.setItem('tg_token', tok);
    localStorage.setItem('tg_user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
  };

  /* ── LOGIN ── */
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      persist(data.token, data.user);
      return { success: true, user: data.user };
    } catch {
      // Backend unavailable → fall back to local demo accounts
      return localLogin(email, password);
    }
  };

  const localLogin = (email, password) => {
    const DEMO = [
      { id: '1', name: 'Admin User',  email: 'admin@travelgo.com', passHash: mockHash('admin123'), role: 'admin' },
      { id: '2', name: 'Agent User',  email: 'agent@travelgo.com', passHash: mockHash('agent123'), role: 'agent' },
    ];
    const found = DEMO.find(u => u.email === email && u.passHash === mockHash(password));
    if (found) {
      const safe = { ...found };
      delete safe.passHash;
      const tok = 'demo_' + safe.role + '_' + Date.now();
      persist(tok, safe);
      return { success: true, user: safe };
    }
    const users = JSON.parse(localStorage.getItem('tg_users') || '[]');
    const u = users.find(x => x.email === email && x.passHash === mockHash(password));
    if (u) {
      const safe = { ...u };
      delete safe.passHash;
      const tok = 'local_' + safe.id + '_' + Date.now();
      persist(tok, safe);
      return { success: true, user: safe };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  /* ── SIGNUP ── */
  const signup = async (formData) => {
    try {
      const { data } = await api.post('/auth/signup', formData);
      persist(data.token, data.user);
      return { success: true };
    } catch {
      // Backend unavailable → store locally
      const users = JSON.parse(localStorage.getItem('tg_users') || '[]');
      if (users.find(u => u.email === formData.email))
        return { success: false, message: 'Email already registered' };
      const { password, ...rest } = formData;
      const newUser = {
        id: Date.now().toString(),
        ...rest,
        passHash: mockHash(password),
        role: formData.role || 'user',
      };
      users.push(newUser);
      localStorage.setItem('tg_users', JSON.stringify(users));
      const safe = { ...newUser };
      delete safe.passHash;
      const tok = 'local_' + safe.id;
      persist(tok, safe);
      return { success: true };
    }
  };

  /* ── LOGOUT ── */
  const logout = () => {
    localStorage.removeItem('tg_token');
    localStorage.removeItem('tg_user');
    setUser(null);
    setToken(null);
  };

  /* ── GET PROFILE from backend ── */
  const refreshUser = async () => {
    const tok = localStorage.getItem('tg_token');
    // Don't hit the backend with demo/local tokens — they will 401 and
    // the old interceptor would have redirected; now we just skip.
    if (!tok || tok.startsWith('demo_') || tok.startsWith('local_')) return;
    try {
      const { data } = await api.get('/auth/me');
      localStorage.setItem('tg_user', JSON.stringify(data));
      setUser(data);
    } catch { /* ignore — offline or token expired */ }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      signup,
      logout,
      refreshUser,
      isLoggedIn: !!user,
      isAdmin:    user?.role === 'admin',
      isAgent:    user?.role === 'agent',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
