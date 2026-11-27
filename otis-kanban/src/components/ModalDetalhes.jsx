import React from 'react';

const rotuloStatus = {
  TRIAGEM: 'Recebido (Triagem)',
  DESLOCAMENTO: 'Em deslocamento',
  EM_ATENDIMENTO: 'Em atendimento',
  CONCLUIDO: 'Concluído',
};

const rotuloPrioridade = {
  P1_EMERGENCIA: 'Emergência',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

export default function ModalDetalhes({ ocorrencia, fechar }) {
  if (!ocorrencia) return null;

  const campos = [
    ['Status', rotuloStatus[ocorrencia.status] || ocorrencia.status],
    ['Prioridade', rotuloPrioridade[ocorrencia.prioridade] || ocorrencia.prioridade],
    ['Edifício', ocorrencia.edificio],
    ['Elevador', ocorrencia.elevador],
    ['Tipo de problema', ocorrencia.tipoProblema],
    ['Descrição', ocorrencia.descricao],
    ['Técnico responsável', ocorrencia.tecnico === 'Pendente' ? 'Aguardando técnico' : ocorrencia.tecnico],
    ['Aberto às', ocorrencia.horario],
    ['SLA', ocorrencia.sla],
    ['Concluído às', ocorrencia.horarioConclusao],
    ['Solução aplicada', ocorrencia.solucao],
  ].filter(([, valor]) => valor);

  return (
    <div className="modal show d-block app-modal-backdrop" onClick={fechar}>
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-break pe-2">Ocorrência {ocorrencia.id}</h5>
            <button type="button" className="btn-close" onClick={fechar}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {campos.map(([rotulo, valor]) => (
                <div className={rotulo === 'Descrição' || rotulo === 'Solução aplicada' ? 'col-12' : 'col-6'} key={rotulo}>
                  <p className="detalhe-label">{rotulo}</p>
                  <p className="detalhe-valor">{valor}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={fechar}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
