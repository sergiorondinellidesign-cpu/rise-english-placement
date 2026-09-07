const NEXT_STEP = {
  "Pré-A1": "Vamos começar pelo essencial: vocabulário do dia a dia e as estruturas mais básicas do inglês.",
  A1: "Você já reconhece o básico. As próximas aulas vão fixar vocabulário essencial e os tempos verbais mais usados.",
  A2: "Boa base para seguir em frente. O foco agora é ampliar os tempos verbais e ganhar confiança em conversas simples.",
  B1: "Você já se comunica em situações do dia a dia. Vamos trabalhar naturalidade e mais precisão gramatical.",
  B2: "Nível avançado de estrutura. As aulas vão focar em nuances, vocabulário mais rico e fluência em temas complexos.",
  C1: "Você domina estruturas avançadas do inglês. O foco agora é refinamento, sotaque e naturalidade em qualquer contexto.",
};

function buildEmailHtml({ name, levelCode, levelLabel, breakdown }) {
  const rows = breakdown
    .map(
      (b) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e2d4;color:#1A1A1A;font-family:Arial,sans-serif;font-size:14px;">${b.code}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e2d4;color:#1A1A1A;font-family:Arial,sans-serif;font-size:14px;text-align:right;">${b.correct}/${b.total}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="background:#FDFBF3;padding:32px 16px;font-family:Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d4;">
      <div style="background:#0F2C4C;padding:24px 28px;">
        <span style="color:#FFEA00;font-family:Arial,sans-serif;font-weight:bold;font-size:20px;letter-spacing:0.5px;">rise</span>
      </div>
      <div style="padding:28px;">
        <p style="color:#1A1A1A;font-size:15px;margin:0 0 16px;">Oi, ${name || "tudo bem"}!</p>
        <p style="color:#1A1A1A;font-size:15px;line-height:1.6;margin:0 0 20px;">
          Seu teste de nivelamento de inglês já foi corrigido. Este é o seu resultado:
        </p>
        <div style="border:2px solid #E0432A;padding:20px;text-align:center;margin-bottom:20px;">
          <div style="color:#0F2C4C;font-size:13px;font-family:Arial,sans-serif;margin-bottom:4px;">Nível estimado</div>
          <div style="color:#E0432A;font-size:28px;font-weight:bold;font-family:Arial,sans-serif;">${levelLabel} (${levelCode})</div>
        </div>
        <p style="color:#1A1A1A;font-size:14px;line-height:1.6;margin:0 0 20px;">
          ${NEXT_STEP[levelCode] || ""}
        </p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${rows}
        </table>
        <p style="color:#1A1A1A;font-size:14px;line-height:1.6;margin:0 0 8px;">
          Esse resultado é o ponto de partida das suas aulas. Em breve alguém do time da Rise entra em contato para combinar os próximos passos.
        </p>
        <p style="color:#6b6b6b;font-size:12px;line-height:1.6;margin-top:28px;">
          Você recebeu este email porque respondeu ao teste de nivelamento de inglês da Rise.
        </p>
      </div>
    </div>
  </div>`;
}

module.exports = { buildEmailHtml };
