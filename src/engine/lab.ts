/**
 * Laboratório de futuros — “Como abastecer uma cidade?”
 *
 * Modelo DIDÁTICO e simplificado (valores em “unidades de energia por dia”, fictícias):
 *  - A demanda é dividida igualmente entre dia e noite.
 *  - Painéis solares só produzem durante o dia, proporcionalmente à insolação.
 *  - Turbinas eólicas produzem dia e noite, proporcionalmente ao vento.
 *    (Na realidade a potência eólica cresce com o CUBO da velocidade do vento; aqui usamos
 *    “aproveitamento do vento” em %, já linearizado — isso é explicado aos estudantes.)
 *  - A pequena hidrelétrica depende da chuva e do nível do reservatório.
 *  - Com bateria, a sobra solar do dia pode ser usada à noite (até a capacidade).
 *  - O que faltar é coberto por um gerador a diesel (emite poluentes).
 */

export interface LabInputs {
  sol: number; // 0–100 % de insolação
  vento: number; // 0–100 % de aproveitamento do vento
  chuva: number; // 0–100 % da chuva média
  consumo: number; // 0–100 % (nível de consumo da cidade)
  paineis: number; // 0–10 conjuntos de painéis
  turbinas: number; // 0–10 turbinas
  bateria: boolean;
  eficiencia: boolean; // campanha de economia de energia (−15% de demanda)
}

export const LAB_DEFAULTS: LabInputs = { sol: 80, vento: 60, chuva: 50, consumo: 70, paineis: 4, turbinas: 3, bateria: false, eficiencia: false };

export const LAB_CONST = {
  demandaBase: 40,
  demandaPorPct: 0.8,
  solarPorPainel: 8, // por dia a 100% de sol
  eolicaPorTurbina: 6, // por dia a 100% de vento (metade de dia, metade à noite)
  hidroMax: 20,
  bateriaCap: 25,
  bateriaPerda: 0.1, // 10% perdidos ao armazenar
  economia: 0.15,
};

export interface LabResult {
  demanda: number;
  producao: { solar: number; eolica: number; hidro: number };
  diaDemanda: number;
  noiteDemanda: number;
  diaAtendido: number;
  noiteAtendido: number;
  armazenado: number;
  desperdicio: number;
  diesel: number;
  /** % da demanda atendida por fontes renováveis */
  energia: number;
  /** nível do reservatório (%) */
  agua: number;
  /** índice de equilíbrio (%) — renováveis, reservatório e desperdício */
  equilibrio: number;
  labels: { energia: string; agua: string; equilibrio: string };
}

const clamp = (n: number, a = 0, b = 100) => Math.max(a, Math.min(b, n));
const r1 = (n: number) => Math.round(n * 10) / 10;

export function simulate(i: LabInputs): LabResult {
  const C = LAB_CONST;
  let demanda = C.demandaBase + i.consumo * C.demandaPorPct;
  if (i.eficiencia) demanda *= 1 - C.economia;
  const diaDemanda = demanda / 2;
  const noiteDemanda = demanda / 2;

  // reservatório: chuva enche; consumo de água (proporcional ao consumo geral) esvazia
  const agua = clamp(20 + i.chuva * 0.9 - i.consumo * 0.35);
  const hidroFactor = Math.min(i.chuva, agua) / 100;
  const hidro = C.hidroMax * hidroFactor;
  const solar = i.paineis * C.solarPorPainel * (i.sol / 100);
  const eolica = i.turbinas * C.eolicaPorTurbina * (i.vento / 100);

  const diaProd = solar + eolica / 2 + hidro / 2;
  const noiteProd = eolica / 2 + hidro / 2;

  const diaAtendido = Math.min(diaDemanda, diaProd);
  const sobraDia = Math.max(0, diaProd - diaDemanda);
  const faltaNoite = Math.max(0, noiteDemanda - noiteProd);

  let armazenado = 0;
  if (i.bateria) armazenado = Math.min(sobraDia * (1 - C.bateriaPerda), C.bateriaCap, faltaNoite);
  const noiteAtendido = Math.min(noiteDemanda, noiteProd + armazenado);
  const usadoDaSobra = i.bateria ? armazenado / (1 - C.bateriaPerda) : 0;
  const desperdicio = Math.max(0, sobraDia - usadoDaSobra);

  const renovavelUsada = diaAtendido + noiteAtendido;
  const diesel = Math.max(0, demanda - renovavelUsada);
  const energia = clamp((renovavelUsada / demanda) * 100);
  const desperdicioPct = diaProd > 0 ? desperdicio / (diaProd + noiteProd) : 0;
  const equilibrio = clamp(energia * 0.6 + agua * 0.3 + (1 - desperdicioPct) * 10);

  return {
    demanda: r1(demanda),
    producao: { solar: r1(solar), eolica: r1(eolica), hidro: r1(hidro) },
    diaDemanda: r1(diaDemanda),
    noiteDemanda: r1(noiteDemanda),
    diaAtendido: r1(diaAtendido),
    noiteAtendido: r1(noiteAtendido),
    armazenado: r1(armazenado),
    desperdicio: r1(desperdicio),
    diesel: r1(diesel),
    energia: Math.round(energia),
    agua: Math.round(agua),
    equilibrio: Math.round(equilibrio),
    labels: {
      energia: energia >= 95 ? 'Suficiente' : energia >= 70 ? 'Quase lá' : 'Insuficiente',
      agua: agua >= 60 ? 'Estável' : agua >= 30 ? 'Atenção' : 'Crítico',
      equilibrio: equilibrio >= 80 ? 'Sustentável' : equilibrio >= 55 ? 'Em transição' : 'Desequilibrado',
    },
  };
}

export const LAB_LIMITS = [
  'Os números são unidades fictícias criadas para comparar cenários, não medidas reais de uma cidade.',
  'Na realidade, a energia do vento cresce com o cubo da velocidade; aqui usamos “aproveitamento” já simplificado.',
  'O modelo trata o dia como dois períodos (dia e noite). Cidades reais têm picos de consumo em horários específicos.',
  'Hidrelétricas também afetam rios, peixes e comunidades — impactos que o modelo não calcula e que merecem conversa.',
  'Baterias reais perdem capacidade com o tempo e usam materiais cuja extração tem impactos.',
];

// ───────────── Consumo de energia doméstico (potência × tempo) ─────────────

export interface Appliance { id: string; name: string; watts: number; hoursPerDay: number; days: number }

export const APPLIANCES: Appliance[] = [
  { id: 'chuveiro', name: 'Chuveiro elétrico', watts: 5500, hoursPerDay: 0.5, days: 30 },
  { id: 'geladeira', name: 'Geladeira (média de funcionamento)', watts: 150, hoursPerDay: 10, days: 30 },
  { id: 'tv', name: 'Televisão', watts: 100, hoursPerDay: 4, days: 30 },
  { id: 'lampada', name: 'Lâmpada LED (5 unidades)', watts: 45, hoursPerDay: 5, days: 30 },
  { id: 'ventilador', name: 'Ventilador', watts: 80, hoursPerDay: 6, days: 30 },
  { id: 'celular', name: 'Carregador de celular', watts: 10, hoursPerDay: 3, days: 30 },
];

/** kWh = W × h × dias ÷ 1000 */
export function kwh(a: Appliance) {
  return Math.round(((a.watts * a.hoursPerDay * a.days) / 1000) * 100) / 100;
}
