const actualYear = new Date().getFullYear()
const birthYear = 1993
const devYears = actualYear - birthYear - 11

export const stats = [
  { label: 'Sodas Consommés', value: '+' + Math.round(devYears * 365 * 1.23) },
  { label: 'Domaines achetés', value: Math.round(devYears / 2) },
  { label: 'Distribs & versions Linux Testées', value: Math.round(devYears) },
  { label: 'Heures de Veille / Semaine', value: '+' + Math.round((24 - 8) * 7 * 0.2) },
  { label: 'Projets Perso Abandonnés', value: '...classified' },
  { label: 'Nuits Blanches (Debug)', value: '+' + Math.round(((devYears * 365) / 7) * 0.3) },
]
