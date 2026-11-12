/* ============================================================
   Vértice Racing — datos de demostración
   Todos los datos son ficticios. Edita este fichero para
   adaptar la plantilla a tu propio equipo.
   ============================================================ */

window.RACING_DATA = {
  team: {
    name: "Vértice Racing",
    base: "Zaragoza, España",
    chassis: "VX-26",
    powerUnit: "Vértice VR26",
    principal: "Marta Iglesias",
  },

  seasons: [
    {
      year: 2021,
      drivers: "Ruiz · Berger",
      chassis: "VX-21",
      pos: 9,
      podiums: 0,
      points: 12,
      note: {
        title: "2021 · El debut",
        body: [
          "El VX-21 llega a la parrilla con Álvaro Ruiz y Nils Berger. Un coche sencillo, fiable y lento: noveno en constructores con 12 puntos.",
          "El equipo termina nueve carreras de las veintidós y aprende más en un año que en los dos anteriores en el simulador.",
        ],
      },
    },
    {
      year: 2022,
      drivers: "Ruiz · Berger",
      chassis: "VX-22",
      pos: 8,
      podiums: 0,
      points: 34,
      note: {
        title: "2022 · El túnel de viento",
        body: [
          "Octavo con 34 puntos. Berger firma dos sextos puestos y el equipo estrena su propio túnel de viento, que cambia por completo la forma de desarrollar el coche.",
        ],
      },
    },
    {
      year: 2023,
      drivers: "Ruiz · Berger",
      chassis: "VX-23",
      pos: 6,
      podiums: 2,
      points: 128,
      note: {
        title: "2023 · El primer podio",
        body: [
          "Monza. Ruiz sale sexto, aguanta la presión doce vueltas y cruza la meta tercero. El primer podio de la historia del equipo.",
          "Sexto en constructores con 128 puntos y dos podios: el salto definitivo hacia la zona media alta.",
        ],
      },
    },
    {
      year: 2024,
      drivers: "Ruiz · Berger",
      chassis: "VX-24",
      pos: 5,
      podiums: 3,
      points: 190,
      note: {
        title: "2024 · El año sólido",
        body: [
          "Tres podios y 190 puntos: quinto en constructores, la mejor temporada del equipo hasta la fecha.",
          "Vértice Power arranca con doce ingenieros para diseñar el primer motor propio.",
        ],
      },
    },
    {
      year: 2025,
      drivers: "Ruiz · Berger",
      chassis: "VX-25",
      pos: 7,
      podiums: 0,
      points: 96,
      note: {
        title: "2025 · Año de transición",
        body: [
          "Séptimo con 96 puntos y sin podios. El equipo desvía recursos al coche de 2026 y asume un año discreto a cambio del salto técnico del siguiente.",
        ],
      },
    },
    {
      year: 2026,
      drivers: "Ruiz · Berger",
      chassis: "VX-26",
      pos: 4,
      podiums: 2,
      points: 142,
      note: {
        title: "2026 · La era VX-26",
        body: [
          "Debuta el VX-26 con el motor Vértice VR26 y la nueva reglamentación. Cuarto en constructores con 142 puntos y dos podios.",
          "Es el mejor arranque de su historia y el primer año en el que el equipo pelea de forma regular la quinta plaza.",
        ],
      },
    },
  ],

  drivers: {
    ruiz: {
      pos: "P5",
      pts: "88",
      pod: "2",
      win: "0",
      pole: "1",
      fast: "2",
      best: "P2",
      ret: "1",
    },
    berger: {
      pos: "P9",
      pts: "54",
      pod: "0",
      win: "0",
      pole: "1",
      fast: "0",
      best: "P4",
      ret: "3",
    },
  },
};
