import React from 'react';

export default function Relatorios({ ocorrencias }) {
  const total = ocorrencias.length;
  const emergencias = ocorrencias.filter(o => o.prioridade === 'P1_EMERGENCIA').length;
  const emAndamento = ocorrencias.filter(o => o.status === 'EM_ATENDIMENTO' || o.status === 'DESLOCAMENTO').length;
  const concluidos = ocorrencias.filter(o => o.status === 'CONCLUIDO').length;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary">
        <i className="bi bi-graph-up-arrow me-2"></i>Painel Analítico de Ocorrências
      </h2>

      {/* Cards de Métricas Rápidas */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-dark shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Total de Chamados</h5>
              <p className="display-5 fw-bold">{total}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Emergências (P1)</h5>
              <p className="display-5 fw-bold">{emergencias}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Em Atendimento</h5>
              <p className="display-5 fw-bold text-dark">{emAndamento}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Concluídos</h5>
              <p className="display-5 fw-bold">{concluidos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}