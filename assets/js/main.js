// Contact form: send to Web3Forms with fetch so the page doesn't reload.
// Without JS the form still works as a plain POST with the browser's own
// `required` validation; with JS we validate ourselves, in Estonian.
const form = document.querySelector('.contact-form');

if (form) {
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const email = 'sander.ilves@hotmail.com';

  form.setAttribute('novalidate', '');

  const rules = [
    [form.querySelector('#f-name'), (f) => (f.value.trim() ? '' : 'Palun sisesta oma nimi.')],
    [form.querySelector('#f-email'), (f) => {
      if (!f.value.trim()) return 'Palun sisesta oma e-posti aadress.';
      return f.validity.typeMismatch ? 'Palun kontrolli e-posti aadressi.' : '';
    }],
    [form.querySelector('#f-consent'), (f) => (f.checked ? '' : 'Palun kinnita nõusolek.')],
  ];

  // Error goes under the field: inside .field, or right after the consent row.
  const showError = (field, message) => {
    const id = `${field.id}-error`;
    let error = document.getElementById(id);
    if (!message) {
      error?.remove();
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      return;
    }
    if (!error) {
      error = document.createElement('p');
      error.className = 'field-error';
      error.id = id;
      const row = field.closest('.consent');
      if (row) row.after(error);
      else field.parentElement.append(error);
    }
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', id);
  };

  rules.forEach(([field, check]) => {
    // Clear (or update) the error as soon as the field is fixed.
    field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', () => {
      if (field.hasAttribute('aria-invalid')) showError(field, check(field));
    });
  });

  const showSuccess = () => {
    const success = document.createElement('div');
    success.className = 'form-success';
    success.setAttribute('role', 'status');
    success.setAttribute('aria-live', 'polite');
    success.tabIndex = -1;
    success.innerHTML =
      '<p class="form-success__title">Aitäh!</p>' +
      '<p class="form-success__text">Sain sinu sõnumi kätte. Vastan sulle 1–2 päeva jooksul.</p>';

    // Keep the section height: the block takes the form's place and size.
    success.style.minHeight = `${form.offsetHeight}px`;
    form.replaceWith(success);
    success.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let firstInvalid = null;
    rules.forEach(([field, check]) => {
      const message = check(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    button.disabled = true;
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      showSuccess();
    } catch {
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.textContent = email;
      status.replaceChildren('Midagi läks valesti. Kirjuta palun otse: ', link);
      button.disabled = false;
    }
  });
}
