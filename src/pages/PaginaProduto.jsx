import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'

export default function PaginaProduto({ produtos, onAdicionar, onRegistrarInteresse }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemInteresse, setMensagemInteresse] = useState('')
  const [adicionado, setAdicionado] = useState(false)

  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const relacionados = produtos
    .filter((item) => item.category === produto.category && item.id !== produto.id && item.estoque > 0)
    .slice(0, 4)

  function handleRegistrarInteresse(evento) {
    evento.preventDefault()

    if (!nome.trim() || !email.trim()) {
      setMensagemInteresse('Informe seu nome e e-mail para receber a notificação.')
      return
    }

    onRegistrarInteresse({
      produtoId: produto.id,
      produtoTitle: produto.title,
      nome: nome.trim(),
      email: email.trim(),
    })

    setNome('')
    setEmail('')
    setMensagemInteresse('Você foi adicionado à lista de espera. Avisaremos assim que o produto voltar.')
  }

  function handleAdicionarAoCarrinho() {
    onAdicionar(produto)
    setAdicionado(true)
    window.setTimeout(() => setAdicionado(false), 450)
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {produto.price.toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>

          {produto.estoque === 0 ? (
            <>
              <p className="detalhe-estoque detalhe-estoque-esgotado">Produto esgotado</p>
              <form className="form-aviso" onSubmit={handleRegistrarInteresse}>
                <label className="rotulo" htmlFor="nome-alerta">
                  Nome
                </label>
                <input
                  id="nome-alerta"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Seu nome"
                />

                <label className="rotulo" htmlFor="email-alerta">
                  E-mail
                </label>
                <input
                  id="email-alerta"
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="seu@email.com"
                />

                <button className="botao botao-grande" type="submit">
                  Avise-me quando chegar
                </button>

                {mensagemInteresse && <p className="mensagem-aviso">{mensagemInteresse}</p>}
              </form>
            </>
          ) : (
            <>
              <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>
              <button
                className={adicionado ? 'botao botao-grande botao-adicionado' : 'botao botao-grande'}
                onClick={handleAdicionarAoCarrinho}
                disabled={produto.estoque === 0}
              >
                {adicionado ? 'Adicionado!' : 'Adicionar ao carrinho'}
              </button>
            </>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
