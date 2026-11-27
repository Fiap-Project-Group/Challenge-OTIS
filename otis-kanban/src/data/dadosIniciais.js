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
