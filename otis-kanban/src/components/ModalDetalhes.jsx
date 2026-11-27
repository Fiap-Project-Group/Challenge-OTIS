import React from 'react';

export default function ModalDetalhes({ ocorrencia, fechar }) {
  if (!ocorrencia) return null;

  return (
    <div className="modal show d-block app-modal-backdrop">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-break pe-2">Detalhes da Ocorrência: {ocorrencia.id}</h5>
            <button type="button" className="btn-close" onClick={fechar}></button>
          </div>
          <div className="modal-body">
            <p className="detalhe-label">Edifício</p>
            <p className="detalhe-valor">{ocorrencia.edificio}</p>
            <p className="detalhe-label">Elevador</p>
            <p className="detalhe-valor">{ocorrencia.elevador}</p>
            <p className="detalhe-label">Tipo de Problema</p>
            <p className="detalhe-valor">{ocorrencia.tipoProblema}</p>
            <p className="detalhe-label">Descrição</p>
            <p className="detalhe-valor">{ocorrencia.descricao}</p>
            <p className="detalhe-label">Técnico Responsável</p>
            <p className="detalhe-valor">{ocorrencia.tecnico}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={fechar}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}