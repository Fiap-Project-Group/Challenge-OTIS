// Cálculos usados na tela de Relatórios.
// Os tempos dependem dos campos ISO gravados em cada etapa:
// criadoEm (abertura) → aceitoEm (aceite) → chegadaEm (chegada) → concluidoEm (conclusão)

export const minutosEntre = (inicio, fim) => {
  if (!inicio || !fim) return null;
  const diff = (new Date(fim) - new Date(inicio)) / 60000;
  return Number.isFinite(diff) && diff >= 0 ? diff : null;
};

const media = (valores) => {
  const validos = valores.filter(v => v !== null && v !== undefined);
  if (validos.length === 0) return null;
  return validos.reduce((s, v) => s + v, 0) / validos.length;
};

export const formatarDuracao = (minutos) => {
  if (minutos === null || minutos === undefined) return '—';
  if (minutos < 1) return '< 1 min';
  if (minutos < 60) return `${Math.round(minutos)} min`;
  if (minutos < 1440) {
    const h = Math.floor(minutos / 60);
    const m = Math.round(minutos % 60);
    return m ? `${h}h ${m}min` : `${h}h`;
  }
  const d = Math.floor(minutos / 1440);
  const h = Math.round((minutos % 1440) / 60);
  return h ? `${d}d ${h}h` : `${d}d`;
};

// SLA em minutos (novos chamados têm slaMinutos; antigos só "15 min")
const slaDe = (oc) => oc.slaMinutos ?? (parseInt(oc.sla, 10) || null);

const chaveElevador = (oc) =>
  `${oc.edificio.trim().toLowerCase()}|${String(oc.elevador).trim().toLowerCase()}`;

// Agrupa contando ocorrências, ignorando maiúsculas/minúsculas
const contarPor = (lista, campo) => {
  const mapa = new Map();
  lista.forEach(oc => {
    const valor = (oc[campo] || 'Não informado').trim();
    const chave = valor.toLowerCase();
    const atual = mapa.get(chave) || { rotulo: valor, total: 0 };
    atual.total += 1;
    mapa.set(chave, atual);
  });
  return [...mapa.values()].sort((a, b) => b.total - a.total);
};

export function calcularMetricas(ocorrencias, agora = new Date()) {
  const abertas = ocorrencias.filter(oc => oc.status !== 'CONCLUIDO');
  const concluidas = ocorrencias.filter(oc => oc.status === 'CONCLUIDO');
  const emergencias = ocorrencias.filter(oc => oc.prioridade === 'P1_EMERGENCIA');

  // ---- Tempos médios ----
  const tempoResposta = media(ocorrencias.map(oc => minutosEntre(oc.criadoEm, oc.chegadaEm)));
  const tempoAtendimento = media(ocorrencias.map(oc => minutosEntre(oc.chegadaEm, oc.concluidoEm)));
  const tempoResolucao = media(ocorrencias.map(oc => minutosEntre(oc.criadoEm, oc.concluidoEm)));
  const tempoRespostaEmergencia = media(
    emergencias.map(oc => minutosEntre(oc.criadoEm, oc.chegadaEm))
  );

  // ---- SLA (prazo para o técnico chegar ao local) ----
  const comChegada = ocorrencias.filter(oc => slaDe(oc) && minutosEntre(oc.criadoEm, oc.chegadaEm) !== null);
  const dentroDoSla = comChegada.filter(oc => minutosEntre(oc.criadoEm, oc.chegadaEm) <= slaDe(oc));
  const slaPercentual = comChegada.length ? Math.round((dentroDoSla.length / comChegada.length) * 100) : null;

  const atrasadosAgora = abertas.filter(oc =>
    !oc.chegadaEm && oc.criadoEm && slaDe(oc) &&
    minutosEntre(oc.criadoEm, agora) > slaDe(oc)
  );

  // ---- Reincidência por elevador ----
  // Intervalo = da conclusão do chamado anterior até a abertura do seguinte
  const grupos = new Map();
  ocorrencias.filter(oc => oc.criadoEm).forEach(oc => {
    const chave = chaveElevador(oc);
    if (!grupos.has(chave)) grupos.set(chave, []);
    grupos.get(chave).push(oc);
  });

  const reincidencias = [];
  const todosIntervalos = [];
  grupos.forEach(lista => {
    if (lista.length < 2) return;
    lista.sort((a, b) => new Date(a.criadoEm) - new Date(b.criadoEm));

    const intervalos = [];
    for (let i = 1; i < lista.length; i++) {
      const anterior = lista[i - 1];
      const atual = lista[i];
      const fimAnterior =
        anterior.concluidoEm && new Date(anterior.concluidoEm) <= new Date(atual.criadoEm)
          ? anterior.concluidoEm
          : anterior.criadoEm;
      intervalos.push(minutosEntre(fimAnterior, atual.criadoEm));
    }
    todosIntervalos.push(...intervalos);

    const ultimo = lista[lista.length - 1];
    reincidencias.push({
      edificio: ultimo.edificio.trim(),
      elevador: String(ultimo.elevador).trim(),
      chamados: lista.length,
      intervaloMedio: media(intervalos),
      ultimoIntervalo: intervalos[intervalos.length - 1],
      problemaFrequente: contarPor(lista, 'tipoProblema')[0].rotulo,
    });
  });
  reincidencias.sort((a, b) => b.chamados - a.chamados || (a.intervaloMedio ?? 0) - (b.intervaloMedio ?? 0));

  // ---- Por técnico ----
  const porTecnico = new Map();
  ocorrencias
    .filter(oc => oc.tecnico && oc.tecnico !== 'Pendente')
    .forEach(oc => {
      if (!porTecnico.has(oc.tecnico)) porTecnico.set(oc.tecnico, []);
      porTecnico.get(oc.tecnico).push(oc);
    });

  const tecnicos = [...porTecnico.entries()].map(([nome, lista]) => ({
    nome,
    concluidos: lista.filter(oc => oc.status === 'CONCLUIDO').length,
    emAndamento: lista.filter(oc => oc.status !== 'CONCLUIDO').length,
    tempoResposta: media(lista.map(oc => minutosEntre(oc.criadoEm, oc.chegadaEm))),
    tempoAtendimento: media(lista.map(oc => minutosEntre(oc.chegadaEm, oc.concluidoEm))),
  })).sort((a, b) => b.concluidos - a.concluidos);

  // ---- Por prioridade ----
  const ordemPrioridade = ['P1_EMERGENCIA', 'ALTA', 'MEDIA', 'BAIXA'];
  const porPrioridade = ordemPrioridade.map(p => ({
    prioridade: p,
    total: ocorrencias.filter(oc => oc.prioridade === p).length,
  }));

  return {
    total: ocorrencias.length,
    abertas: abertas.length,
    concluidas: concluidas.length,
    emergencias: emergencias.length,
    emergenciasAbertas: emergencias.filter(oc => oc.status !== 'CONCLUIDO').length,
    tempoResposta,
    tempoAtendimento,
    tempoResolucao,
    tempoRespostaEmergencia,
    slaPercentual,
    slaDentro: dentroDoSla.length,
    slaMedidos: comChegada.length,
    atrasadosAgora: atrasadosAgora.length,
    intervaloReincidencia: media(todosIntervalos),
    reincidencias,
    problemas: contarPor(ocorrencias, 'tipoProblema'),
    porPrioridade,
    tecnicos,
  };
}
