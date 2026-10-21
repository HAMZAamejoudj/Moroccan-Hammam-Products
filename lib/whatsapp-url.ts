/** Build a wa.me link. Moroccan 06/07 numbers become +212. */
export function whatsappUrl(whatsapp: string): string {
  let digits = whatsapp.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) {
    digits = `212${digits.slice(1)}`;
  }
  return digits ? `https://wa.me/${digits}` : "#";
}
