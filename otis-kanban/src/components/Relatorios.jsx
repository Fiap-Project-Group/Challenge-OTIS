import React from 'react';
import { calcularMetricas, formatarDuracao } from '../utils/metricas';

const rotuloPrioridade = {
  P1_EMERGENCIA: 'Emergência',
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
};

function Indicador({ rotulo, valor, detalhe, cor = 'var(--app-accent)' }) {
  return (
    <div className="metric-card" style={{ '--metric-color': cor }}>
      <p className="metric-label">{rotulo}</p>
      <p className="metric-value">{valor}</p>
      {detalhe && <p className="metric-sub">{detalhe}</p>}
    </div>
  );
}

// Barras horizontais simples: rótulo, barra proporcional e valor
function ListaBarras({ itens, total }) {
  const maior = Math.max(...itens.map(i => i.total), 1);
  return (
    <div className="barras">
      {itens.map(item => {
        const pct = total ? Math.round((item.total / total) * 100) : 0;
        return (
          <div className="barra-linha" key={item.rotulo} title={`${item.rotulo}: ${item.total} chamado(s) · ${pct}%`}>
            <span className="barra-rotulo">{item.rotulo}</span>
            <span className="barra-trilho">
              <span
                className="barra-preenchimento"
                style={{ width: `${(item.total / maior) * 100}%`, background: item.cor || 'var(--app-accent)' }}
              ></span>
            </span>
            <span className="barra-valor">{item.total}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Relatorios({ ocorrencias }) {
  const m = calcularMetricas(ocorrencias);

  if (m.total === 0) {
    return (
      <div className="container-xl px-0 py-2 py-md-3">
        <div className="page-header">
          <h3 className="page-title">Relatórios</h3>
          <p className="page-subtitle">Indicadores de atendimento e manutenção</p>
        </div>
        <div className="painel text-center py-5">
          <p className="mb-1">Ainda não há ocorrências registradas.</p>
          <p className="text-muted small mb-0">
            Os indicadores aparecem à medida que chamados são abertos e atendidos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xl px-0 py-2 py-md-3">
      <div className="page-header">
        <h3 className="page-title">Relatórios</h3>
        <p className="page-subtitle">Indicadores de atendimento e manutenção</p>
      </div>

      {/* Volume */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador rotulo="Total de chamados" valor={m.total} detalhe={`${m.abertas} em aberto`} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Emergências"
            valor={m.emergencias}
            detalhe={`${m.emergenciasAbertas} em aberto`}
            cor="var(--app-danger)"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Concluídos"
            valor={m.concluidas}
            detalhe={`${Math.round((m.concluidas / m.total) * 100)}% do total`}
            cor="var(--app-success)"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Fora do SLA agora"
            valor={m.atrasadosAgora}
            detalhe="Aguardando técnico além do prazo"
            cor={m.atrasadosAgora > 0 ? 'var(--app-danger)' : 'var(--app-neutral)'}
          />
        </div>
      </div>

      {/* Tempos */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Tempo médio de resposta"
            valor={formatarDuracao(m.tempoResposta)}
            detalhe={`Abertura → chegada · emergências: ${formatarDuracao(m.tempoRespostaEmergencia)}`}
            cor="var(--app-warning)"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Tempo médio de atendimento"
            valor={formatarDuracao(m.tempoAtendimento)}
            detalhe="Chegada → conclusão"
            cor="var(--app-warning)"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="SLA cumprido"
            valor={m.slaPercentual === null ? '—' : `${m.slaPercentual}%`}
            detalhe={m.slaMedidos ? `${m.slaDentro} de ${m.slaMedidos} chegadas no prazo` : 'Sem chegadas registradas'}
            cor="var(--app-success)"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <Indicador
            rotulo="Tempo até reincidência"
            valor={formatarDuracao(m.intervaloReincidencia)}
            detalhe="Média até o mesmo elevador falhar de novo"
          />
        </div>
      </div>

      {/* Distribuições */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-7">
          <section className="painel h-100">
            <h6 className="painel-titulo">Problemas mais comuns</h6>
            <ListaBarras itens={m.problemas.slice(0, 8)} total={m.total} />
          </section>
        </div>
        <div className="col-12 col-lg-5">
          <section className="painel h-100">
            <h6 className="painel-titulo">Chamados por prioridade</h6>
            <ListaBarras
              total={m.total}
              itens={m.porPrioridade.map(p => ({
                rotulo: rotuloPrioridade[p.prioridade],
                total: p.total,
                cor: `var(--cor-${p.prioridade})`,
              }))}
            />
            <p className="text-muted small mt-3 mb-0">
              Tempo médio total de resolução: <strong className="text-body">{formatarDuracao(m.tempoResolucao)}</strong>
            </p>
          </section>
        </div>
      </div>

      {/* Reincidência */}
      <section className="painel mb-4">
        <h6 className="painel-titulo">Reincidência por elevador</h6>
        <p className="text-muted small mb-3">
          Elevadores com mais de um chamado. O intervalo vai da conclusão do chamado anterior até a abertura do seguinte.
        </p>
        {m.reincidencias.length === 0 ? (
          <p className="text-muted small mb-0">Nenhum elevador teve mais de um chamado até agora.</p>
        ) : (
          <div className="table-responsive">
            <table className="table tabela-relatorio mb-0">
              <thead>
                <tr>
                  <th>Elevador</th>
                  <th>Edifício</th>
                  <th className="text-end">Chamados</th>
                  <th className="text-end">Último intervalo</th>
                  <th className="text-end">Intervalo médio</th>
                  <th>Problema mais frequente</th>
                </tr>
              </thead>
              <tbody>
                {m.reincidencias.map(r => (
                  <tr key={`${r.edificio}-${r.elevador}`}>
                    <td className="fw-semibold">{r.elevador}</td>
                    <td>{r.edificio}</td>
                    <td className="text-end">{r.chamados}</td>
                    <td className="text-end">{formatarDuracao(r.ultimoIntervalo)}</td>
                    <td className="text-end">{formatarDuracao(r.intervaloMedio)}</td>
                    <td>{r.problemaFrequente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Técnicos */}
      <section className="painel mb-4">
        <h6 className="painel-titulo">Desempenho por técnico</h6>
        {m.tecnicos.length === 0 ? (
          <p className="text-muted small mb-0">Nenhum chamado foi aceito por técnicos ainda.</p>
        ) : (
          <div className="table-responsive">
            <table className="table tabela-relatorio mb-0">
              <thead>
                <tr>
                  <th>Técnico</th>
                  <th className="text-end">Concluídos</th>
                  <th className="text-end">Em andamento</th>
                  <th className="text-end">Resposta média</th>
                  <th className="text-end">Atendimento médio</th>
                </tr>
              </thead>
              <tbody>
                {m.tecnicos.map(t => (
                  <tr key={t.nome}>
                    <td className="fw-semibold">{t.nome}</td>
                    <td className="text-end">{t.concluidos}</td>
                    <td className="text-end">{t.emAndamento}</td>
                    <td className="text-end">{formatarDuracao(t.tempoResposta)}</td>
                    <td className="text-end">{formatarDuracao(t.tempoAtendimento)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
