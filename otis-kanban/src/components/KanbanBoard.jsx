import React, { useState } from 'react';
import ColunaKanban from './ColunaKanban';
import ModalDetalhes from './ModalDetalhes';

// Configuração das 4 colunas do Kanban
const colunas = [
  { id: 'TRIAGEM', titulo: 'Recebidos (Triagem)', cor: 'var(--app-neutral)' },
  { id: 'DESLOCAMENTO', titulo: 'Em Deslocamento', cor: 'var(--app-warning)' },
  { id: 'EM_ATENDIMENTO', titulo: 'Em Atendimento', cor: 'var(--app-danger)' },
  { id: 'CONCLUIDO', titulo: 'Concluído', cor: 'var(--app-success)' }
];

// O quadro é apenas de acompanhamento: o status é atualizado pelo técnico em campo
export default function KanbanBoard({ ocorrencias }) {
  const [selecionada, setSelecionada] = useState(null);

  return (
    <div className="py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Quadro de Ocorrências</h3>
        <p className="page-subtitle">
          {ocorrencias.length} ocorrência(s) · status atualizado pelos técnicos em campo
        </p>
      </div>

      <div className="row g-3">
        {colunas.map(coluna => (
          <ColunaKanban
            key={coluna.id}
            coluna={coluna}
            ocorrencias={ocorrencias}
            abrirDetalhes={setSelecionada}
          />
        ))}
      </div>

      {selecionada && (
        <ModalDetalhes ocorrencia={selecionada} fechar={() => setSelecionada(null)} />
      )}
    </div>
  );
}
