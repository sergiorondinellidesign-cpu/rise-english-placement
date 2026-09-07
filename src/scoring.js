// Banco de questões do teste de nivelamento, organizado por nível do CEFR (A1 a C1).
// Cada nível tem 6 questões; precisa acertar 4 de 6 para "passar" para o próximo nível.

const LEVELS = [
  {
    code: "A1",
    questions: [
      { opts: ["am", "is", "are", "be"], answer: 0 },
      { opts: ["is", "are", "am", "be"], answer: 1 },
      { opts: ["eat", "eats", "eating", "to eat"], answer: 1 },
      { opts: ["rain", "rains", "is", "are"], answer: 2 },
      { opts: ["a", "an", "the", "some a"], answer: 2 },
      { opts: ["is", "are", "do", "does"], answer: 0 },
    ],
  },
  {
    code: "A2",
    questions: [
      { opts: ["go", "went", "gone", "goes"], answer: 1 },
      { opts: ["for", "since", "ago", "during"], answer: 1 },
      { opts: ["than", "that", "then", "as"], answer: 0 },
      { opts: ["will", "would", "are", "did"], answer: 0 },
      { opts: ["isn't", "hasn't", "doesn't", "wasn't"], answer: 1 },
      { opts: ["some", "any", "much of", "no"], answer: 1 },
    ],
  },
  {
    code: "B1",
    questions: [
      { opts: ["has", "had", "have", "was"], answer: 1 },
      { opts: ["have", "had", "would have", "has"], answer: 1 },
      { opts: ["was reviewed", "reviewed", "has reviewed", "review"], answer: 0 },
      { opts: ["to postpone", "postponing", "postpone", "postponed"], answer: 1 },
      { opts: ["be", "being", "to be", "been"], answer: 1 },
      { opts: ["was", "were", "is", "has been"], answer: 1 },
    ],
  },
  {
    code: "B2",
    questions: [
      { opts: ["would leave", "would have left", "had left", "left"], answer: 1 },
      { opts: ["that", "whose", "which", "who"], answer: 1 },
      { opts: ["he submitted", "did he submit", "he did submit", "submitted he"], answer: 1 },
      { opts: ["work", "working", "worked", "have worked"], answer: 1 },
      { opts: ["make", "made", "makes", "are making"], answer: 1 },
      { opts: ["raised", "risen", "arisen", "rose"], answer: 1 },
    ],
  },
  {
    code: "C1",
    questions: [
      { opts: ["Despite of", "In spite", "Notwithstanding", "Although of"], answer: 2 },
      { opts: ["has been", "has there been", "there has been", "it has been"], answer: 1 },
      { opts: ["is", "be", "was", "being"], answer: 1 },
      { opts: ["were", "was", "had been", "are"], answer: 1 },
      { opts: ["be", "being", "been", "to be"], answer: 1 },
      { opts: ["had", "was", "did", "has"], answer: 0 },
    ],
  },
];

// Rótulos amigáveis para o email (o CEFR fica entre parênteses para quem já conhece a escala)
const FRIENDLY_LABEL = {
  "Pré-A1": "Iniciante",
  A1: "Iniciante",
  A2: "Básico",
  B1: "Intermediário",
  B2: "Avançado",
  C1: "Fluente",
};

function scoreSubmission(answers) {
  const breakdown = [];
  let highestPassed = null;

  for (const level of LEVELS) {
    let correct = 0;
    level.questions.forEach((item, idx) => {
      const key = `${level.code}-${idx}`;
      const given = answers ? answers[key] : undefined;
      if (given !== undefined && Number(given) === item.answer) correct++;
    });
    breakdown.push({ code: level.code, correct, total: level.questions.length });
    if (correct >= 4) highestPassed = level.code;
  }

  const levelCode = highestPassed || "Pré-A1";
  const levelLabel = FRIENDLY_LABEL[levelCode];

  return { levelCode, levelLabel, breakdown };
}

module.exports = { LEVELS, FRIENDLY_LABEL, scoreSubmission };
