import React from 'react';

export default function Relatorios({ ocorrencias }) {
  const total = ocorrencias.length;
  const emergencias = ocorrencias.filter(o => o.prioridade === 'P1_EMERGENCIA').length;
  const emAndamento = ocorrencias.filter(o => o.status === 'EM_ATENDIMENTO' || o.status === 'DESLOCAMENTO').length;
  const concluidos = ocorrencias.filter(o => o.status === 'CONCLUIDO').length;

  const metricas = [
    { rotulo: 'Total de chamados', valor: total, cor: 'var(--app-accent)' },
    { rotulo: 'Emergências', valor: emergencias, cor: 'var(--app-danger)' },
    { rotulo: 'Em andamento', valor: emAndamento, cor: 'var(--app-warning)' },
    { rotulo: 'Concluídos', valor: concluidos, cor: 'var(--app-success)' },
  ];

  return (
    <div className="container-xl px-0 py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Relatórios</h3>
        <p className="page-subtitle">Resumo das ocorrências registradas</p>
      </div>

      <div className="row g-3 mb-4">
        {metricas.map(m => (
          <div className="col-12 col-sm-6 col-xl-3" key={m.rotulo}>
            <div className="metric-card" style={{ '--metric-color': m.cor }}>
              <p className="metric-label">{m.rotulo}</p>
              <p className="metric-value">{m.valor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
