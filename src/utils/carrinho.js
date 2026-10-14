// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array

// Arredonda para centavos, evitando erros como 0.1 + 0.2 = 0.30000000000000004
export function arredondar(valor) {
  return Math.round(valor * 100) / 100
}

export function calcularTotal(carrinho) {
  return arredondar(carrinho.reduce((total, produto) => total + produto.price, 0))
}

export function aplicarDesconto(total, desconto) {
  return arredondar(total * (1 - desconto))
}

export function contarNoCarrinho(carrinho, produtoId) {
  return carrinho.filter((produto) => produto.id === produtoId).length
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
