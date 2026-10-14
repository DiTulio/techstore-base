import { useEffect, useState } from 'react'
import { estaEsgotado, produtoDisponivelParaVenda, temPreco } from '../utils/produtos'

// Botão de adicionar ao carrinho, com confirmação visível a cada clique
export default function BotaoAdicionar({
  produto,
  quantidadeNoCarrinho,
  onAdicionar,
  className = 'botao',
}) {
  const [cliques, setCliques] = useState(0)

  // A confirmação some 1,2s depois do último clique
  useEffect(() => {
    if (cliques === 0) return
    const timer = setTimeout(() => setCliques(0), 1200)
    return () => clearTimeout(timer)
  }, [cliques])

  const noLimite = quantidadeNoCarrinho >= produto.estoque
  const desabilitado = !produtoDisponivelParaVenda(produto) || noLimite

  let texto = 'Adicionar ao carrinho'
  if (!temPreco(produto)) texto = 'Indisponível'
  else if (estaEsgotado(produto)) texto = 'Esgotado'
  else if (cliques > 0) texto = `Adicionado! (${quantidadeNoCarrinho} no carrinho)`
  else if (noLimite) texto = 'Máximo em estoque no carrinho'

  function clicar() {
    onAdicionar(produto)
    setCliques(cliques + 1)
  }

  return (
    <button
      type="button"
      className={cliques > 0 ? `${className} botao-adicionado` : className}
      onClick={clicar}
      disabled={desabilitado}
      aria-live="polite"
    >
      {texto}
    </button>
  )
}
