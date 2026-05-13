// ws-client.js — WebSocket relay client for the travel-hospitality audience site
// Connects to a relay, emits envelope events, auto-reconnects, sends heartbeats.
// Exposes window.WS_CLIENT with connect / stepView / selection / register / send.

(function () {
  'use strict';

  const DEFAULT_RELAY_URL = "wss://real-estate-live-demo.onrender.com/ws";
  const HEARTBEAT_INTERVAL_MS = 15000;
  const MAX_RECONNECT_DELAY_MS = 30000;
  const DEBUG = true; // set false to silence console logs

  let ws = null;
  let reconnectAttempts = 0;
  let reconnectTimer = null;
  let heartbeatTimer = null;
  let relayUrl = DEFAULT_RELAY_URL;
  let statusListener = null;

  function log(...args) { if (DEBUG) console.log('[WS]', ...args); }
  function logOut(envelope) { if (DEBUG) console.log('%c[WS →]', 'color:#C9A961', envelope.eventType, envelope); }
  function logIn(data) { if (DEBUG) console.log('%c[WS ←]', 'color:#9AA4B0', data); }

  function getOrCreateDeviceId() {
    let id = localStorage.getItem('demoDeviceId');
    if (!id) {
      id = 'd_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('demoDeviceId', id);
    }
    return id;
  }

  function getOrCreateSessionId() {
    let id = sessionStorage.getItem('demoSessionId');
    if (!id) {
      id = 's_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      sessionStorage.setItem('demoSessionId', id);
    }
    return id;
  }

  function setStatus(state) { if (statusListener) statusListener(state); }

  function connect(opts) {
    opts = opts || {};
    if (opts.relayUrl) relayUrl = opts.relayUrl;
    if (opts.onStatus) statusListener = opts.onStatus;

    if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) return;

    log('connecting to', relayUrl);
    setStatus('connecting');

    try {
      ws = new WebSocket(relayUrl);
    } catch (e) {
      console.warn('[WS] constructor failed:', e);
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      reconnectAttempts = 0;
      log('connected ✓');
      setStatus('connected');
      send('presence');
      startHeartbeat();
    };
    ws.onclose = (e) => {
      stopHeartbeat();
      log('closed', e.code, e.reason);
      setStatus('offline');
      scheduleReconnect();
    };
    ws.onerror = (e) => { log('error', e); };
    ws.onmessage = (event) => {
      logIn(event.data);
      // Relay's hello / relay:connected messages ignored on the app side
    };
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    const delay = Math.min(MAX_RECONNECT_DELAY_MS, 1000 * Math.pow(2, reconnectAttempts));
    reconnectAttempts++;
    log('reconnecting in', delay, 'ms (attempt', reconnectAttempts + ')');
    reconnectTimer = setTimeout(() => { reconnectTimer = null; connect(); }, delay);
  }

  function startHeartbeat() {
    stopHeartbeat();
    heartbeatTimer = setInterval(() => send('presence'), HEARTBEAT_INTERVAL_MS);
  }
  function stopHeartbeat() {
    if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
  }

  function send(eventType, payload) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      if (DEBUG) console.warn('[WS →] skipped (socket not open):', eventType);
      return;
    }
    const cfg = window.BRAND_CONFIG;
    const envelope = Object.assign({
      type: 'event',
      eventType: eventType,
      demoKey: (cfg && cfg.demoKey) ? cfg.demoKey : 'UNKNOWN',
      deviceId: getOrCreateDeviceId(),
      sessionId: getOrCreateSessionId(),
      siteUrl: window.location.origin,
      timestamp: Date.now()
    }, payload || {});

    try {
      ws.send(JSON.stringify(envelope));
      logOut(envelope);
    }
    catch (e) { console.warn('[WS] send failed:', e); }
  }

  window.addEventListener('beforeunload', () => {
    try { send('disconnect'); if (ws) ws.close(); } catch (e) {}
  });

  window.WS_CLIENT = {
    connect: connect,
    send: send,
    stepView: function (stepNumber) { send('step_view', { step: stepNumber }); },
    selection: function (field, value, extra) {
      send('selection', Object.assign({ field: field, value: value }, extra || {}));
    },
    register: function (state) {
      const fullName = state.fullName || '';
      const parts = fullName.split(/\s+/).filter(Boolean);
      send('register', {
        fullName: fullName,
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' '),
        email: state.email || '',
        phone: state.phone || '',
        photo: state.photo || null,
        summary: {
          location: state.location,
          budget: state.budget,
          budgetTier: state.budgetTier,
          guests: state.guests,
          occasion: state.occasion
        }
      });
    }
  };
})();
