/**
 * whatsapp.js
 * Builds and opens a WhatsApp prefilled order message.
 * Pure functions where possible; one side-effect entry (openOrder).
 */

const NL = '%0A'; // URL-encoded newline

function fmtBDT(amount) {
  return 'BDT ' + Number(amount).toLocaleString('en-IN');
}

/**
 * Build the order message body (URL-encoded).
 */
export function buildMessage(items, subtotal, opts = {}) {
  const { brand = 'SkyOutfit', origin = window.location.origin } = opts;

  const lines = [];
  lines.push(`Hi ${brand}, I want to order:`);
  lines.push('');

  items.forEach((it, i) => {
    lines.push(`${i + 1}) ${it.name}`);
    if (it.size) lines.push(`   Size: ${it.size}`);
    lines.push(`   Qty: ${it.qty}`);
    lines.push(`   Price: ${fmtBDT(it.price)}`);
    if (it.slug) lines.push(`   Link: ${origin}${it.slug}`);
    lines.push('');
  });

  lines.push(`Subtotal: ${fmtBDT(subtotal)}`);
  lines.push('');
  lines.push('My details:');
  lines.push('Name:');
  lines.push('Phone:');
  lines.push('Address:');
  lines.push('Payment: bKash / Nagad / Rocket / Cash on Delivery');

  return lines.map(encodeURIComponent).join(NL);
}

/**
 * Build a single-product quick-buy message (used on PDP "Order on WhatsApp").
 */
export function buildQuickMessage(item, opts = {}) {
  return buildMessage([item], item.price * item.qty, opts);
}

/**
 * Open a WhatsApp deep-link with the prefilled message.
 * Number must be in international format without "+", e.g. "8801XXXXXXXXX".
 */
export function openOrder(number, items, subtotal, opts = {}) {
  if (!number || !items || items.length === 0) return;
  const cleaned = String(number).replace(/[^0-9]/g, '');
  const body = buildMessage(items, subtotal, opts);
  const url = `https://wa.me/${cleaned}?text=${body}`;
  window.location.assign(url);
}

/**
 * Static "Notify me" or generic enquiry message.
 */
export function openEnquiry(number, message) {
  const cleaned = String(number).replace(/[^0-9]/g, '');
  const body = encodeURIComponent(message || 'Hi SkyOutfit, I have a question.');
  window.location.assign(`https://wa.me/${cleaned}?text=${body}`);
}
