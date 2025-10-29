/**
 * Utility function to open WhatsApp with a predefined message
 * @param {string} phoneNumber - The phone number in international format (e.g., +5491134550000)
 * @param {string} message - The message to send
 */
export const openWhatsApp = (phoneNumber = '+5491134550000', message = 'Hola, quiero saber más sobre Tecno!') => {
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab/window
  window.open(whatsappUrl, '_blank');
};
