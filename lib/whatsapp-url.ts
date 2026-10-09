export function whatsappUrl(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}
