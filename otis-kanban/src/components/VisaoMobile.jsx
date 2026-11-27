import React from 'react';

const rotuloPrioridade = {
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

export default function VisaoMobile({ ocorrencias }) {
  const emergencias = ocorrencias.filter(o => o.prioridade === 'P1_EMERGENCIA');
  const outras = ocorrencias.filter(o => o.prioridade !== 'P1_EMERGENCIA');

  return (
    <div className="mobile-view py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Atendimento de Campo</h3>
        <p className="page-subtitle">Chamados atribuídos ao técnico</p>
      </div>

      {/* Bloco de Emergência P1 */}
      {emergencias.length > 0 && <div className="section-label">Emergências</div>}
      {emergencias.map(oc => (
        <div key={oc.id} className="emergency-card">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
            <span className="oc-id">{oc.id}</span>
            <span className="prio-badge prio-P1_EMERGENCIA">P1 Emergência</span>
          </div>
          <h6 className="oc-title">{oc.edificio}</h6>
          <div className="oc-meta mb-2">Elevador {oc.elevador}</div>
          <p className="mb-0 small">{oc.tipoProblema}</p>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">Aceitar chamado</button>
            <button className="btn btn-ghost py-2">
              <i className="fa-solid fa-route me-2"></i>Ver rota
            </button>
          </div>
        </div>
      ))}

      {/* Lista de Outros Chamados */}
      <div className="section-label">Fila de trabalho</div>
      <div className="d-flex flex-column gap-2">
        {outras.map(oc => (
          <div key={oc.id} className={`oc-card prio-${oc.prioridade}`}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <span className="oc-id">{oc.id}</span>
              <span className="prio-badge">{rotuloPrioridade[oc.prioridade] || oc.prioridade}</span>
            </div>
            <p className="small text-muted mb-0 mt-1">{oc.edificio} — {oc.tipoProblema}</p>
          </div>
        ))}
        {outras.length === 0 && (
          <p className="text-muted small my-2">Nenhum chamado na fila</p>
        )}
      </div>
    </div>
  );
}
