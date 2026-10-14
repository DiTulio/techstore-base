# Regras de negócio

Última atualização: outubro de 2026

## Frete grátis

Compras com valor final **acima de R$ 200** (já com desconto de cupom) têm frete grátis.
O carrinho mostra quanto falta para o cliente ganhar o frete. Produtos individuais com preço
acima de R$ 200 exibem o selo "Frete grátis".

## Cupons

| Cupom | Desconto | Quem pode usar |
|---|---|---|
| `PRIMEIRACOMPRA` | 10% sobre o total | Somente clientes sem pedidos anteriores |

O cupom não diferencia letras maiúsculas e minúsculas.

## Promoções

Produtos em promoção exibem o preço original riscado ao lado do preço atual.

## Produtos sem preço

Produtos sem preço definido não podem ser vendidos: aparecem como "Preço em breve", com o
botão desabilitado, e não entram no carrinho nem nas sugestões.

## Produtos esgotados

* Não aparecem na lista da loja, nos produtos relacionados nem nas sugestões do carrinho.
* A página do produto (`/produto/:id`) continua acessível por link. Nela o cliente pode pedir
  para ser avisado quando o produto voltar (nome e e-mail).
* A área `/estoque` mostra quem está esperando cada produto, para o time avisar e decidir a reposição.

## Carrinho

* Não é possível adicionar mais unidades do que o estoque disponível.
