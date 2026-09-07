require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db");
const { scoreSubmission } = require("./scoring");
const { startCron } = require("./cron");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "*",
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/submit", async (req, res) => {
  try {
    const { name, email, answers } = req.body || {};

    if (!name || !email || !answers) {
      return res.status(400).json({ ok: false, error: "Dados incompletos." });
    }

    const { levelCode, levelLabel, breakdown } = scoreSubmission(answers);

    await pool.query(
      `INSERT INTO submissions (name, email, answers, breakdown, level_code, level_label)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, JSON.stringify(answers), JSON.stringify(breakdown), levelCode, levelLabel]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("[submit] erro:", err.message);
    res.status(500).json({ ok: false, error: "Erro ao salvar respostas." });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  startCron();
});
