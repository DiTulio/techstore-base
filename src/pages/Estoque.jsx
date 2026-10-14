import { contarEspera, esperaDoProduto } from '../utils/listaEspera'
import { estaEsgotado, temPreco } from '../utils/produtos'

// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
// e quem está esperando os esgotados voltarem
export default function Estoque({ produtos, listaEspera = [] }) {
  // Esgotados primeiro, com os mais esperados no topo (prioridade de reposição);
  // depois os demais por menor estoque.
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => {
    const esgotadoA = estaEsgotado(a)
    const esgotadoB = estaEsgotado(b)
    if (esgotadoA !== esgotadoB) return esgotadoA ? -1 : 1
    if (esgotadoA) return contarEspera(listaEspera, b.id) - contarEspera(listaEspera, a.id)
    return a.estoque - b.estoque
  })

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Aguardando</th>
              <th>Fila de espera</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => {
              const esperas = esperaDoProduto(listaEspera, produto.id)

              return (
                <tr key={produto.id}>
                  <td>{produto.title}</td>
                  <td>{produto.category}</td>
                  <td>{produto.estoque}</td>
                  <td>{esperas.length}</td>
                  <td>
                    {esperas.length === 0 ? (
                      <span className="texto-suave">Nenhum</span>
                    ) : (
                      <ul className="lista-espera">
                        {esperas.map((cliente) => (
                          <li key={`${produto.id}-${cliente.email}`}>
                            {cliente.nome} · {cliente.email}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    {estaEsgotado(produto) && <span className="selo selo-esgotado">Esgotado</span>}
                    {produto.estoque > 0 && produto.estoque < 5 && (
                      <span className="selo selo-alerta">Repor</span>
                    )}
                    {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                    {!temPreco(produto) && <span className="selo selo-alerta">Sem preço</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
