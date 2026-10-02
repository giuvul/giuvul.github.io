// -----------------------------------------------------------------------------
// Form di contatto: invio con EmailJS (https://www.emailjs.com).
//
// Il browser manda i campi del form a EmailJS, che li inserisce nel template
// e spedisce l'email dal servizio Gmail collegato. L'indirizzo di destinazione
// sta nel template su EmailJS, non qui: nel sorgente del sito non compare.
//
// Le tre chiavi qui sotto sono pubbliche per costruzione (servono al browser):
// la protezione dagli abusi si configura su EmailJS (domini consentiti e
// limite di invii in Account > Security).
// -----------------------------------------------------------------------------

const EMAILJS = {
  publicKey: 'YOUR_PUBLIC_KEY',     // Account > General > Public Key
  serviceId: 'YOUR_SERVICE_ID',     // Email Services > servizio Gmail
  templateId: 'YOUR_TEMPLATE_ID',   // Email Templates > template del sito
};

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');
const button = form.querySelector('button[type="submit"]');
const buttonLabel = button.querySelector('.cta__label');

function showStatus(message, isError) {
  status.textContent = message;
  status.classList.toggle('form-status--error', isError);
  status.hidden = false;
}

function setSending(sending) {
  button.disabled = sending;
  buttonLabel.textContent = sending ? 'Sending…' : 'Send message';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // stessi controlli dell'HTML (required, type="email", minlength):
  // se qualcosa non va il browser mostra il suo messaggio sul campo
  if (!form.reportValidity()) return;

  // trappola anti-spam: un utente vero non vede il campo e lo lascia vuoto.
  // Al bot si risponde come se l'invio fosse riuscito.
  if (form.elements.website.value !== '') {
    window.location.href = 'thanks/';
    return;
  }

  setSending(true);
  status.hidden = true;

  try {
    await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, {
      publicKey: EMAILJS.publicKey,
    });
    window.location.href = 'thanks/';
  } catch (error) {
    console.error('EmailJS:', error);
    showStatus(
      'Something went wrong and the message was not sent. ' +
      'Please try again in a moment, or write to me by email.',
      true
    );
    setSending(false);
  }
});
