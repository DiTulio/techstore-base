import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import BotaoAdicionar from '../components/BotaoAdicionar'
import ProdutoCard from '../components/ProdutoCard'
import { contarNoCarrinho } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'
import { estaEsgotado, temPreco } from '../utils/produtos'

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// "produtos" traz TODOS os produtos: o link de um esgotado precisa continuar abrindo
export default function PaginaProduto({ produtos, carrinho, onAdicionar, onRegistrarInteresse }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemInteresse, setMensagemInteresse] = useState(null)

  // Ao trocar de produto, limpa o formulário e a mensagem do produto anterior
  useEffect(() => {
    setNome('')
    setEmail('')
    setMensagemInteresse(null)
  }, [id])

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

  const esgotado = estaEsgotado(produto)

  // Esgotados não aparecem como relacionados
  const relacionados = produtos
    .filter(
      (item) => item.category === produto.category && item.id !== produto.id && !estaEsgotado(item)
    )
    .slice(0, 4)

  function handleRegistrarInteresse(evento) {
    evento.preventDefault()

    if (!nome.trim()) {
      setMensagemInteresse({ erro: true, texto: 'Informe seu nome.' })
      return
    }
    if (!EMAIL_VALIDO.test(email.trim())) {
      setMensagemInteresse({ erro: true, texto: 'Informe um e-mail válido.' })
      return
    }

    const status = onRegistrarInteresse({
      produtoId: produto.id,
      produtoTitle: produto.title,
      nome,
      email,
    })

    if (status === 'duplicado') {
      setMensagemInteresse({
        erro: false,
        texto: 'Este e-mail já está na lista de espera deste produto.',
      })
      return
    }

    setNome('')
    setEmail('')
    setMensagemInteresse({
      erro: false,
      texto: 'Você foi adicionado à lista de espera. Avisaremos assim que o produto voltar.',
    })
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
          {produto.rating && (
            <p className="card-avaliacao">
              ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
            </p>
          )}
          <p className="detalhe-preco">
            {temPreco(produto) ? formatarPreco(produto.price) : 'Preço em breve'}
          </p>
          <p className="detalhe-descricao">{produto.description}</p>

          {esgotado ? (
            <>
              <p className="detalhe-estoque detalhe-estoque-esgotado">Produto esgotado</p>
              <form className="form-aviso" onSubmit={handleRegistrarInteresse} noValidate>
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

                {mensagemInteresse && (
                  <p
                    className={
                      mensagemInteresse.erro ? 'mensagem-aviso mensagem-aviso-erro' : 'mensagem-aviso'
                    }
                  >
                    {mensagemInteresse.texto}
                  </p>
                )}
              </form>
            </>
          ) : (
            <>
              <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>
              <BotaoAdicionar
                produto={produto}
                quantidadeNoCarrinho={contarNoCarrinho(carrinho, produto.id)}
                onAdicionar={onAdicionar}
                className="botao botao-grande"
              />
            </>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <>
          <h2>Produtos relacionados</h2>
          <div className="grade">
            {relacionados.map((item) => (
              <ProdutoCard
                key={item.id}
                produto={item}
                quantidadeNoCarrinho={contarNoCarrinho(carrinho, item.id)}
                onAdicionar={onAdicionar}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
