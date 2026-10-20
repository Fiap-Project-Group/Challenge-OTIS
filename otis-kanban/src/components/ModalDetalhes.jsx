import React from 'react';

export default function ModalDetalhes({ ocorrencia, fechar }) {
  if (!ocorrencia) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Detalhes da Ocorrência: {ocorrencia.id}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={fechar}></button>
          </div>
          <div className="modal-body">
            <p><strong>Edifício:</strong> {ocorrencia.edificio}</p>
            <p><strong>Elevador:</strong> {ocorrencia.elevador}</p>
            <p><strong>Tipo de Problema:</strong> {ocorrencia.tipoProblema}</p>
            <p><strong>Descrição:</strong> {ocorrencia.descricao}</p>
            <p><strong>Técnico Responsável:</strong> {ocorrencia.tecnico}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={fechar}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}