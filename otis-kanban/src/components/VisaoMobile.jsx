import React from 'react';

export default function VisaoMobile({ ocorrencias }) {
  const emergencias = ocorrencias.filter(o => o.prioridade === 'P1_EMERGENCIA');
  const outras = ocorrencias.filter(o => o.prioridade !== 'P1_EMERGENCIA');

  return (
    <div className="container px-0 py-2" style={{ maxWidth: '480px' }}>
      <h4 className="text-center text-primary mb-3">
        <i className="bi bi-phone me-2"></i>Atendimento de Campo
      </h4>

      {/* Bloco de Emergência P1 */}
      {emergencias.map(oc => (
        <div key={oc.id} className="card border-danger border-3 shadow mb-3 bg-white">
          <div className="card-body">
            <div className="badge bg-danger mb-2">P1 - EMERGÊNCIA</div>
            <h5 className="card-title fw-bold text-dark">{oc.id} | {oc.edificio}</h5>
            <p className="text-muted small mb-1">Elevador: {oc.elevador}</p>
            <p className="card-text"><strong>Problema:</strong> {oc.tipoProblema}</p>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-success fw-bold">Aceitar Chamado</button>
              <button className="btn btn-outline-primary btn-sm">Ver Rota/Mapa</button>
            </div>
          </div>
        </div>
      ))}

      {/* Lista de Outros Chamados */}
      <h6 className="text-muted mt-4 mb-2">Fila de Trabalho</h6>
      {outras.map(oc => (
        <div key={oc.id} className="card shadow-sm mb-2">
          <div className="card-body p-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <span className="fw-bold">{oc.id}</span>
              <span className="badge bg-warning text-dark">{oc.prioridade}</span>
            </div>
            <p className="small text-muted mb-0 mt-1">{oc.edificio} - {oc.tipoProblema}</p>
          </div>
        </div>
      ))}
    </div>
  );
}