import { printBand } from '../content/art-links';

/** Faixa ilustrada no topo das folhas: aparece só na impressão colorida (economia de tinta desligada). */
export function PrintBand({ subject }: { subject?: string }) {
  return <img className="print-band-img" src={`${import.meta.env.BASE_URL}assets/${printBand(subject)}.webp`} alt="" aria-hidden />;
}
