// ── Referencias ──
const inputBook  = document.getElementById('input-book');
const btnAdd     = document.getElementById('btn-add');
const bookList   = document.getElementById('book-list');
const emptyState = document.getElementById('empty-state');
const listHeader = document.getElementById('list-header');
const countPill  = document.getElementById('count-pill');
const errorMsg   = document.getElementById('error-msg');
const toast      = document.getElementById('toast');

let count      = 0;
let toastTimer = null;

// ── Formatear fecha ──
function formatDate(date) {
  return date.toLocaleString('es-MX', {
    weekday: 'short',
    day:     '2-digit',
    month:   'short',
    year:    'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
  });
}

// ── Sanitizar entrada ──
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Mostrar / ocultar error ──
function setError(show) {
  inputBook.classList.toggle('has-error', show);
  errorMsg.classList.toggle('show', show);
}

// ── Actualizar contador ──
function updateCount() {
  countPill.textContent = count;
  listHeader.style.display = count > 0 ? 'flex' : 'none';
  emptyState.style.display = count === 0 ? 'flex' : 'none';
}

// ── Toast ──
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Eliminar item ──
function deleteItem(li) {
  li.style.transition = 'opacity 0.25s, transform 0.25s';
  li.style.opacity    = '0';
  li.style.transform  = 'translateY(-6px)';
  setTimeout(() => {
    li.remove();
    count--;
    updateCount();
    showToast('Libro eliminado');
  }, 270);
}

// ── Agregar libro ──
function addBook() {
  const value = inputBook.value.trim();

  if (!value) {
    setError(true);
    inputBook.focus();
    return;
  }

  setError(false);

  const li = document.createElement('li');
  li.className = 'book-item';

  li.innerHTML = `
    <div class="book-info">
      <span class="book-name">${escapeHtml(value)}</span>
      <span class="book-date">Agregado el ${formatDate(new Date())}</span>
    </div>
    <button class="btn-delete" aria-label="Eliminar libro">Eliminar</button>
  `;

  li.querySelector('.btn-delete').addEventListener('click', () => deleteItem(li));

  // Inserta al inicio de la lista
  bookList.insertBefore(li, bookList.firstChild);

  count++;
  updateCount();

  inputBook.value = '';
  inputBook.focus();

  showToast('Libro agregado ✓');
}

// ── Eventos ──
btnAdd.addEventListener('click', addBook);

inputBook.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBook();
  if (inputBook.classList.contains('has-error')) setError(false);
});

// ── Init ──
updateCount();