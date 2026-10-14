# Requisitos da TechStore

Última atualização: outubro de 2026

## Loja

* A página inicial lista os produtos do catálogo que não estão esgotados.
* O cliente pode filtrar os produtos por categoria.
* Todos os lugares que mostram um produto (lista, relacionados e sugestões do carrinho) usam o mesmo card:
  imagem, nome, avaliação, preço (com preço original riscado nas promoções), selos e botão de compra.
* Clicar no card abre a página do produto.

## Produtos esgotados

* Não aparecem na loja, nos relacionados nem nas sugestões.
* A página do produto continua acessível por link e oferece o pedido "Avise-me quando voltar".
* A área interna `/estoque` lista os clientes aguardando cada produto (nome e e-mail).

## Produtos sem preço

* Produtos sem preço definido não podem ser vendidos.

## Página do produto

* Exibe imagem, nome, avaliação, preço, descrição e unidades disponíveis.
* Exibe até 4 produtos relacionados da mesma categoria, sem os esgotados.

## Carrinho

* Lista os produtos adicionados, com a quantidade de cada um.
* Adicionar ao carrinho dá confirmação visual e respeita o estoque disponível.
* Permite remover unidades.
* Permite aplicar cupons de desconto.
* Exibe o total da compra e quanto falta para o frete grátis.
