export function bnNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "০";
  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(number);
}
export function numeric(value) {
  if (typeof value === "number") return value;
  const map = { "০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","٫":".",",":"","٬":"" };
  const normalized = String(value ?? "").replace(/[০-৯٫٬,]/g, ch => map[ch] ?? ch).replace(/[^\d.-]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}
export function money(value) { return `${bnNumber(value)} টাকা`; }
export function banglaDate() {
  return new Intl.DateTimeFormat("bn-BD", { dateStyle: "full", timeZone: "Asia/Dhaka" }).format(new Date());
}
