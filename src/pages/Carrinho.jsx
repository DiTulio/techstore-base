import { useState } from 'react'
import { Link } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { agruparItens, aplicarDesconto, calcularTotal, contarNoCarrinho } from '../utils/carrinho'
import { validarCupom } from '../utils/cupons'
import { calcularFrete, FRETE_GRATIS_MINIMO } from '../utils/frete'
import { formatarPreco } from '../utils/formatarPreco'
import { estaEsgotado, temPreco } from '../utils/produtos'

export default function Carrinho({ carrinho, produtos, clienteAtual, onAdicionar, onRemover }) {
  const [codigoCupom, setCodigoCupom] = useState('')
  const [cupomAplicado, setCupomAplicado] = useState(null)
  const [mensagemCupom, setMensagemCupom] = useState('')

  const itens = agruparItens(carrinho)
  const total = calcularTotal(carrinho)
  const totalComDesconto = cupomAplicado ? aplicarDesconto(total, cupomAplicado.desconto) : total
  const frete = calcularFrete(totalComDesconto)

  // Sugestões: só produtos disponíveis e com preço, que ainda não estão no carrinho
  const sugestoes = produtos
    .filter(
      (produto) =>
        !estaEsgotado(produto) &&
        temPreco(produto) &&
        !carrinho.find((item) => item.id === produto.id)
    )
    .slice(0, 4)

  function aplicarCupom(evento) {
    evento.preventDefault()
    const resultado = validarCupom(codigoCupom, clienteAtual)

    if (resultado.valido) {
      setCupomAplicado(resultado)
      setMensagemCupom('Cupom aplicado!')
    } else {
      setCupomAplicado(null)
      setMensagemCupom('Cupom inválido')
    }
  }

  if (carrinho.length === 0) {
    return (
      <section>
        <h1>Carrinho</h1>
        <div className="estado-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="botao botao-secundario">
            Ver produtos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1>Carrinho</h1>

      <div className="carrinho-layout">
        <ul className="lista-carrinho">
          {itens.map((item) => (
            <li key={item.produto.id} className="item-carrinho">
              <Link to={`/produto/${item.produto.id}`} className="item-imagem-moldura">
                <img src={item.produto.image} alt={item.produto.title} />
              </Link>
              <div className="item-info">
                <Link to={`/produto/${item.produto.id}`} className="item-titulo">
                  {item.produto.title}
                </Link>
                <p className="item-preco">{formatarPreco(item.produto.price)}</p>
              </div>
              <span className="item-quantidade">{item.quantidade} un.</span>
              <button type="button" className="botao-texto" onClick={() => onRemover(item.produto.id)}>
                Remover 1
              </button>
            </li>
          ))}
        </ul>

        <aside className="resumo">
          <h2 className="resumo-titulo">Resumo do pedido</h2>

          <form className="cupom" onSubmit={aplicarCupom}>
            <label htmlFor="cupom" className="rotulo">
              Cupom de desconto
            </label>
            <div className="cupom-campo">
              <input
                id="cupom"
                value={codigoCupom}
                onChange={(evento) => setCodigoCupom(evento.target.value)}
                placeholder="Digite o código"
              />
              <button className="botao botao-secundario">Aplicar</button>
            </div>
            {mensagemCupom && <p className="mensagem-cupom">{mensagemCupom}</p>}
          </form>

          {cupomAplicado && (
            <p className="resumo-linha">
              <span>Desconto</span>
              <span>{cupomAplicado.desconto * 100}%</span>
            </p>
          )}
          <div className="frete">
            <p className={frete.gratis ? 'frete-texto frete-gratis' : 'frete-texto'}>
              {frete.gratis
                ? 'Você ganhou frete grátis!'
                : `Faltam ${formatarPreco(frete.falta)} para ganhar frete grátis`}
            </p>
            <div className="frete-barra">
              <div className="frete-progresso" style={{ width: `${frete.progresso}%` }} />
            </div>
            <p className="frete-regra">
              Frete grátis em compras acima de {formatarPreco(FRETE_GRATIS_MINIMO)} no valor final.
            </p>
          </div>
          <p className="total">
            <span>Total</span>
            <span>{formatarPreco(totalComDesconto)}</span>
          </p>
        </aside>
      </div>

      {sugestoes.length > 0 && (
        <>
          <h2>Você também pode gostar</h2>
          <div className="grade">
            {sugestoes.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={produto}
                quantidadeNoCarrinho={contarNoCarrinho(carrinho, produto.id)}
                onAdicionar={onAdicionar}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
