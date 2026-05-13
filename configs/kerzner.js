<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Travel & Hospitality Demo</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #0E1B2C;
      --surface: #16263B;
      --accent: #C9A961;
      --accent-rgb: 201, 169, 97;
      --text: #F0E9DD;
      --text-muted: #9AA4B0;
      --border: #243447;
      --serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
      --sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: var(--sans);
      transition: background 0.6s ease, color 0.6s ease;
    }

    /* Landing */
    .landing {
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 2rem; text-align: center;
    }
    .landing h1 {
      color: var(--accent); letter-spacing: 0.3em; font-weight: 300;
      margin: 0 0 0.75rem; font-size: clamp(2rem, 5vw, 3.5rem);
    }
    .landing p { opacity: 0.6; margin: 0; }
    .landing code { color: var(--accent); }

    /* Wizard mode */
    .wizard { display: none; }
    body.wizard-mode .landing { display: none; }
    body.wizard-mode .wizard { display: block; }

    .brand-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); gap: 1rem;
    }
    .brand-info h1 {
      color: var(--accent); letter-spacing: 0.3em; font-weight: 300;
      margin: 0 0 0.25rem; font-size: 1.1rem;
    }
    .brand-info .tagline {
      font-family: var(--serif);
      font-style: italic; opacity: 0.6; margin: 0; font-size: 0.95rem;
    }
    .header-status { display: flex; gap: 0.5rem; }
    .status-pill {
      background: var(--surface); border: 1px solid var(--border);
      padding: 0.35rem 0.9rem; border-radius: 999px;
      font-size: 0.75rem; letter-spacing: 0.1em;
      color: var(--accent); white-space: nowrap;
    }
    .status-pill.muted { color: var(--text-muted); }

    main.steps { padding: 2.5rem 2rem 4rem; max-width: 1100px; margin: 0 auto; }
    .step { display: none; text-align: center; padding: 1rem 0; }
    .step.active { display: block; }
    .step h2 {
      font-family: var(--serif);
      color: var(--text); font-weight: 300;
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      letter-spacing: 0.01em; margin: 0 0 0.5rem;
    }
    .step .prompt {
      opacity: 0.45; margin: 0 0 2.5rem;
      font-size: 0.75rem; letter-spacing: 0.35em; text-transform: uppercase;
    }
    .step > p {
      font-family: var(--serif); font-style: italic;
      opacity: 0.7; font-size: 1.1rem; margin: 0 0 2.5rem;
    }

    .cta {
      background: var(--accent); color: var(--bg); border: none;
      padding: 1rem 3.5rem; font-size: 0.8rem;
      letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer;
      border-radius: 2px; font-weight: 500;
      font-family: var(--sans);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .cta:hover { opacity: 0.9; transform: translateY(-1px); }

    /* Shared tile component */
    .tile {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 6px; overflow: hidden; cursor: pointer;
      text-align: left; padding: 0;
      font-family: inherit; color: var(--text);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .tile:hover { transform: translateY(-3px); border-color: var(--accent); }
    .tile-image {
      width: 100%; aspect-ratio: 16/9;
      background-size: cover; background-position: center;
      background-color: var(--surface);
    }
    .tile-label { padding: 0.9rem 1rem; }
    .tile-name {
      font-family: var(--serif);
      font-size: 1.05rem; color: var(--accent); font-weight: 400; margin-bottom: 0.2rem;
    }
    .tile-sub { font-size: 0.75rem; opacity: 0.5; letter-spacing: 0.1em; text-transform: uppercase; }

    /* Destinations grid */
    .tile-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 1rem; max-width: 1000px; margin: 0 auto;
    }
    @media (max-width: 1000px) { .tile-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px)  { .tile-grid { grid-template-columns: 1fr; } }

    /* Occasion grid */
    .occasion-grid {
      display: grid; grid-template-columns: repeat(5, 1fr);
      gap: 0.85rem; max-width: 1100px; margin: 0 auto;
    }
    @media (max-width: 1100px) { .occasion-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 700px)  { .occasion-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 460px)  { .occasion-grid { grid-template-columns: 1fr; } }

    /* Budget step */
    .budget-stage { max-width: 720px; margin: 0 auto; padding: 2rem 1rem 1rem; }
    .budget-currency {
      font-family: var(--serif); font-weight: 300;
      font-size: clamp(2.5rem, 6vw, 3.5rem);
      color: var(--accent); opacity: 0.6;
      vertical-align: top; line-height: 1; margin-right: 0.15em;
    }
    .budget-amount {
      font-family: var(--serif); font-weight: 300;
      font-size: clamp(4.5rem, 13vw, 8rem);
      color: var(--accent); letter-spacing: -0.025em;
      line-height: 1; font-feature-settings: "tnum";
      display: inline-block;
    }
    .budget-caption {
      font-size: 0.7rem; letter-spacing: 0.5em; text-transform: uppercase;
      opacity: 0.4; margin: 1rem 0 0.5rem;
    }
    .budget-tier {
      font-family: var(--serif); font-style: italic; font-weight: 300;
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      color: var(--text); opacity: 0.85; margin: 0 0 3.5rem;
      letter-spacing: 0.01em;
      transition: opacity 0.25s ease; min-height: 1.5em;
    }

    .slider-wrap { max-width: 560px; margin: 0 auto 3rem; padding: 0 0.5rem; }
    .budget-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 28px; background: transparent;
      outline: none; cursor: grab; margin: 0; padding: 0;
    }
    .budget-slider:active { cursor: grabbing; }
    .budget-slider::-webkit-slider-runnable-track {
      height: 1px;
      background: linear-gradient(to right, rgba(var(--accent-rgb), 0.5) 0%, rgba(var(--accent-rgb), 0.5) var(--pct, 0%), var(--border) var(--pct, 0%), var(--border) 100%);
      border: none;
    }
    .budget-slider::-moz-range-track { height: 1px; background: var(--border); border: none; }
    .budget-slider::-moz-range-progress { height: 1px; background: rgba(var(--accent-rgb), 0.5); }
    .budget-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--accent); border: 2px solid var(--bg);
      margin-top: -7px; cursor: grab;
      box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.4), 0 0 0 6px rgba(var(--accent-rgb), 0.08);
      transition: box-shadow 0.25s ease, transform 0.15s ease;
    }
    .budget-slider:hover::-webkit-slider-thumb,
    .budget-slider:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.6), 0 0 0 12px rgba(var(--accent-rgb), 0.12);
      transform: scale(1.1);
    }
    .budget-slider::-moz-range-thumb {
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--accent); border: 2px solid var(--bg); cursor: grab;
      box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.4), 0 0 0 6px rgba(var(--accent-rgb), 0.08);
      transition: box-shadow 0.25s ease, transform 0.15s ease;
    }
    .budget-slider:hover::-moz-range-thumb,
    .budget-slider:focus::-moz-range-thumb {
      box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.6), 0 0 0 12px rgba(var(--accent-rgb), 0.12);
      transform: scale(1.1);
    }
    .slider-rail-labels {
      display: flex; justify-content: space-between; margin-top: 1rem;
      font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.35;
    }

    /* Guests step */
    .guests-row {
      display: flex; justify-content: center; align-items: flex-end;
      gap: clamp(1.5rem, 7vw, 5rem); flex-wrap: wrap;
      margin: 1rem auto 3.5rem; max-width: 900px;
    }
    .guest-chip {
      background: transparent; border: none;
      padding: 0.5rem 0.25rem 1rem; cursor: pointer;
      color: var(--text); font-family: var(--sans);
      text-align: center; opacity: 0.45;
      transition: opacity 0.3s ease, transform 0.3s ease;
      position: relative;
    }
    .guest-chip::after {
      content: ""; position: absolute;
      left: 50%; bottom: 0.25rem;
      width: 0; height: 1px; background: var(--accent);
      transition: width 0.3s ease, left 0.3s ease;
    }
    .guest-chip:hover { opacity: 1; transform: translateY(-2px); }
    .guest-chip:hover::after { width: 60%; left: 20%; }
    .guest-chip-number {
      font-family: var(--serif); font-weight: 300;
      font-size: clamp(3rem, 7vw, 4.5rem);
      color: var(--accent); line-height: 1;
      letter-spacing: -0.02em; font-feature-settings: "tnum";
    }
    .guest-chip-label {
      font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase;
      opacity: 0.6; margin-top: 0.75rem;
    }

    /* Register step — underline-only form */
    .register-form {
      max-width: 480px;
      margin: 1rem auto 0;
      text-align: left;
    }
    .field {
      margin-bottom: 2.25rem;
    }
    .field label.field-label {
      display: block;
      font-size: 0.7rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      opacity: 0.5;
      margin-bottom: 0.5rem;
    }
    .field label.field-label .optional {
      letter-spacing: 0.1em;
      opacity: 0.7;
      text-transform: none;
      font-style: italic;
      font-size: 0.85em;
    }
    .field input.input-line {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--border);
      color: var(--text);
      font-family: var(--serif);
      font-size: 1.3rem;
      font-weight: 300;
      padding: 0.4rem 0;
      outline: none;
      transition: border-color 0.3s ease;
    }
    .field input.input-line:focus {
      border-bottom-color: var(--accent);
    }
    .field input.input-line::placeholder { opacity: 0.25; font-style: italic; }
    .field input.input-line:-webkit-autofill {
      -webkit-text-fill-color: var(--text);
      -webkit-box-shadow: 0 0 0 1000px var(--bg) inset;
      caret-color: var(--text);
    }

    .photo-field {
      text-align: center;
      margin: 2.5rem 0 2.5rem;
    }
    .photo-label {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }
    .photo-circle {
      width: 88px; height: 88px;
      border-radius: 50%;
      border: 1px dashed var(--border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted);
      background-size: cover; background-position: center;
      transition: border-color 0.3s ease, color 0.3s ease;
    }
    .photo-label:hover .photo-circle {
      border-color: var(--accent);
      color: var(--accent);
    }
    .photo-circle.has-photo {
      border-style: solid;
      border-color: var(--accent);
      box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.1);
    }
    .photo-circle.has-photo .photo-icon { display: none; }
    .photo-text {
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      opacity: 0.5;
    }
    .register-submit {
      margin-top: 1rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="landing" id="landing">
    <div>
      <h1>TRAVEL &amp; HOSPITALITY DEMO</h1>
      <p>Add <code>?demo=KERZNER</code> to the URL to load a brand</p>
    </div>
  </div>

  <div class="wizard" id="wizard">
    <header class="brand-header">
      <div class="brand-info">
        <h1 id="brand-name"></h1>
        <p class="tagline" id="brand-tagline"></p>
      </div>
      <div class="header-status">
        <div class="status-pill muted" id="ws-status">● Offline</div>
        <div class="status-pill" id="step-pill">Step 1 of 7</div>
      </div>
    </header>

    <main class="steps">
      <section class="step active" data-step="1">
        <h2 id="welcome-headline">Beyond Loyalty. Recognition.</h2>
        <p>Tell us a little about your stay. We'll do the rest.</p>
        <button class="cta" onclick="advance()">Begin</button>
      </section>

      <section class="step" data-step="2">
        <h2 id="dest-title">Destination</h2>
        <div class="prompt" id="dest-prompt">Choose your destination</div>
        <div class="tile-grid" id="dest-grid"></div>
      </section>

      <section class="step" data-step="3">
        <h2 id="budget-title">What's your nightly budget?</h2>
        <div class="prompt" id="budget-prompt">Slide to set the rate</div>
        <div class="budget-stage">
          <div>
            <span class="budget-currency" id="budget-currency">$</span><span class="budget-amount" id="budget-amount">3,000</span>
          </div>
          <div class="budget-caption" id="budget-caption">per night</div>
          <div class="budget-tier" id="budget-tier">Signature Suite</div>
          <div class="slider-wrap">
            <input type="range" id="budget-slider" class="budget-slider" min="500" max="50000" step="100" value="3000">
            <div class="slider-rail-labels">
              <span id="budget-min-label">$500</span>
              <span id="budget-max-label">$50,000+</span>
            </div>
          </div>
          <button class="cta" onclick="commitBudget()">Continue</button>
        </div>
      </section>

      <section class="step" data-step="4">
        <h2 id="guests-title">How many guests?</h2>
        <div class="prompt" id="guests-prompt">Staying with you</div>
        <div class="guests-row" id="guests-row"></div>
      </section>

      <section class="step" data-step="5">
        <h2 id="occasion-title">What's the occasion?</h2>
        <div class="prompt" id="occasion-prompt">Pick the moment we're creating</div>
        <div class="occasion-grid" id="occasion-grid"></div>
      </section>

      <section class="step" data-step="6">
        <h2 id="register-title">Your details</h2>
        <div class="prompt" id="register-prompt">We'll tailor everything to you</div>

        <form class="register-form" id="register-form" onsubmit="commitRegister(event)" novalidate>
          <div class="field">
            <label class="field-label" for="reg-name">Full name</label>
            <input class="input-line" type="text" id="reg-name" name="fullName" required autocomplete="name" placeholder="Your name">
          </div>

          <div class="field">
            <label class="field-label" for="reg-email">Email</label>
            <input class="input-line" type="email" id="reg-email" name="email" required autocomplete="email" placeholder="you@somewhere.com">
          </div>

          <div class="field">
            <label class="field-label" for="reg-phone">Phone <span class="optional">— optional</span></label>
            <input class="input-line" type="tel" id="reg-phone" name="phone" autocomplete="tel" placeholder="+971 …">
          </div>

          <div class="photo-field">
            <label class="photo-label" for="reg-photo">
              <div class="photo-circle" id="photo-preview">
                <svg class="photo-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <span class="photo-text" id="photo-text">Add a photo — optional</span>
            </label>
            <input type="file" id="reg-photo" name="photo" accept="image/*" capture="user" style="display:none">
          </div>

          <div class="register-submit">
            <button type="submit" class="cta" id="register-submit-btn">Complete</button>
          </div>
        </form>
      </section>

      <section class="step" data-step="7">
        <h2>Complete</h2>
        <p>Your concierge will be in touch.</p>
        <button class="cta" onclick="restart()">Start over</button>
      </section>
    </main>
  </div>

  <script>
    const demoKey = new URLSearchParams(window.location.search).get('demo');
    let currentStep = 1;
    const totalSteps = 7;
    window.WIZARD_STATE = {};

    function showStep(n) {
      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
      currentStep = n;
      document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
      document.getElementById('step-pill').textContent = `Step ${currentStep} of ${totalSteps}`;
    }
    function advance() { if (currentStep < totalSteps) showStep(currentStep + 1); }
    function restart() {
      window.WIZARD_STATE = {};
      const form = document.getElementById('register-form');
      if (form) form.reset();
      const preview = document.getElementById('photo-preview');
      if (preview) {
        preview.style.backgroundImage = '';
        preview.classList.remove('has-photo');
      }
      const photoText = document.getElementById('photo-text');
      if (photoText) photoText.textContent = 'Add a photo — optional';
      showStep(1);
    }

    function selectDestination(value) {
      window.WIZARD_STATE.location = value;
      advance();
    }

    function renderDestinations(cfg) {
      const grid = document.getElementById('dest-grid');
      if (!cfg.destinations) return;
      grid.innerHTML = cfg.destinations.map(d => `
        <button class="tile" onclick="selectDestination('${d.value.replace(/'/g, "\\'")}')">
          <div class="tile-image" style="background-image: url('${d.image}'), linear-gradient(135deg, #1a2c44, #0E1B2C);"></div>
          <div class="tile-label">
            <div class="tile-name">${d.value}</div>
            <div class="tile-sub">${d.sublabel}</div>
          </div>
        </button>
      `).join('');
    }

    function getBudgetTier(amount, tiers) {
      return (tiers.find(t => amount <= t.max) || tiers[tiers.length - 1]).name;
    }

    function setupBudget(cfg) {
      if (!cfg.budget) return;
      const b = cfg.budget;
      const slider = document.getElementById('budget-slider');
      const amount = document.getElementById('budget-amount');
      const tierEl = document.getElementById('budget-tier');
      const currencyEl = document.getElementById('budget-currency');
      const captionEl = document.getElementById('budget-caption');
      const minLabel = document.getElementById('budget-min-label');
      const maxLabel = document.getElementById('budget-max-label');

      slider.min = b.min; slider.max = b.max; slider.step = b.step; slider.value = b.initial;
      currencyEl.textContent = b.currency;
      captionEl.textContent = cfg.stepLabels.budget.perNight;
      minLabel.textContent = `${b.currency}${b.min.toLocaleString()}`;
      maxLabel.textContent = `${b.currency}${b.max.toLocaleString()}+`;

      function update() {
        const v = parseInt(slider.value, 10);
        amount.textContent = v.toLocaleString();
        const newTier = getBudgetTier(v, b.tiers);
        if (tierEl.textContent !== newTier) {
          tierEl.style.opacity = '0';
          setTimeout(() => { tierEl.textContent = newTier; tierEl.style.opacity = '0.85'; }, 180);
        }
        const pct = ((v - b.min) / (b.max - b.min)) * 100;
        slider.style.setProperty('--pct', pct + '%');
      }
      slider.addEventListener('input', update);
      update();
    }

    function commitBudget() {
      const v = parseInt(document.getElementById('budget-slider').value, 10);
      const cfg = window.BRAND_CONFIG;
      window.WIZARD_STATE.budget = v;
      window.WIZARD_STATE.budgetTier = getBudgetTier(v, cfg.budget.tiers);
      advance();
    }

    function renderGuests(cfg) {
      const row = document.getElementById('guests-row');
      if (!cfg.guestOptions) return;
      row.innerHTML = cfg.guestOptions.map(g => `
        <button class="guest-chip" onclick="selectGuests('${g.value}')">
          <div class="guest-chip-number">${g.label}</div>
          <div class="guest-chip-label">${g.description}</div>
        </button>
      `).join('');
    }

    function selectGuests(value) {
      window.WIZARD_STATE.guests = value;
      advance();
    }

    function renderOccasions(cfg) {
      const grid = document.getElementById('occasion-grid');
      if (!cfg.occasions) return;
      grid.innerHTML = cfg.occasions.map(o => `
        <button class="tile" onclick="selectOccasion('${o.value.replace(/'/g, "\\'")}')">
          <div class="tile-image" style="background-image: url('${o.image}'), linear-gradient(135deg, #1a2c44, #0E1B2C);"></div>
          <div class="tile-label">
            <div class="tile-name">${o.value}</div>
            <div class="tile-sub">${o.sublabel}</div>
          </div>
        </button>
      `).join('');
    }

    function selectOccasion(value) {
      window.WIZARD_STATE.occasion = value;
      advance();
    }

    function setupRegister(cfg) {
      const photoInput = document.getElementById('reg-photo');
      const preview = document.getElementById('photo-preview');
      const photoText = document.getElementById('photo-text');
      const submitBtn = document.getElementById('register-submit-btn');

      if (cfg.stepLabels?.register?.submit) {
        submitBtn.textContent = cfg.stepLabels.register.submit;
      }

      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.style.backgroundImage = `url('${ev.target.result}')`;
          preview.classList.add('has-photo');
          photoText.textContent = 'Tap to change';
          window.WIZARD_STATE.photo = ev.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    function commitRegister(event) {
      event.preventDefault();
      const form = event.target;
      const name = form.fullName.value.trim();
      const email = form.email.value.trim();
      if (!name || !email) return;

      window.WIZARD_STATE.fullName = name;
      window.WIZARD_STATE.email = email;
      window.WIZARD_STATE.phone = form.phone.value.trim();
      advance();
    }

    if (demoKey) {
      const script = document.createElement('script');
      script.src = `./configs/${demoKey.toLowerCase()}.js`;
      script.onload = () => {
        const cfg = window.BRAND_CONFIG;
        if (!cfg) return;

        const root = document.documentElement.style;
        root.setProperty('--bg', cfg.theme.bg);
        root.setProperty('--surface', cfg.theme.surface);
        root.setProperty('--text', cfg.theme.text);
        root.setProperty('--text-muted', cfg.theme.textMuted);
        root.setProperty('--accent', cfg.theme.accent);

        document.getElementById('brand-name').textContent = cfg.brand.name.toUpperCase();
        document.getElementById('brand-tagline').textContent = cfg.brand.tagline;
        document.getElementById('welcome-headline').textContent = cfg.brand.headline;

        if (cfg.stepLabels?.destination) {
          document.getElementById('dest-title').textContent = cfg.stepLabels.destination.title;
          document.getElementById('dest-prompt').textContent = cfg.stepLabels.destination.prompt;
        }
        if (cfg.stepLabels?.budget) {
          document.getElementById('budget-title').textContent = cfg.stepLabels.budget.title;
          document.getElementById('budget-prompt').textContent = cfg.stepLabels.budget.prompt;
        }
        if (cfg.stepLabels?.guests) {
          document.getElementById('guests-title').textContent = cfg.stepLabels.guests.title;
          document.getElementById('guests-prompt').textContent = cfg.stepLabels.guests.prompt;
        }
        if (cfg.stepLabels?.occasion) {
          document.getElementById('occasion-title').textContent = cfg.stepLabels.occasion.title;
          document.getElementById('occasion-prompt').textContent = cfg.stepLabels.occasion.prompt;
        }
        if (cfg.stepLabels?.register) {
          document.getElementById('register-title').textContent = cfg.stepLabels.register.title;
          document.getElementById('register-prompt').textContent = cfg.stepLabels.register.prompt;
        }

        renderDestinations(cfg);
        setupBudget(cfg);
        renderGuests(cfg);
        renderOccasions(cfg);
        setupRegister(cfg);

        document.body.classList.add('wizard-mode');
      };
      script.onerror = () => {
        document.querySelector('.landing p').textContent = `Config not found for "${demoKey}"`;
      };
      document.head.appendChild(script);
    }
  </script>
</body>
</html>
