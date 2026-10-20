import React, { useState } from 'react';

export default function ModalNovaOcorrencia({ fechar, setOcorrencias }) {
  const [edificio, setEdificio] = useState('');
  const [elevador, setElevador] = useState('');
  const [prioridade, setPrioridade] = useState('MEDIA');
  const [tipoProblema, setTipoProblema] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edificio || !tipoProblema) return;

    const novoChamado = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      edificio,
      elevador: elevador || 'E-01',
      prioridade,
      status: 'TRIAGEM',
      tipoProblema,
      descricao,
      tecnico: 'Pendente',
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sla: prioridade === 'P1_EMERGENCIA' ? '15 min' : '60 min',
      solucao: ''
    };

    setOcorrencias(prev => [novoChamado, ...prev]);
    fechar();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Registar Nova Ocorrência</h5>
            <button type="button" className="btn-close btn-close-white" onClick={fechar}></button>
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
                  <option value="P1_EMERGENCIA">P1 - Emergência (Passageiro Preso)</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Média</option>
                  <option value="BAIXA">Baixa</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Problema</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={tipoProblema} 
                  onChange={e => setTipoProblema(e.target.value)} 
                  required 
                />
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={fechar}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar Ocorrência</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}