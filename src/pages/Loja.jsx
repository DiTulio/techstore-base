import { useState } from 'react'
import ProdutoCard from '../components/ProdutoCard'
import { contarNoCarrinho } from '../utils/carrinho'

const CATEGORIAS = [
  { id: 'todas', nome: 'Todas' },
  { id: 'roupas', nome: 'Roupas' },
  { id: 'eletronicos', nome: 'Eletrônicos' },
  { id: 'acessorios', nome: 'Acessórios' },
  { id: 'casa', nome: 'Casa' },
]

// "produtos" já chega sem os esgotados (filtrado no App)
export default function Loja({ produtos, carrinho, onAdicionar }) {
  const [categoria, setCategoria] = useState('todas')

  // Calculado direto a cada render: não há estado intermediário que mostre a lista errada
  const produtosVisiveis =
    categoria === 'todas' ? produtos : produtos.filter((produto) => produto.category === categoria)

  return (
    <section>
      <div className="vitrine-topo">
        <p className="sobretitulo">Coleção de outubro</p>
        <h1>Produtos</h1>
      </div>

      <div className="filtros" role="group" aria-label="Filtrar por categoria">
        {CATEGORIAS.map((item) => (
          <button
            key={item.id}
            className={item.id === categoria ? 'filtro filtro-ativo' : 'filtro'}
            aria-pressed={item.id === categoria}
            onClick={() => setCategoria(item.id)}
          >
            {item.nome}
          </button>
        ))}
      </div>

      <div className="grade">
        {produtosVisiveis.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            quantidadeNoCarrinho={contarNoCarrinho(carrinho, produto.id)}
            onAdicionar={onAdicionar}
          />
        ))}
      </div>
    </section>
  )
}
