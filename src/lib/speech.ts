/** Leitura em voz alta usando a síntese de voz do próprio navegador (sem serviços externos). */
export const speechAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text: string, onEnd?: () => void) {
  if (!speechAvailable()) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'pt-BR';
  u.rate = 0.95;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('pt'));
  if (voice) u.voice = voice;
  u.onend = () => onEnd?.();
  window.speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}
