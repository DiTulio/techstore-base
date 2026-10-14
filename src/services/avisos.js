// Lista de clientes que pediram para ser avisados quando um produto esgotado voltar.
// Hoje fica guardada no navegador; quando existir uma API, só este arquivo muda.
const CHAVE = 'techstore-lista-espera'

export function carregarListaEspera() {
  try {
    const salvo = localStorage.getItem(CHAVE)
    return salvo ? JSON.parse(salvo) : []
  } catch {
    return []
  }
}

export function salvarListaEspera(lista) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista))
  } catch {
    // sem armazenamento disponível: a lista continua valendo só nesta sessão
  }
}
