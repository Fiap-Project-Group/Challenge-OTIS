import React, { useState } from 'react';

const abas = [
  { id: 'kanban', rotulo: 'Quadro Kanban' },
  { id: 'mobile', rotulo: 'Visão Técnico' },
  { id: 'relatorios', rotulo: 'Relatórios' },
];

export default function Navbar({ abaAtiva, setAbaAtiva, abrirModalNovo }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const irPara = (aba) => {
    setAbaAtiva(aba);
    setMenuAberto(false);
  };

  const abrirNovo = () => {
    setMenuAberto(false);
    abrirModalNovo();
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid px-3 px-lg-4">
        <span className="navbar-brand app-brand">
          <span className="app-brand-name">OTIS</span>
          <span className="app-brand-divider"></span>
          <span className="app-brand-sub">Central de Ocorrências</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAberto ? 'show' : ''}`}>
          <div className="navbar-acoes d-flex flex-column flex-lg-row align-items-lg-center gap-2 py-3 py-lg-0 ms-lg-auto">
            {abas.map(aba => (
              <button
                key={aba.id}
                className={`btn app-tab ${abaAtiva === aba.id ? 'active' : ''}`}
                onClick={() => irPara(aba.id)}
              >
                {aba.rotulo}
              </button>
            ))}

            <button className="btn btn-cta ms-lg-3" onClick={abrirNovo}>
              <i className="fa-solid fa-plus me-2"></i>Nova Ocorrência
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
