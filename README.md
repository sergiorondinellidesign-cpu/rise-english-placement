# Teste de Nivelamento de Inglês, Rise

Sistema completo: página do teste, banco de dados e envio automático do resultado por email alguns minutos depois da pessoa responder.

## Como funciona

1. A pessoa preenche nome, email e responde 30 perguntas (A1 a C1).
2. O front-end envia as respostas para o back-end, que calcula o nível e salva tudo no banco.
3. Um job roda a cada minuto no back-end e, depois do tempo configurado em `EMAIL_DELAY_MINUTES` (padrão 4 minutos), envia um email com o resultado.

Nada aparece na tela na hora, como você pediu.

## Passo a passo para colocar no ar

### 1. Banco de dados (Supabase, gratuito)

1. Crie um projeto em supabase.com.
2. Vá em SQL Editor e rode o conteúdo do arquivo `schema.sql`.
3. Em Project Settings > Database, copie a Connection String (modo "URI").

### 2. Email (usando o Gmail/Google Workspace da Rise)

1. Ative a verificação em duas etapas na conta que vai enviar os emails (Conta Google > Segurança).
2. Em Segurança > Senhas de app, gere uma senha de app para "Email".
3. Guarde essa senha, ela é o valor de `EMAIL_PASS`.

Isso funciona bem para o volume de um teste de nivelamento. Se o volume crescer muito (centenas de envios por dia), vale migrar para Resend ou SendGrid depois, é só trocar o `mailer.js`.

### 3. Back-end (Railway)

1. Suba esta pasta para um repositório no GitHub.
2. Em railway.app, crie um novo projeto a partir do repositório.
3. Configure as variáveis de ambiente (aba Variables), usando `.env.example` como referência:
   - `DATABASE_URL` (do Supabase)
   - `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM_NAME`
   - `EMAIL_DELAY_MINUTES`
   - `FRONTEND_ORIGIN` (o domínio onde o front-end vai ficar, depois do passo 4)
4. O Railway detecta o `package.json` e roda `npm start` automaticamente.
5. Copie a URL pública que o Railway gerar para o back-end.

### 4. Front-end (Vercel)

1. Abra `public/index.html` e troque a linha `API_BASE_URL` pela URL do back-end que o Railway gerou.
2. Suba a pasta `public` como um novo projeto estático na Vercel (ou em qualquer hospedagem simples).
3. Volte no Railway e atualize `FRONTEND_ORIGIN` com o domínio que a Vercel gerou.

### 5. Teste ponta a ponta

1. Abra o link do front-end, responda o teste com um email seu.
2. Espere o tempo configurado em `EMAIL_DELAY_MINUTES`.
3. Confira se o email chegou (e a caixa de spam, na primeira vez).

## Rodando localmente (opcional, para conferir antes do deploy)

```bash
npm install
cp .env.example .env
# preencha o .env com dados reais
npm start
```

O front-end em `public/index.html` pode ser aberto direto no navegador durante o teste local, apontando `API_BASE_URL` para `http://localhost:3333`.

## O que mudar depois, se quiser

- Trocar o texto de `NEXT_STEP` em `src/emailTemplate.js` para orientar cada nível de um jeito mais específico.
- Adicionar mais perguntas em `src/scoring.js` (e replicar em `public/index.html`), mantendo os dois arquivos sincronizados.
- Guardar o telefone da pessoa também, se for útil para o time de vendas entrar em contato.
