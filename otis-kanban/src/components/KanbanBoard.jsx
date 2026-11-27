import React from 'react';
import ColunaKanban from './ColunaKanban';

export default function KanbanBoard({ ocorrencias, setOcorrencias }) {
  // Configuração das 4 colunas do Kanban
  const colunas = [
    { id: 'TRIAGEM', titulo: 'Recebidos (Triagem)', cor: 'var(--app-neutral)' },
    { id: 'DESLOCAMENTO', titulo: 'Em Deslocamento', cor: 'var(--app-warning)' },
    { id: 'EM_ATENDIMENTO', titulo: 'Em Atendimento', cor: 'var(--app-danger)' },
    { id: 'CONCLUIDO', titulo: 'Concluído', cor: 'var(--app-success)' }
  ];

  // Função para mudar o status de uma ocorrência
  const mudarStatus = (id, novoStatus) => {
    const atualizadas = ocorrencias.map(oc => {
      if (oc.id === id) {
        return { ...oc, status: novoStatus };
      }
      return oc;
    });
    setOcorrencias(atualizadas);
  };

  return (
    <div className="py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Quadro de Ocorrências</h3>
        <p className="page-subtitle">{ocorrencias.length} ocorrência(s) registrada(s)</p>
      </div>

      <div className="row g-3">
        {colunas.map(coluna => (
          <ColunaKanban
            key={coluna.id}
            coluna={coluna}
            ocorrencias={ocorrencias}
            mudarStatus={mudarStatus}
          />
        ))}
      </div>
    </div>
  );
}
