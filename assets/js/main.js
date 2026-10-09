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

  // Success: the thank-you line replaces the kicker, heading and form.
  // The section keeps its height so the page doesn't jump.
  const showSuccess = () => {
    const section = form.closest('.contact');
    section.style.minHeight = `${section.offsetHeight}px`;
    section.classList.add('is-sent');
    section.querySelector('.kicker').hidden = true;
    section.querySelector('#kontakt-title').hidden = true;

    const thanks = document.createElement('h2');
    thanks.className = 'display form-success';
    thanks.id = 'kontakt-success';
    thanks.tabIndex = -1;
    thanks.textContent = 'Aitäh! Vastan sulle 1–2 päeva jooksul.';
    form.closest('.contact-form-wrap').replaceWith(thanks);
    section.setAttribute('aria-labelledby', thanks.id);
    thanks.focus();
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
