import React from 'react';

export default function CartaoOcorrencia({ oc, mudarStatus, colunaId }) {
  return (
    <div className={`card shadow-sm ${oc.prioridade === 'P1_EMERGENCIA' ? 'border-danger border-2' : ''}`}>
      <div className="card-body p-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <span className="fw-bold text-primary">{oc.id}</span>
          <span className={`badge ${
            oc.prioridade === 'P1_EMERGENCIA' ? 'bg-danger' :
            oc.prioridade === 'ALTA' ? 'bg-warning text-dark' : 'bg-info text-dark'
          }`}>
            {oc.prioridade}
          </span>
        </div>
        <h6 className="card-subtitle mb-1 text-muted small">📍 {oc.edificio} (Elevador {oc.elevador})</h6>
        <p className="card-text small mb-2"><strong>Problema:</strong> {oc.tipoProblema}</p>
        <p className="card-text text-muted mb-3" style={{ fontSize: '0.85rem' }}>{oc.descricao}</p>
        
        <div className="card-acoes d-flex justify-content-between border-top pt-2">
          {colunaId !== 'TRIAGEM' && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                const ordem = ['TRIAGEM', 'DESLOCAMENTO', 'EM_ATENDIMENTO', 'CONCLUIDO'];
                const indexAtual = ordem.indexOf(colunaId);
                mudarStatus(oc.id, ordem[indexAtual - 1]);
              }}
            >
              <i className="fa-solid fa-arrow-left-long me-1"></i>
              Voltar
            </button>
          )}
          {colunaId !== 'CONCLUIDO' && (
            <button
              className="btn btn-sm btn-outline-primary ms-auto"
              onClick={() => {
                const ordem = ['TRIAGEM', 'DESLOCAMENTO', 'EM_ATENDIMENTO', 'CONCLUIDO'];
                const indexAtual = ordem.indexOf(colunaId);
                mudarStatus(oc.id, ordem[indexAtual + 1]);
              }}
            >
              Avançar
              <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}