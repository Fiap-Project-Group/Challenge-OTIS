import React, { useState } from 'react';

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-3">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2 m-0">
          <i className="fa-solid fa-cube"></i>
          <span>OTIS</span>
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
          <div className="navbar-acoes d-flex flex-column flex-lg-row gap-2 py-3 py-lg-0 ms-lg-auto">
            <button
              className={`btn ${abaAtiva === 'kanban' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
              onClick={() => irPara('kanban')}
            >
              <i className="bi bi-kanban me-1"></i> Quadro Kanban
            </button>

            <button
              className={`btn ${abaAtiva === 'mobile' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
              onClick={() => irPara('mobile')}
            >
              <i className="bi bi-phone me-1"></i> Visão Técnico
            </button>

            <button
              className={`btn ${abaAtiva === 'relatorios' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
              onClick={() => irPara('relatorios')}
            >
              <i className="bi bi-bar-chart-line me-1"></i> Relatórios
            </button>

            <button className="btn btn-warning fw-bold" onClick={abrirNovo}>
              <i className="bi bi-plus-lg me-1"></i> Nova Ocorrência
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
