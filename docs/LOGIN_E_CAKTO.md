# Ensinaê — login, assinaturas e Cakto

## Como funciona

1. A pessoa compra o Ensinaê na **Cakto**.
2. A Cakto avisa o site (webhook) → o Ensinaê cria a conta com o **e-mail do comprador** e envia um **e-mail de convite** com o link para criar a senha.
3. A pessoa cria a senha e entra em **appaulas.vercel.app** com e-mail e senha.
4. **Renovação** mantém o acesso. **Atraso** mantém o acesso com um aviso. **Cancelamento, pausa, reembolso ou chargeback** bloqueiam o acesso (a pessoa vê a tela “Acesso inativo” com o botão de renovar).
5. Você, como **superadmin**, vê todos os assinantes em **Assinantes** (menu lateral), libera ou bloqueia manualmente e cria acessos de cortesia.

Sem as configurações abaixo, o site continua funcionando no **modo demonstrativo**, sem login.

---

## Passo 1 — Criar o banco e o login (Supabase, gratuito)

1. Acesse **https://supabase.com** → **Start your project** → entre com o GitHub.
2. **New project**: nome `ensinae`, crie uma senha do banco (guarde), região **South America (São Paulo)** → **Create new project**. Aguarde uns 2 minutos.
3. No menu da esquerda: **SQL Editor** → **New query** → cole todo o conteúdo do arquivo [`supabase/schema.sql`](../supabase/schema.sql) → **Run**. Deve aparecer “Success”.
4. **Authentication → URL Configuration**:
   - **Site URL**: `https://appaulas.vercel.app` (ou o seu domínio)
   - **Redirect URLs** → Add URL: `https://appaulas.vercel.app/**`
5. **Authentication → Sign In / Providers → Email**: deixe **ativado**. Desative “Allow new users to sign up” (só a Cakto e você criam contas).
6. **Project Settings → API Keys**: anote
   - **Project URL** (algo como `https://abcd.supabase.co`)
   - **Publishable key** / `anon` (pública)
   - **Secret key** / `service_role` (**secreta — nunca publique**)

### E-mails em português (recomendado)

Em **Authentication → Emails → Templates**:

**Invite user** — Assunto: `Seu acesso ao Ensinaê está pronto`
```html
<h2>Bem-vinda(o) ao Ensinaê!</h2>
<p>Sua compra foi confirmada. Clique no botão abaixo para criar sua senha e entrar:</p>
<p><a href="{{ .ConfirmationURL }}">Criar minha senha</a></p>
<p>Depois, entre sempre em https://appaulas.vercel.app com este e-mail e a senha que você criou.</p>
```

**Reset password** — Assunto: `Crie uma nova senha no Ensinaê`
```html
<h2>Nova senha</h2>
<p>Clique para criar uma nova senha:</p>
<p><a href="{{ .ConfirmationURL }}">Criar nova senha</a></p>
<p>Se você não pediu, ignore este e-mail.</p>
```

### Envio de e-mails em escala
O envio de e-mails padrão do Supabase tem **limite baixo por hora** e serve para testes. Antes de vender, configure um provedor (por exemplo **Resend** ou **Brevo**) em **Authentication → Emails → SMTP Settings**, com um remetente do seu domínio.

---

## Passo 2 — Variáveis na Vercel

Em **vercel.com → projeto appaulas → Settings → Environment Variables**, adicione (ambiente *Production*):

| Nome | Valor |
|---|---|
| `VITE_SUPABASE_URL` | Project URL do Supabase |
| `VITE_SUPABASE_ANON_KEY` | Publishable / anon key |
| `SUPABASE_URL` | Project URL do Supabase (de novo) |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret / service_role key (**secreta**) |
| `CAKTO_WEBHOOK_SECRET` | o *secret* do webhook (Passo 3) |
| `CAKTO_PRODUCT_IDS` | id ou id curto do produto Ensinaê na Cakto (opcional; separe vários por vírgula) |
| `SITE_URL` | `https://appaulas.vercel.app` |
| `VITE_CHECKOUT_URL` | link do checkout da Cakto (aparece em “Ainda não tenho acesso”) |

Depois: **Deployments → ⋯ no mais recente → Redeploy**.

---

## Passo 3 — Webhook na Cakto

1. No painel da Cakto: **Apps → Webhooks** (https://app.cakto.com.br/dashboard/apps) → **Adicionar**.
2. **URL**: `https://appaulas.vercel.app/api/cakto-webhook`
3. **Produto**: Ensinaê.
4. **Eventos**: marque
   `purchase_approved`, `subscription_renewed`, `subscription_resumed`, `subscription_late`, `subscription_late_recovered`, `subscription_renewal_refused`, `subscription_canceled`, `subscription_paused`, `refund`, `chargeback`.
5. Salve e **copie o secret** do webhook → coloque em `CAKTO_WEBHOOK_SECRET` na Vercel → Redeploy.
6. Use **Testar webhook** na Cakto. Em **Assinantes** (no Ensinaê, como superadmin) o evento aparece em “Últimos eventos da Cakto”.

> O teste da Cakto usa um e-mail de exemplo. Para testar de ponta a ponta, faça uma compra real com cupom de 100% ou valor mínimo, usando um e-mail seu.

---

## Passo 4 — Contas de superadmin

Com o Passo 1 feito, rode (no seu computador, com Node.js instalado, dentro da pasta do projeto):

```bash
SUPABASE_URL=https://SEU-PROJETO.supabase.co SUPABASE_SERVICE_ROLE_KEY=sua-chave-secreta node scripts/criar-superadmin.mjs email1@seudominio.com email2@seudominio.com
```

O script mostra a senha gerada para cada e-mail. Superadmins:
- nunca são bloqueados por eventos da Cakto;
- veem o menu **Assinantes**;
- podem “Ver o Ensinaê como” professor, aluno ou coordenação.

---

## O que fica guardado onde

| Dado | Onde |
|---|---|
| Contas, status da assinatura, eventos da Cakto | Supabase (protegido por regras de acesso no banco) |
| Aulas, turmas e portfólio que o professor cria | No navegador de cada pessoa, separado por conta |
| Chave secreta do Supabase e secret da Cakto | Só nas variáveis da Vercel (nunca no site) |

**Limitação atual:** o conteúdo que cada professor cria ainda fica no navegador do dispositivo. Se ele trocar de computador, não leva as aulas criadas (pode usar Ajustes → Exportar/Importar backup). A sincronização na nuvem é o próximo passo natural.
