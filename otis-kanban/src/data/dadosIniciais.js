// O sistema começa sem chamados: eles são criados em "Nova Ocorrência".
// Formato de cada ocorrência:
// {
//   id, edificio, elevador,
//   prioridade: P1_EMERGENCIA | ALTA | MEDIA | BAIXA,
//   status: TRIAGEM | DESLOCAMENTO | EM_ATENDIMENTO | CONCLUIDO,
//   tipoProblema, descricao, tecnico, horario, sla, solucao
// }
export const ocorrenciasIniciais = [];

// Chamados de exemplo das versões anteriores, removidos de dados já salvos no navegador
export const idsExemploRemovidos = ["TK-0829", "TK-0831", "TK-0834"];

// Técnicos de campo disponíveis na Visão Técnico
export const tecnicos = ["Carlos Silva", "Ana Costa", "Marcos Lima"];

// Tipos de problema padronizados (permitem agrupar nos relatórios)
export const tiposProblema = [
  "Passageiro preso",
  "Porta não abre / não fecha",
  "Elevador parado",
  "Parada entre andares",
  "Desnivelamento no andar",
  "Botão ou painel com defeito",
  "Ruído ou vibração anormal",
  "Iluminação da cabine",
  "Interfone / alarme",
];

// SLA de chegada ao local, em minutos, por prioridade
export const slaPorPrioridade = {
  P1_EMERGENCIA: 15,
  ALTA: 45,
  MEDIA: 120,
  BAIXA: 240,
};
