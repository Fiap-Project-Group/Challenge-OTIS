import React from 'react';

const ordem = ['TRIAGEM', 'DESLOCAMENTO', 'EM_ATENDIMENTO', 'CONCLUIDO'];

const rotuloPrioridade = {
  P1_EMERGENCIA: 'P1 Emergência',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

export default function CartaoOcorrencia({ oc, mudarStatus, colunaId }) {
  const indexAtual = ordem.indexOf(colunaId);

  return (
    <div className={`oc-card prio-${oc.prioridade}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="oc-id">{oc.id}</span>
        <span className="prio-badge">{rotuloPrioridade[oc.prioridade] || oc.prioridade}</span>
      </div>

      <h6 className="oc-title">{oc.tipoProblema}</h6>
      <div className="oc-meta">
        <i className="fa-solid fa-location-dot"></i>
        {oc.edificio} · Elevador {oc.elevador}
      </div>
      {oc.tecnico && (
        <div className="oc-meta">
          <i className="fa-regular fa-user"></i>
          {oc.tecnico}{oc.horario && ` · ${oc.horario}`}
        </div>
      )}

      {oc.descricao && <p className="oc-desc">{oc.descricao}</p>}

      <div className="card-acoes">
        {colunaId !== 'TRIAGEM' && (
          <button
            className="btn btn-ghost"
            onClick={() => mudarStatus(oc.id, ordem[indexAtual - 1])}
          >
            <i className="fa-solid fa-arrow-left-long me-1"></i>
            Voltar
          </button>
        )}
        {colunaId !== 'CONCLUIDO' && (
          <button
            className="btn btn-ghost primary ms-auto"
            onClick={() => mudarStatus(oc.id, ordem[indexAtual + 1])}
          >
            Avançar
            <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </button>
        )}
      </div>
    </div>
  );
}
