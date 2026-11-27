import React from 'react';
import CartaoOcorrencia from './CartaoOcorrencia';

export default function ColunaKanban({ coluna, ocorrencias, mudarStatus }) {
  const chamadosDaColuna = ocorrencias.filter(oc => oc.status === coluna.id);

  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className={`card shadow-sm h-100 border-top border-4 ${coluna.cor}`}>
        <div className="coluna-header card-header bg-white fw-bold d-flex justify-content-between align-items-center flex-wrap">
          <span>{coluna.titulo}</span>
          <span className="badge bg-secondary rounded-pill">{chamadosDaColuna.length}</span>
        </div>
        <div className="card-body bg-light d-flex flex-column gap-3">
          {chamadosDaColuna.length === 0 ? (
            <p className="text-muted text-center small my-3">Nenhuma ocorrência</p>
          ) : (
            chamadosDaColuna.map(oc => (
              <CartaoOcorrencia 
                key={oc.id} 
                oc={oc} 
                mudarStatus={mudarStatus} 
                colunaId={coluna.id} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}