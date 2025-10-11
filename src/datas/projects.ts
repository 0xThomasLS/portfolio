export const projects = [
  {
    title: 'Portfolio Interactif v2',
    status: { text: 'COMPLETED', class: 'bg-green-500/20 text-green-300' },
    description:
      'Mon portfolio personnel sous forme de terminal interactif et de gestionnaire de fenêtres, construit avec Vue.js et xterm.js.',
    tags: ['Vue.js', 'TypeScript', 'Pinia', 'TailwindCSS', 'xterm.js', 'Chart.js'],
    repoUrl: 'https://github.com/0xThomasLS/portfolio',
  },
  {
    title: 'Keystone browser',
    status: { text: 'IN_PROGRESS', class: 'bg-yellow-500/20 text-yellow-300' },
    description:
      "Un navigateur web fortement inspiré par Arc browser, en remplaçant Swift par Rust. Utilise Slint pour l'interface utilisateur et CEF (Chromium Embedded Framework) pour le rendu web.",
    tags: ['Rust', 'Slint', 'Chromium (CEF)'],
    repoUrl: 'https://github.com/0xThomasLS/keystone-browser',
  },
  {
    title: 'Suricate',
    status: { text: 'ARCHIVED', class: 'bg-gray-500/20 text-gray-300' },
    description: "Mini dashboard de vérification de status d'une liste JSON de pages web ou d'IP",
    tags: ['Node.js', 'express', 'socket.io', 'pug'],
    repoUrl: 'https://github.com/0xThomasLS/Suricate',
  },
]
