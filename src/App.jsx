import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RolarParaTopo from './components/RolarParaTopo'
import Loja from './pages/Loja'
import PaginaProduto from './pages/PaginaProduto'
import Carrinho from './pages/Carrinho'
import Estoque from './pages/Estoque'
import { buscarProdutos } from './services/produtos'
import { buscarClientes } from './services/clientes'
import { carregarListaEspera, salvarListaEspera } from './services/avisos'
import { contarNoCarrinho } from './utils/carrinho'
import { jaEstaNaEspera } from './utils/listaEspera'
import { estaEsgotado, produtoDisponivelParaVenda } from './utils/produtos'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [clientes, setClientes] = useState([])
  const [clienteAtualId, setClienteAtualId] = useState(null)
  const [listaEspera, setListaEspera] = useState(carregarListaEspera)

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false))

    buscarClientes().then((dados) => {
      setClientes(dados)
      if (dados.length > 0) setClienteAtualId(dados[0].id)
    })
  }, [])

  function adicionarAoCarrinho(produto) {
    // Produto sem preço ou esgotado não pode ser vendido
    if (!produtoDisponivelParaVenda(produto)) return

    setCarrinho((itens) => {
      // Não deixa passar do estoque disponível
      if (contarNoCarrinho(itens, produto.id) >= produto.estoque) return itens
      return itens.concat(produto)
    })
  }

  // Registra o pedido "avise-me". Retorna 'ok' ou 'duplicado'
  function registrarInteresse({ produtoId, produtoTitle, nome, email }) {
    if (jaEstaNaEspera(listaEspera, produtoId, email)) return 'duplicado'

    const novaLista = listaEspera.concat({
      produtoId,
      produtoTitle,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
    })
    setListaEspera(novaLista)
    salvarListaEspera(novaLista)
    return 'ok'
  }

  function removerUmaUnidade(produtoId) {
    setCarrinho((itensAtuais) => {
      const indicePrimeiro = itensAtuais.findIndex((produto) => produto.id === produtoId)

      if (indicePrimeiro === -1) {
        return itensAtuais
      }

      return itensAtuais.filter((produto, indice) => indice !== indicePrimeiro)
    })
  }

  // Esgotados não aparecem na loja nem nas sugestões (a página do produto continua acessível por link)
  const produtosEmEstoque = produtos.filter((produto) => !estaEsgotado(produto))

  const clienteAtual = clientes.find((cliente) => cliente.id === clienteAtualId)

  return (
    <div className="app">
      <RolarParaTopo />
      <Header carrinho={carrinho} clienteAtual={clienteAtual} />

      <main className="conteudo">
        {carregando && <p className="aviso">Carregando produtos...</p>}
        {erro && <p className="aviso aviso-erro">{erro}</p>}

        {!carregando && !erro && (
          <Routes>
            <Route
              path="/"
              element={
                <Loja
                  produtos={produtosEmEstoque}
                  carrinho={carrinho}
                  onAdicionar={adicionarAoCarrinho}
                />
              }
            />
            <Route
              path="/produto/:id"
              element={
                <PaginaProduto
                  produtos={produtos}
                  carrinho={carrinho}
                  onAdicionar={adicionarAoCarrinho}
                  onRegistrarInteresse={registrarInteresse}
                />
              }
            />
            <Route
              path="/carrinho"
              element={
                <Carrinho
                  carrinho={carrinho}
                  produtos={produtosEmEstoque}
                  clienteAtual={clienteAtual}
                  onAdicionar={adicionarAoCarrinho}
                  onRemover={removerUmaUnidade}
                />
              }
            />
            <Route
              path="/estoque"
              element={<Estoque produtos={produtos} listaEspera={listaEspera} />}
            />
          </Routes>
        )}
      </main>

      <Footer
        clientes={clientes}
        clienteAtualId={clienteAtualId}
        onTrocarCliente={setClienteAtualId}
      />
    </div>
  )
}
