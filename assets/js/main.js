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
    thanks.textContent = 'Aitäh! Vastan sulle hiljemalt kahe päeva jooksul.';
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

// Testimonials: the layout follows the number of cards.
// 1 = single centred card, 2–3 = grid on desktop, 4+ = carousel on desktop.
// With 2+ cards it is a swipe carousel below 900px. No autoplay.
const track = document.querySelector('.t-cards');

if (track) {
  const cards = [...track.querySelectorAll('.t-card')];
  const n = cards.length;

  if (n === 1) {
    track.classList.add('is-single');
  } else if (n > 1) {
    track.classList.add(n <= 3 ? 'is-grid' : 'is-carousel');
    track.style.setProperty('--cols', n);

    const section = track.closest('section');
    cards.forEach((card, i) => {
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${i + 1} / ${n}`);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const chevron = (d) =>
      `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`;
    const button = (label, html, className) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', label);
      if (html) b.innerHTML = html;
      if (className) b.className = className;
      return b;
    };

    const nav = document.createElement('div');
    nav.className = 't-nav';
    const prev = button('Eelmine tagasiside', chevron('M12.5 4l-6 6 6 6'));
    const next = button('Järgmine tagasiside', chevron('M7.5 4l6 6-6 6'));
    const dotBox = document.createElement('span');
    dotBox.style.display = 'contents';
    nav.append(prev, dotBox, next);
    track.after(nav);

    let dots = [];
    let positions = 1; // how many scroll stops there are (n minus cards visible, plus one)
    let active = 0;

    const step = () => (n > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1);

    const goTo = (i) => {
      if (i < 0 || i >= positions) return;
      track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };

    const setActive = (i) => {
      active = i;
      dots.forEach((dot, j) => dot.setAttribute('aria-current', j === i ? 'true' : 'false'));
      prev.setAttribute('aria-disabled', i === 0 ? 'true' : 'false');
      next.setAttribute('aria-disabled', i === positions - 1 ? 'true' : 'false');
    };

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const visible = max <= 1 ? n : Math.round(track.clientWidth / step());
      const count = Math.max(1, n - visible + 1);
      nav.hidden = count === 1; // e.g. the 2–3 card grid on desktop
      if (nav.hidden) section.removeAttribute('aria-roledescription');
      else section.setAttribute('aria-roledescription', 'carousel');

      if (count !== positions || !dots.length) {
        positions = count;
        dots = Array.from({ length: count }, (_, i) => {
          const dot = button(`Näita tagasisidet ${i + 1}`, '', 't-dot');
          dot.addEventListener('click', () => goTo(i));
          return dot;
        });
        dotBox.replaceChildren(...dots);
      }
      const i = track.scrollLeft >= max - 2 && max > 1 ? positions - 1 : Math.round(track.scrollLeft / step());
      setActive(Math.min(Math.max(i, 0), positions - 1));
    };

    prev.addEventListener('click', () => goTo(active - 1));
    next.addEventListener('click', () => goTo(active + 1));

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  }
}
