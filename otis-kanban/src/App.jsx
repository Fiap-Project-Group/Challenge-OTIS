import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import VisaoMobile from './components/VisaoMobile';
import Relatorios from './components/Relatorios';
import ModalNovaOcorrencia from './components/ModalNovaOcorrencia';
import { ocorrenciasIniciais } from './data/dadosIniciais';
import './global.css'

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('kanban');
  const [ocorrencias, setOcorrencias] = useState(() => {
    const dadosSalvos = localStorage.getItem('otis_ocorrencias');
    return dadosSalvos ? JSON.parse(dadosSalvos) : ocorrenciasIniciais;
  });
  const [mostrarModalNovo, setMostrarModalNovo] = useState(false);

  useEffect(() => {
    localStorage.setItem('otis_ocorrencias', JSON.stringify(ocorrencias));
  }, [ocorrencias]);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        abrirModalNovo={() => setMostrarModalNovo(true)}
      />

      <main className="container-fluid py-3">
        {abaAtiva === 'kanban' && (
          <KanbanBoard ocorrencias={ocorrencias} setOcorrencias={setOcorrencias} />
        )}
        {abaAtiva === 'mobile' && (
          <VisaoMobile ocorrencias={ocorrencias} setOcorrencias={setOcorrencias} />
        )}
        {abaAtiva === 'relatorios' && (
          <Relatorios ocorrencias={ocorrencias} />
        )}
      </main>

      {mostrarModalNovo && (
        <ModalNovaOcorrencia
          fechar={() => setMostrarModalNovo(false)}
          setOcorrencias={setOcorrencias}
        />
      )}
    </div>
  );
}