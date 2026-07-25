# Barisch Technologies — site institucional

Site estático, sem build, sem framework. HTML puro + CSS + JS.
Feito para ser fácil de manter e publicar em qualquer host gratuito.

---

## Estrutura de arquivos

```
barisch-tech/
├── index.html          Home
├── servicos.html       Detalhes dos serviços
├── trabalhos.html      Portfólio com case studies
├── contato.html        Formulário e canais de contato
├── assets/
│   ├── styles.css      Estilos compartilhados (tokens, componentes)
│   └── main.js         JS compartilhado (reveal on scroll, form)
├── robots.txt          Instruções para buscadores
├── .gitignore
└── README.md           Este arquivo
```

Todos os HTMLs referenciam `assets/styles.css` e `assets/main.js`.
Se você mudar um estilo, ele atualiza em todas as páginas.

---

## Antes de publicar — substitua estes placeholders

Abra o VS Code, use `Cmd/Ctrl + Shift + F` (buscar em todos os arquivos) e substitua:

| Buscar | Substituir por |
|---|---|
| `SEU_NUMERO` | seu WhatsApp no formato `5511999999999` |
| `contato@barischtech.com.br` | seu e-mail real |
| `00.000.000/0001-00` | seu CNPJ |
| `[X] anos` (em `index.html`) | seu tempo de experiência |
| Links `https://www.linkedin.com/` | URL real do seu LinkedIn |

`trabalhos.html` está com casos placeholder entre `[colchetes]` e não está linkado
no menu ainda — quando tiver um cliente real, preencha os casos e adicione o link
de volta em **todos** os HTMLs (nav e rodapé). O mesmo vale para os depoimentos
(blockquotes) em `index.html`.

---

## Rodar localmente

Você pode simplesmente abrir `index.html` no navegador, ou usar um servidor local
para simular o comportamento de produção:

```bash
# Se tem Node instalado:
npx serve .

# Se prefere Python:
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` (ou a porta que o serve indicar).

---

## Publicar de graça

### Opção 1 — Vercel (mais rápido, arraste e solte)

1. Crie conta em [vercel.com](https://vercel.com) com GitHub.
2. New Project → importe o repositório (ou arraste a pasta inteira).
3. Deploy. Fica no ar em `barisch-tech.vercel.app`.
4. Custom domain: Settings → Domains → adicione seu domínio próprio.

### Opção 2 — Netlify (também drag-and-drop)

1. Crie conta em [netlify.com](https://netlify.com).
2. Sites → Deploy manually → arraste a pasta.
3. Configure o domínio custom em Site settings → Domain management.

### Opção 3 — GitHub Pages (versionado, "jeito de dev")

1. Crie um repositório público no GitHub (ex.: `barisch-tech`).
2. Faça push desta pasta:
   ```bash
   git init
   git add .
   git commit -m "site inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/barisch-tech.git
   git push -u origin main
   ```
3. No GitHub: Settings → Pages → Source: **Deploy from a branch**, Branch: `main` / root.
4. URL: `seu-usuario.github.io/barisch-tech`.
5. Para domínio próprio: Settings → Pages → Custom domain.

---

## Adicionar uma nova página

1. Duplique `servicos.html` e renomeie (ex.: `blog.html`).
2. Ajuste `<title>` e `<meta description>`.
3. Substitua o conteúdo dentro de `<main>`.
4. Adicione a página ao menu em **todos** os HTMLs:
   ```html
   <nav class="nav-links">
     <a href="index.html">Home</a>
     <a href="servicos.html">Serviços</a>
     <a href="trabalhos.html">Trabalhos</a>
     <a href="blog.html">Blog</a>           <!-- nova -->
     <a href="contato.html">Contato</a>
   </nav>
   ```
5. Adicione também nos rodapés.

**Dica:** para marcar o item ativo no menu, adicione `class="active"` no link da
página atual (dá um sublinhado azul).

---

## Personalizar o visual

Todos os tokens estão no topo de `assets/styles.css`:

```css
:root{
  --paper:#ECEEF1;   /* fundo geral */
  --panel:#FFFFFF;   /* fundo de cards */
  --ink:#0E1116;     /* texto e seções escuras */
  --slate:#5A6472;   /* texto secundário */
  --line:#CFD4DA;    /* linhas e bordas */
  --cobalt:#1F3FE0;  /* acento primário (botões, links) */
  --sinal:#FFD400;   /* acento amarelo (marca-texto, botão CTA escuro) */
}
```

Troque o `--cobalt` e o `--sinal` para dar outra identidade ao site sem
mexer no resto.

Fontes vêm do Google Fonts (Archivo + Instrument Sans + IBM Plex Mono).
Para trocar, edite o `<link>` no `<head>` de cada HTML e ajuste
`font-family` no CSS.

---

## Formulário de contato

Hoje o formulário abre o programa de e-mail do visitante com uma mensagem pronta.
Funciona sem servidor, mas depende do visitante ter um cliente de e-mail configurado.

**Para receber submissões direto na sua caixa de entrada**, use um serviço:

- [Formspree](https://formspree.io) — grátis até 50 submissões/mês
- [Web3Forms](https://web3forms.com) — grátis, sem limite
- [Basin](https://usebasin.com) — grátis até 100/mês

Basta trocar o `action` do `<form>` pela URL do serviço e remover o handler
JavaScript que está em `assets/main.js`.

---

## Licença

Código deste site: uso interno de Barisch Technologies LTDA.
Fontes: Google Fonts (Open Font License).
