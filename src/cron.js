const cron = require("node-cron");
const { pool } = require("./db");
const { sendResultEmail } = require("./mailer");

const DELAY_MINUTES = Number(process.env.EMAIL_DELAY_MINUTES || 4);

async function processPendingSubmissions() {
  const { rows } = await pool.query(
    `SELECT id, name, email, breakdown, level_code, level_label
     FROM submissions
     WHERE email_sent_at IS NULL
       AND created_at <= now() - ($1 || ' minutes')::interval
     ORDER BY created_at ASC
     LIMIT 20`,
    [DELAY_MINUTES]
  );

  for (const row of rows) {
    try {
      await sendResultEmail({
        to: row.email,
        name: row.name,
        levelCode: row.level_code,
        levelLabel: row.level_label,
        breakdown: row.breakdown,
      });
      await pool.query(`UPDATE submissions SET email_sent_at = now() WHERE id = $1`, [row.id]);
      console.log(`[cron] resultado enviado para ${row.email}`);
    } catch (err) {
      console.error(`[cron] falha ao enviar para ${row.email}:`, err.message);
    }
  }
}

function startCron() {
  // roda a cada minuto e verifica quem já passou do tempo de espera configurado
  cron.schedule("* * * * *", () => {
    processPendingSubmissions().catch((err) => console.error("[cron] erro:", err.message));
  });
  console.log(`[cron] ativo, atraso configurado para ${DELAY_MINUTES} minuto(s)`);
}

module.exports = { startCron, processPendingSubmissions };
