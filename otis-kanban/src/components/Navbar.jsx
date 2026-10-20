import React from 'react';

export default function Navbar({ abaAtiva, setAbaAtiva, abrirModalNovo }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-4 ms-2">
          <i className="bi bi-box-seam me-2"></i>OTIS Kanban
        </span>

        <div className="d-flex gap-2">
          <button
            className={`btn ${abaAtiva === 'kanban' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
            onClick={() => setAbaAtiva('kanban')}
          >
            <i className="bi bi-kanban me-1"></i> Quadro Kanban
          </button>

          <button
            className={`btn ${abaAtiva === 'mobile' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
            onClick={() => setAbaAtiva('mobile')}
          >
            <i className="bi bi-phone me-1"></i> Visão Técnico
          </button>

          <button
            className={`btn ${abaAtiva === 'relatorios' ? 'btn-light fw-bold' : 'btn-outline-light'}`}
            onClick={() => setAbaAtiva('relatorios')}
          >
            <i className="bi bi-bar-chart-line me-1"></i> Relatórios
          </button>

          <button className="btn btn-warning fw-bold ms-3" onClick={abrirModalNovo}>
            <i className="bi bi-plus-lg me-1"></i> Nova Ocorrência
          </button>
        </div>
      </div>
    </nav>
  );
}