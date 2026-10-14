# Contrato da API

Última atualização: outubro de 2026

A URL base fica na variável `VITE_API_URL`.

## GET /products.json

Retorna a lista de produtos do catálogo.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do produto |
| `title` | string | Nome do produto |
| `price` | number | Preço atual. **Atenção:** alguns produtos chegam sem preço definido ou com o preço em formato de texto (ex.: `"49,90"`). A loja normaliza em `src/services/produtos.js` |
| `precoOriginal` | number | Preço antes da promoção. Presente só nos produtos em promoção |
| `category` | string | `roupas`, `eletronicos`, `acessorios` ou `casa` |
| `description` | string | Descrição do produto |
| `image` | string | URL da imagem |
| `rating` | object | `{ rate: number, count: number }` |
| `estoque` | number | Unidades disponíveis |

Depois da normalização, `price` é sempre `number` ou `null` (sem preço definido).

## GET /customers.json

Retorna os clientes cadastrados.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do cliente |
| `nome` | string | Nome completo |
| `email` | string | E-mail |
| `pedidosAnteriores` | number | Quantidade de pedidos já feitos na loja |
