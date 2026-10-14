// Campanha vigente: frete grátis em compras ACIMA de R$ 200 no valor final (já com desconto)
export const FRETE_GRATIS_MINIMO = 200

export function calcularFrete(valorFinal) {
  // Em centavos, para evitar erros de ponto flutuante
  const centavos = Math.round(valorFinal * 100)
  const minimo = FRETE_GRATIS_MINIMO * 100
  const gratis = centavos > minimo
  const falta = gratis ? 0 : (minimo + 1 - centavos) / 100
  const progresso = gratis ? 100 : Math.min(99, Math.floor((centavos / minimo) * 100))

  return { gratis, falta, progresso }
}
