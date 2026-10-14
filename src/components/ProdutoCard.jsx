import { Link } from 'react-router'
import BotaoAdicionar from './BotaoAdicionar'
import { formatarPreco } from '../utils/formatarPreco'
import { FRETE_GRATIS_MINIMO } from '../utils/frete'
import { estaEsgotado, temPreco } from '../utils/produtos'

// Card único de produto: usado na lista, nos relacionados e nas sugestões do carrinho
export default function ProdutoCard({ produto, quantidadeNoCarrinho, onAdicionar }) {
  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      {produto.rating && (
        <p className="card-avaliacao">
          ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
        </p>
      )}

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">
          {temPreco(produto) ? formatarPreco(produto.price) : 'Preço em breve'}
        </span>
      </div>

      <div className="card-selos">
        {temPreco(produto) && produto.price > FRETE_GRATIS_MINIMO && (
          <span className="selo selo-frete">Frete grátis</span>
        )}
        {estaEsgotado(produto) && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <BotaoAdicionar
        produto={produto}
        quantidadeNoCarrinho={quantidadeNoCarrinho}
        onAdicionar={onAdicionar}
      />
    </article>
  )
}
