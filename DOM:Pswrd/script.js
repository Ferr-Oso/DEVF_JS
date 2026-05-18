// ── Referencias ──
const slider      = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const outputText  = document.getElementById('output-text');
const btnGenerate = document.getElementById('btn-generate');
const btnCopy     = document.getElementById('btn-copy');
const chkUpper    = document.getElementById('chk-upper');
const chkLower    = document.getElementById('chk-lower');
const chkNumbers  = document.getElementById('chk-numbers');
const chkSymbols  = document.getElementById('chk-symbols');
const strengthTxt = document.getElementById('strength-text');
const statTime    = document.getElementById('stat-time');
const toast       = document.getElementById('toast');
const bars        = [1, 2, 3, 4].map(n => document.getElementById('bar' + n));

// ── Caracteres ──
const POOL = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

// ── Slider ──
slider.addEventListener('input', () => {
  lengthValue.textContent = slider.value;
  updateSliderTrack();
  refreshStrength();
});

function updateSliderTrack() {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background =
    `linear-gradient(to right, #caff00 ${pct}%, #2a2a2a ${pct}%)`;
}

// ── Nivel de fortaleza ──
function calcLevel() {
  const len   = parseInt(slider.value);
  const types = [chkUpper, chkLower, chkNumbers, chkSymbols].filter(c => c.checked).length;
  if (types === 0)              return 0;
  if (len < 6  || types === 1) return 1;
  if (len < 10 || types === 2) return 2;
  if (len < 16 || types === 3) return 3;
  return 4;
}

const LEVELS = {
  0: { label: '---',    cls: '',       color: '#555' },
  1: { label: 'DÉBIL',  cls: 'weak',   color: '#ff4d4d' },
  2: { label: 'BAJA',   cls: 'fair',   color: '#ff8c42' },
  3: { label: 'MEDIA',  cls: 'medium', color: '#f8cd65' },
  4: { label: 'FUERTE', cls: 'strong', color: '#caff00' },
};

function refreshStrength() {
  const lvl  = calcLevel();
  const info = LEVELS[lvl];

  strengthTxt.textContent = info.label;
  strengthTxt.style.color = info.color;

  bars.forEach((bar, i) => {
    bar.className = 'bar';
    if (i < lvl) bar.classList.add(info.cls);
  });

  updateCrackTime();
}

// ── Tiempo estimado ──
function updateCrackTime() {
  const len    = parseInt(slider.value);
  const checks = [chkUpper, chkLower, chkNumbers, chkSymbols];
  const sizes  = [26, 26, 10, 32];

  let poolSize = 0;
  checks.forEach((c, i) => { if (c.checked) poolSize += sizes[i]; });

  if (poolSize === 0) { statTime.textContent = '?'; return; }

  const combinations = Math.pow(poolSize, len);
  const seconds      = combinations / 1e12;

  statTime.textContent = formatTime(seconds);
}

function formatTime(sec) {
  if (sec < 1)             return 'Instantáneo';
  if (sec < 60)            return Math.round(sec) + ' seg';
  if (sec < 3600)          return Math.round(sec / 60) + ' min';
  if (sec < 86400)         return Math.round(sec / 3600) + ' hrs';
  if (sec < 2592000)       return Math.round(sec / 86400) + ' días';
  if (sec < 31536000)      return Math.round(sec / 2592000) + ' meses';
  if (sec < 1e9)           return Math.round(sec / 31536000) + ' años';
  return '∞ infinito';
}

// ── Generar ──
function generatePassword() {
  const len   = parseInt(slider.value);
  const pools = [];

  if (chkUpper.checked)   pools.push(POOL.upper);
  if (chkLower.checked)   pools.push(POOL.lower);
  if (chkNumbers.checked) pools.push(POOL.numbers);
  if (chkSymbols.checked) pools.push(POOL.symbols);

  if (pools.length === 0) {
    showToast('SELECCIONA UNA OPCIÓN', true);
    return;
  }

  const guaranteed = pools.map(p => p[Math.floor(Math.random() * p.length)]);
  const allChars   = pools.join('');
  const rest       = Array.from(
    { length: len - guaranteed.length },
    () => allChars[Math.floor(Math.random() * allChars.length)]
  );

  const password = shuffle([...guaranteed, ...rest]).join('');
  outputText.textContent = password;
  outputText.classList.remove('is-placeholder');
  refreshStrength();
}

// ── Fisher-Yates ──
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Copiar ──
btnCopy.addEventListener('click', () => {
  if (outputText.classList.contains('is-placeholder')) return;
  navigator.clipboard.writeText(outputText.textContent.trim())
    .then(() => showToast('¡COPIADO!'))
    .catch(() => showToast('ERROR AL COPIAR', true));
});

// ── Toast ──
let toastTimer = null;
function showToast(msg, isError = false) {
  toast.textContent      = msg;
  toast.style.background = isError ? '#ff4d4d' : '#caff00';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── Listeners ──
[chkUpper, chkLower, chkNumbers, chkSymbols].forEach(c => {
  c.addEventListener('change', refreshStrength);
});

btnGenerate.addEventListener('click', generatePassword);

// ── Init ──
updateSliderTrack();
refreshStrength();