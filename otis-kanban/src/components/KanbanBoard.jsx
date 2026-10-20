import React from 'react';
import ColunaKanban from './ColunaKanban';

export default function KanbanBoard({ ocorrencias, setOcorrencias }) {
  // Configuração das 4 colunas do Kanban
  const colunas = [
    { id: 'TRIAGEM', titulo: 'Recebidos (Triagem)', cor: 'border-secondary' },
    { id: 'DESLOCAMENTO', titulo: 'Em Deslocamento', cor: 'border-warning' },
    { id: 'EM_ATENDIMENTO', titulo: 'Em Atendimento', cor: 'border-danger' },
    { id: 'CONCLUIDO', titulo: 'Concluído', cor: 'border-success' }
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
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark fw-bold mb-0">
          <i className="bi bi-kanban me-2"></i>Quadro Kanban de Ocorrências
        </h3>
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