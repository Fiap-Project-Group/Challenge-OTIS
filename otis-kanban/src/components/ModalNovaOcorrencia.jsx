import React, { useState } from 'react';
import { tiposProblema, slaPorPrioridade } from '../data/dadosIniciais';

const OUTRO = '__outro__';

export default function ModalNovaOcorrencia({ fechar, setOcorrencias }) {
  const [edificio, setEdificio] = useState('');
  const [elevador, setElevador] = useState('');
  const [prioridade, setPrioridade] = useState('MEDIA');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [tipoOutro, setTipoOutro] = useState('');
  const [descricao, setDescricao] = useState('');

  const tipoProblema = tipoSelecionado === OUTRO ? tipoOutro.trim() : tipoSelecionado;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edificio.trim() || !tipoProblema) return;

    const agora = new Date();
    const slaMinutos = slaPorPrioridade[prioridade];

    const novoChamado = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      edificio: edificio.trim(),
      elevador: elevador.trim() || 'E-01',
      prioridade,
      status: 'TRIAGEM',
      tipoProblema,
      descricao,
      tecnico: 'Pendente',
      horario: agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      criadoEm: agora.toISOString(),
      sla: `${slaMinutos} min`,
      slaMinutos,
      solucao: ''
    };

    setOcorrencias(prev => [novoChamado, ...prev]);
    fechar();
  };

  return (
    <div className="modal show d-block app-modal-backdrop">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar Nova Ocorrência</h5>
            <button type="button" className="btn-close" onClick={fechar}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Edifício / Local</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={edificio} 
                  onChange={e => setEdificio(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID do Elevador</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={elevador} 
                  onChange={e => setElevador(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prioridade</label>
                <select className="form-select" value={prioridade} onChange={e => setPrioridade(e.target.value)}>
                  <option value="P1_EMERGENCIA">Emergência (Passageiro Preso)</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Média</option>
                  <option value="BAIXA">Baixa</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Problema</label>
                <select
                  className="form-select"
                  value={tipoSelecionado}
                  onChange={e => setTipoSelecionado(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione...</option>
                  {tiposProblema.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value={OUTRO}>Outro</option>
                </select>
                {tipoSelecionado === OUTRO && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Descreva o tipo de problema"
                    value={tipoOutro}
                    onChange={e => setTipoOutro(e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer flex-column flex-sm-row">
              <button type="button" className="btn btn-ghost" onClick={fechar}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar Ocorrência</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}