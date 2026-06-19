'use strict';

const CONTACT_EMAIL = 'ezanvaktiplus@outlook.com';

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    const body = `İsim: ${name}\nE-posta: ${email}\n\n${message}`;

    const mailto = `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`Ezan Vakti Plus - ${subject}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}
