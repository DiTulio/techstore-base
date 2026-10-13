import { useState } from 'react'
import { Link } from 'react-router'
import { valorRestanteParaFreteGratis } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'

export default function ProdutoCard({ produto, onAdicionar }) {
  const [adicionado, setAdicionado] = useState(false)
  const esgotado = produto.estoque === 0
  const valorFinal = Number(produto.price ?? 0)
  const faltaParaFreteGratis = valorRestanteParaFreteGratis(valorFinal)

  function handleAdicionar() {
    onAdicionar(produto)
    setAdicionado(true)
    window.setTimeout(() => setAdicionado(false), 450)
  }

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{formatarPreco(produto.price)}</span>
      </div>

      <div className="card-selos">
        {valorFinal >= 200 ? (
          <span className="selo selo-frete">Frete grátis</span>
        ) : (
          <span className="selo selo-frete">Falta {formatarPreco(faltaParaFreteGratis)} para frete grátis</span>
        )}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button className={adicionado ? 'botao botao-adicionado' : 'botao'} onClick={handleAdicionar} disabled={esgotado}>
        {adicionado ? 'Adicionado!' : 'Adicionar ao carrinho'}
      </button>
    </article>
  )
}
