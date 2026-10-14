export function temPreco(produto) {
  return produto.price !== null
}

export function estaEsgotado(produto) {
  return produto.estoque <= 0
}

// Só pode ser vendido quem tem preço definido e unidades em estoque
export function produtoDisponivelParaVenda(produto) {
  return Boolean(produto) && temPreco(produto) && !estaEsgotado(produto)
}
