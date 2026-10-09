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

      status.textContent = 'Aitäh! Vastan sulle 1–2 päeva jooksul.';
      form.remove();
      status.focus();
    } catch {
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.textContent = email;
      status.replaceChildren('Midagi läks valesti. Kirjuta palun otse: ', link);
      button.disabled = false;
    }
  });
}
