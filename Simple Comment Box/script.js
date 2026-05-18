// ── Referencias al DOM ──
const inputName    = document.getElementById('input-name');
const inputEmail   = document.getElementById('input-email');
const inputComment = document.getElementById('input-comment');
const btnAdd       = document.getElementById('btn-add');
const list         = document.getElementById('comments-list');
const emptyState   = document.getElementById('empty-state');
const countBadge   = document.getElementById('count-badge');
const charCounter  = document.getElementById('char-counter');
const toast        = document.getElementById('toast');

let commentCount = 0;
let toastTimer   = null;

// ── Contador de caracteres ──
inputComment.addEventListener('input', () => {
  const len = inputComment.value.length;
  charCounter.textContent = `${len} / 500`;
  charCounter.classList.toggle('warn', len >= 450);
});

// ── Validación ──
function validate() {
  let ok = true;

  const nameField = document.getElementById('field-name');
  if (!inputName.value.trim()) {
    nameField.classList.add('has-error');
    ok = false;
  } else {
    nameField.classList.remove('has-error');
  }

  const emailField = document.getElementById('field-email');
  const emailVal   = inputEmail.value.trim();
  const emailOk    = !emailVal || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailOk) {
    emailField.classList.add('has-error');
    ok = false;
  } else {
    emailField.classList.remove('has-error');
  }

  const commentField = document.getElementById('field-comment');
  if (!inputComment.value.trim()) {
    commentField.classList.add('has-error');
    ok = false;
  } else {
    commentField.classList.remove('has-error');
  }

  return ok;
}

// ── Toast ──
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Iniciales para el avatar ──
function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase();
}

// ── Fecha formateada ──
function formatDate(date) {
  return date.toLocaleString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// ── Sanitizar HTML (evitar XSS) ──
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Crear tarjeta de comentario ──
function createCard(name, comment, date) {
  const card = document.createElement('div');
  card.className = 'comment-card';

  card.innerHTML = `
    <div class="comment-top">
      <div class="comment-author-row">
        <div class="avatar">${getInitials(name)}</div>
        <div>
          <div class="comment-author">${escapeHtml(name)}</div>
          <div class="comment-date">${formatDate(date)}</div>
        </div>
      </div>
      <button class="btn-delete">🗑 Eliminar</button>
    </div>
    <p class="comment-text">${escapeHtml(comment)}</p>
  `;

  card.querySelector('.btn-delete').addEventListener('click', () => {
    deleteCard(card);
  });

  return card;
}

// ── Eliminar tarjeta ──
function deleteCard(card) {
  card.style.transition = 'opacity 0.25s, transform 0.25s';
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(-6px)';

  setTimeout(() => {
    card.remove();
    commentCount--;
    countBadge.textContent = commentCount;
    if (commentCount === 0) emptyState.style.display = '';
    showToast('Comentario eliminado');
  }, 280);
}

// ── Publicar comentario ──
btnAdd.addEventListener('click', () => {
  if (!validate()) return;

  const name    = inputName.value.trim();
  const comment = inputComment.value.trim();
  const now     = new Date();

  const card = createCard(name, comment, now);

  emptyState.style.display = 'none';
  list.insertBefore(card, list.firstChild); // el más nuevo arriba

  commentCount++;
  countBadge.textContent = commentCount;

  // Limpiar textarea y contador
  inputComment.value      = '';
  charCounter.textContent = '0 / 500';
  charCounter.classList.remove('warn');
  document.getElementById('field-comment').classList.remove('has-error');

  showToast('¡Comentario publicado!');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ── Ctrl + Enter para publicar ──
inputComment.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) btnAdd.click();
});