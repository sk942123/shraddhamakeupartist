const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMenu?.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const reviewCards = [...document.querySelectorAll('.review-card')];
let activeReview = 0;

function showReview(index) {
  activeReview = (index + reviewCards.length) % reviewCards.length;
  reviewCards.forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === activeReview);
  });
}

document.querySelector('.review-prev')?.addEventListener('click', () => showReview(activeReview - 1));
document.querySelector('.review-next')?.addEventListener('click', () => showReview(activeReview + 1));

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const values = Object.fromEntries(formData.entries());

  // Replace this sample number with Shraddha's WhatsApp number, including country code.
  const whatsappNumber = '910000000000';
  const message = [
    'Hello Shraddha, I would like to enquire about makeup services.',
    '',
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Event: ${values.event}`,
    `Date: ${values.date}`,
    `Location: ${values.location}`,
    `Preferred look: ${values.message || 'Not specified'}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  formStatus.textContent = 'Opening WhatsApp with your enquiry…';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
