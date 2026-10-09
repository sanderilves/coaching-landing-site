// Contact form: send to Web3Forms with fetch so the page doesn't reload.
// Without JS the form still works as a plain POST.
const form = document.querySelector('.contact-form');

if (form) {
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const email = 'sander.ilves@hotmail.com';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
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

      const success = document.createElement('div');
      success.className = 'form-success';
      success.setAttribute('role', 'status');
      success.setAttribute('aria-live', 'polite');
      success.tabIndex = -1;
      success.innerHTML =
        '<p class="form-success__title">Aitäh!</p>' +
        '<p class="form-success__text">Sain sinu sõnumi kätte. Vastan sulle 1–2 päeva jooksul.</p>';

      // Keep the section height: the block takes the form's place and size.
      const formHeight = form.offsetHeight + parseFloat(getComputedStyle(form).marginTop);
      form.replaceWith(success);
      success.style.minHeight = `${formHeight - parseFloat(getComputedStyle(success).marginTop)}px`;
      success.focus();
    } catch {
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.textContent = email;
      status.replaceChildren('Midagi läks valesti. Kirjuta palun otse: ', link);
      button.disabled = false;
    }
  });
}
