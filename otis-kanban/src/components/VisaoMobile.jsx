import React, { useState } from 'react';
import { tecnicos } from '../data/dadosIniciais';

const rotuloPrioridade = {
  P1_EMERGENCIA: 'Emergência',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

const rotuloStatus = {
  DESLOCAMENTO: 'Em deslocamento',
  EM_ATENDIMENTO: 'Em atendimento',
};

// Emergências primeiro, depois Alta, Média e Baixa
const pesoPrioridade = { P1_EMERGENCIA: 0, ALTA: 1, MEDIA: 2, BAIXA: 3 };
const porPrioridade = (a, b) => (pesoPrioridade[a.prioridade] ?? 9) - (pesoPrioridade[b.prioridade] ?? 9);

const horaAtual = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function VisaoMobile({ ocorrencias, setOcorrencias }) {
  const [tecnico, setTecnico] = useState(tecnicos[0]);
  const [concluindoId, setConcluindoId] = useState(null);
  const [solucao, setSolucao] = useState('');

  const atualizar = (id, mudancas) => {
    setOcorrencias(prev => prev.map(oc => (oc.id === id ? { ...oc, ...mudancas } : oc)));
  };

  const aceitar = (oc) => {
    atualizar(oc.id, { status: 'DESLOCAMENTO', tecnico, horarioAceite: horaAtual() });
  };

  const iniciarAtendimento = (oc) => {
    atualizar(oc.id, { status: 'EM_ATENDIMENTO', horarioChegada: horaAtual() });
  };

  const confirmarConclusao = (oc) => {
    if (!solucao.trim()) return;
    atualizar(oc.id, { status: 'CONCLUIDO', solucao: solucao.trim(), horarioConclusao: horaAtual() });
    setConcluindoId(null);
    setSolucao('');
  };

  const meusChamados = ocorrencias
    .filter(oc => oc.tecnico === tecnico && (oc.status === 'DESLOCAMENTO' || oc.status === 'EM_ATENDIMENTO'))
    .sort(porPrioridade);

  const disponiveis = ocorrencias
    .filter(oc => oc.status === 'TRIAGEM')
    .sort(porPrioridade);

  const concluidosHoje = ocorrencias.filter(oc => oc.tecnico === tecnico && oc.status === 'CONCLUIDO').length;

  const linkRota = (oc) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(oc.edificio)}`;

  return (
    <div className="mobile-view py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Atendimento de Campo</h3>
        <p className="page-subtitle">Aceite, atenda e conclua os chamados</p>
      </div>

      <label className="form-label mb-1" htmlFor="tecnico">Técnico</label>
      <select
        id="tecnico"
        className="form-select"
        value={tecnico}
        onChange={e => { setTecnico(e.target.value); setConcluindoId(null); }}
      >
        {tecnicos.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <p className="text-muted small mt-2 mb-0">
        {meusChamados.length} em andamento · {concluidosHoje} concluído(s)
      </p>

      {/* Chamados do técnico */}
      <div className="section-label">Meus chamados</div>
      <div className="d-flex flex-column gap-2">
        {meusChamados.length === 0 && (
          <p className="text-muted small my-1">Nenhum chamado em andamento.</p>
        )}
        {meusChamados.map(oc => (
          <div key={oc.id} className={`oc-card prio-${oc.prioridade}`}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <span className="oc-id">{oc.id}</span>
              <span className="status-tag">{rotuloStatus[oc.status]}</span>
            </div>
            <h6 className="oc-title">{oc.tipoProblema}</h6>
            <div className="oc-meta">
              <i className="fa-solid fa-location-dot"></i>
              {oc.edificio} · Elevador {oc.elevador}
            </div>
            {oc.descricao && <p className="oc-desc mb-2">{oc.descricao}</p>}

            {oc.status === 'DESLOCAMENTO' && (
              <div className="d-grid gap-2 mt-2">
                <button className="btn btn-primary" onClick={() => iniciarAtendimento(oc)}>
                  Cheguei ao local · Iniciar atendimento
                </button>
                <a className="btn btn-ghost py-2" href={linkRota(oc)} target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-route me-2"></i>Ver rota
                </a>
              </div>
            )}

            {oc.status === 'EM_ATENDIMENTO' && concluindoId !== oc.id && (
              <div className="d-grid mt-2">
                <button className="btn btn-primary" onClick={() => { setConcluindoId(oc.id); setSolucao(''); }}>
                  Concluir atendimento
                </button>
              </div>
            )}

            {oc.status === 'EM_ATENDIMENTO' && concluindoId === oc.id && (
              <div className="mt-2">
                <label className="form-label mb-1" htmlFor={`solucao-${oc.id}`}>Solução aplicada</label>
                <textarea
                  id={`solucao-${oc.id}`}
                  className="form-control"
                  rows="3"
                  placeholder="Descreva o que foi feito"
                  value={solucao}
                  onChange={e => setSolucao(e.target.value)}
                  autoFocus
                ></textarea>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-ghost flex-fill" onClick={() => setConcluindoId(null)}>
                    Cancelar
                  </button>
                  <button
                    className="btn btn-success flex-fill"
                    disabled={!solucao.trim()}
                    onClick={() => confirmarConclusao(oc)}
                  >
                    Confirmar conclusão
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chamados aguardando técnico */}
      <div className="section-label">Disponíveis para aceitar</div>
      <div className="d-flex flex-column gap-2">
        {disponiveis.length === 0 && (
          <p className="text-muted small my-1">Nenhum chamado aguardando técnico.</p>
        )}
        {disponiveis.map(oc => (
          <div
            key={oc.id}
            className={oc.prioridade === 'P1_EMERGENCIA' ? 'emergency-card mb-0' : `oc-card prio-${oc.prioridade}`}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <span className="oc-id">{oc.id}</span>
              <span className={`prio-badge prio-${oc.prioridade}`}>
                {rotuloPrioridade[oc.prioridade] || oc.prioridade}
              </span>
            </div>
            <h6 className="oc-title">{oc.tipoProblema}</h6>
            <div className="oc-meta">
              <i className="fa-solid fa-location-dot"></i>
              {oc.edificio} · Elevador {oc.elevador}
            </div>
            {oc.sla && (
              <div className="oc-meta">
                <i className="fa-regular fa-clock"></i>
                Aberto às {oc.horario} · SLA {oc.sla}
              </div>
            )}
            <div className="d-grid mt-3">
              <button className="btn btn-primary" onClick={() => aceitar(oc)}>
                Aceitar chamado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
