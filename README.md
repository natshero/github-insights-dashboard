# GitHub Insights Dashboard

Um dashboard simples e elegante para visualizar dados de usuários do GitHub, incluindo perfil, repositórios públicos e gráficos de insights.

Este projeto foi desenvolvido utilizando **Next.js 16**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Recharts** e **Jest** para testes.

---

## 🚀 Funcionalidades

- Buscar qualquer usuário do GitHub
- Exibir perfil (avatar, nome, bio, links, seguidores…)
- Listagem de repositórios públicos (ordenados por data)
- Mock de repositórios criados em tempo real (a cada 30s)
- Gráficos de insights:
  - Linguagens mais utilizadas
  - Total de estrelas por linguagem
- Tema claro/escuro
- Testes automatizados com Jest + Testing Library

---

## 🧩 Arquitetura da Aplicação

A aplicação segue uma estrutura simples e modular:

```
Busca → Carrega usuário → Carrega repositórios → Renderiza UI
                             ↓
                Simulação de repositórios (30s)
```

- **Camada de UI** (componentes ShadCN)  
- **Hook de controle (`useDashboard`)** para lógica, estados e side effects  
- **Serviço de API (`services/github-api.ts`)**  
- **Componentes desacoplados**:  
  - UserSearchForm  
  - UserProfileCard  
  - RepoList  
  - RepoCard  
  - RepoInsightsCharts  

---

## 📦 Tecnologias

- **Next.js 16 / App Router**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Recharts**
- **Axios**
- **Jest + React Testing Library**
- **next-themes** (tema claro/escuro)

---

## ▶️ Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Rodar testes
npm test
```

O projeto sobe em:
```
http://localhost:3000
```

---

## 🧪 Testes

Os testes cobrem:

- Renderização inicial do dashboard
- Busca de usuário
- Renderização de repositórios
- Inserção de repositórios simulados (mock do setInterval)

Para rodar:

```bash
npm test
```

---

## 📁 Estrutura resumida

```
src/
 ├─ app/
 │   ├─ page.tsx
 │   └─ layout.tsx
 ├─ components/
 ├─ services/
 ├─ types/
 ├─ lib/
 ├─ styles/
 └─ __tests__/
```

---

## 🎨 Tema

Tema claro/escuro controlado pelo **ThemeProvider** do `next-themes`.

---

## ✅ Integração Contínua (GitHub Actions)

Este repositório possui um workflow de CI em `.github/workflows/ci.yml` que roda automaticamente:

- `npm ci`
- `npm run lint`
- `npm test`

em cada push e pull request para a branch `main`.

---

## 📄 Licença

Este projeto é apenas demonstrativo e pode ser utilizado livremente para estudos e testes.
