import React from 'react';

const rotuloPrioridade = {
  P1_EMERGENCIA: 'Emergência',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

export default function CartaoOcorrencia({ oc, abrirDetalhes }) {
  const semTecnico = !oc.tecnico || oc.tecnico === 'Pendente';

  return (
    <button
      type="button"
      className={`oc-card oc-card-clicavel prio-${oc.prioridade}`}
      onClick={() => abrirDetalhes(oc)}
      title="Ver detalhes"
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="oc-id">{oc.id}</span>
        <span className="prio-badge">{rotuloPrioridade[oc.prioridade] || oc.prioridade}</span>
      </div>

      <h6 className="oc-title">{oc.tipoProblema}</h6>
      <div className="oc-meta">
        <i className="fa-solid fa-location-dot"></i>
        {oc.edificio} · Elevador {oc.elevador}
      </div>
      <div className="oc-meta">
        <i className="fa-regular fa-user"></i>
        {semTecnico ? 'Aguardando técnico' : oc.tecnico}
        {oc.horario && ` · ${oc.horario}`}
      </div>

      {oc.descricao && <p className="oc-desc mb-0">{oc.descricao}</p>}
    </button>
  );
}
