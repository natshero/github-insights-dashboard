# GitHub Insights Dashboard

[![CI](https://img.shields.io/github/actions/workflow/status/natshero/github-insights-dashboard/ci.yml?label=CI)](https://github.com/natshero/github-insights-dashboard/actions)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED)
![License](https://img.shields.io/badge/license-MIT-green)

Um dashboard simples e elegante para visualizar dados de usuários do GitHub, incluindo perfil, repositórios públicos e gráficos de insights.

---

## 🚀 Funcionalidades

- Buscar qualquer usuário do GitHub  
- Exibir perfil (avatar, nome, bio, links, seguidores…)  
- Listagem de repositórios públicos (ordenados por data)  
- Mock de repositórios em tempo real (a cada 30s)  
- Gráficos de insights (linguagens e estrelas por linguagem)  
- Tema claro/escuro  
- Testes automatizados  

---

## 🧭 Navegação rápida

- [Screenshots](#-screenshots)  
- [Arquitetura da Aplicação](#-arquitetura-da-aplicação)  
- [Tecnologias](#-tecnologias)  
- [Como rodar localmente](#️-como-rodar-localmente)  
- [Testes](#-testes)  
- [Estrutura de Pastas](#-estrutura-resumida)  
- [Tema](#-tema)  
- [CI/CD](#-integração-contínua-github-actions)  
- [Docker](#-docker)  
- [Licença](#-licença)  

---

## 📸 Screenshots

| Funcionalidade | Preview |
|----------------|---------|
| Tela de Busca | `public/screenshots/search.png` |
| Perfil | `public/screenshots/profile.png` |
| Repositórios | `public/screenshots/repos.png` |
| Insights | `public/screenshots/charts.png` |

---

## 🧩 Arquitetura da Aplicação

```
UserSearchForm → useDashboard → Serviços (API GitHub)
                         ↓
           Mock de repositórios (intervalo 30s)
                         ↓
 UI: UserProfile, RepoList, RepoCard, RepoInsightsCharts
```

---

## 📦 Tecnologias

- **Next.js 16 / App Router**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Recharts**
- **Axios**
- **Jest + Testing Library**
- **next-themes**
- **Docker (produção)**

---

## ▶️ Como rodar localmente

```bash
npm install
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🧪 Testes

```bash
npm test
```

---

## 📁 Estrutura resumida

```
src/
 ├─ app/
 ├─ components/
 ├─ services/
 ├─ types/
 ├─ lib/
 ├─ styles/
 └─ __tests__/
```

---

## 🎨 Tema

O tema claro/escuro é controlado automaticamente via:

- `next-themes`
- Variáveis CSS no `globals.css`

---

## ✅ Integração Contínua (GitHub Actions)

Arquivo:

```
.github/workflows/ci.yml
```

Fluxo:

- `npm ci`
- `npm run lint`
- `npm test`

---

## 🐳 Docker

```bash
docker build -t github-insights-dashboard .
docker run -p 3000:3000 github-insights-dashboard
docker compose up --build
```

---

## 📄 Licença

Livre para uso em estudos e testes.
