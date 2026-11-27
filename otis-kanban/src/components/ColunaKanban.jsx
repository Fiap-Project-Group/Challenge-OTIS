import React from 'react';
import CartaoOcorrencia from './CartaoOcorrencia';

export default function ColunaKanban({ coluna, ocorrencias, abrirDetalhes }) {
  const chamadosDaColuna = ocorrencias.filter(oc => oc.status === coluna.id);

  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="kanban-col" style={{ '--col-color': coluna.cor }}>
        <div className="coluna-header">
          <span>{coluna.titulo}</span>
          <span className="kanban-count">{chamadosDaColuna.length}</span>
        </div>
        <div className="kanban-col-body">
          {chamadosDaColuna.length === 0 ? (
            <div className="kanban-empty">Nenhuma ocorrência</div>
          ) : (
            chamadosDaColuna.map(oc => (
              <CartaoOcorrencia
                key={oc.id}
                oc={oc}
                abrirDetalhes={abrirDetalhes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
