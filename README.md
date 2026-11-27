# Otis Workflow

Plataforma web responsiva para gestão e acompanhamento de ocorrências técnicas de elevadores da **OTIS**, permitindo organizar chamados em quadro Kanban, atender emergências pela visão mobile de campo e acompanhar métricas em tempo real.
Projeto desenvolvido para o **Challenge OTIS** (FIAP).

## Tecnologias

- **React (`^19.3.1`)**: interface baseada em componentes funcionais e hooks (`useState` e `useEffect`)
- **Vite (`^8.3.4`)**: bundler e servidor de desenvolvimento com HMR
- **Bootstrap (`^5.3.8`)**: grid responsivo, cards, badges, barra de navegação colapsável e modais
- **Bootstrap Icons (`^1.13.2`)** e **Font Awesome (`7.3.1`)**: ícones da interface e das ações dos cartões
- **CSS3 (`src/global.css`)**: estilos compartilhados e media queries para responsividade (`991.98px`, `575.98px` e `360px`)
- **JavaScript (ES Modules)** e **LocalStorage**: gerenciamento de estado e persistência local dos chamados (`otis_ocorrencias`)
- **Google Fonts**: `Inter` e `Roboto`

## Páginas e Visões

| Componente / Visão                     | Conteúdo                                                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/components/KanbanBoard.jsx`       | Quadro Kanban com 4 colunas (*Triagem*, *Em Deslocamento*, *Em Atendimento* e *Concluído*)         |
| `src/components/VisaoMobile.jsx`       | Visão Técnico (mobile): destaque para emergências **P1** e fila de trabalho em campo               |
| `src/components/Relatorios.jsx`        | Painel analítico com totais de chamados, emergências P1, atendimentos em andamento e concluídos    |
| `src/components/ModalNovaOcorrencia.jsx` | Modal para cadastro de nova ocorrência (edifício, elevador, prioridade, problema e descrição)    |
| `src/components/ModalDetalhes.jsx`     | Modal para exibição detalhada das informações da ocorrência                                        |

Todas as visões compartilham um layout único e responsivo com grid do Bootstrap e media queries em `src/global.css`.
## Estrutura

```text
otis-kanban/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── global.css
    ├── components/
    │   ├── CartaoOcorrencia.jsx
    │   ├── ColunaKanban.jsx
    │   ├── KanbanBoard.jsx
    │   ├── ModalDetalhes.jsx
    │   ├── ModalNovaOcorrencia.jsx
    │   ├── Navbar.jsx
    │   ├── Relatorios.jsx
    │   └── VisaoMobile.jsx
    └── data/
        └── dadosIniciais.js
```

## Integrantes

| Nome        | RM       |
| ----------- | -------- |
| João Marcos | RM569356 |
| Igor Miguel | RM573567 |
| Yago Avena  | RM568635 |

## Vídeo pitch

Link (acesso público): [Assistir no YouTube](https://www.youtube.com/watch?v=nFW98b_MRVM)


## Deploy

Link do deploy [Acesse o deploy](challenge-otis-two.vercel.app)

## Como abrir e executar

1. Acesse a pasta do projeto no terminal:
   ```bash
   cd otis-kanban
   ```
2. Rode o comando abaixo caso a pasta `node_modules` ainda não esteja instalada:
   ```bash
   npm install
   ```
3. Rode o comando abaixo para iniciar e visualizar o projeto:
   ```bash
   npm run dev
   ```
