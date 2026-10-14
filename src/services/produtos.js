import { get } from './api'

// Converte o preço recebido da API em número.
// Aceita número, "49.90", "49,90" e "R$ 1.299,90".
// Retorna null quando o produto está sem preço definido (vazio, inválido ou <= 0).
function normalizarPreco(valor) {
  if (typeof valor === 'number') {
    return Number.isFinite(valor) && valor > 0 ? valor : null
  }
  if (typeof valor !== 'string') return null

  let texto = valor.replace(/[^\d,.]/g, '')
  if (!texto) return null
  if (texto.includes(',')) {
    // formato brasileiro: ponto separa milhar, vírgula separa decimal
    texto = texto.replace(/\./g, '').replace(',', '.')
  }

  const numero = Number(texto)
  return Number.isFinite(numero) && numero > 0 ? numero : null
}

function normalizarEstoque(valor) {
  const numero = Number(valor)
  return Number.isFinite(numero) && numero > 0 ? numero : 0
}

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json').then((produtos) =>
    produtos.map((produto) => {
      const price = normalizarPreco(produto.price)
      const precoOriginal = normalizarPreco(produto.precoOriginal)

      return {
        ...produto,
        price,
        precoOriginal: price !== null && precoOriginal > price ? precoOriginal : null,
        estoque: normalizarEstoque(produto.estoque),
      }
    })
  )
}
