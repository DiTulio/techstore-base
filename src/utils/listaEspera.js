export function contarEspera(listaEspera, produtoId) {
  return listaEspera.filter((registro) => registro.produtoId === produtoId).length
}

export function esperaDoProduto(listaEspera, produtoId) {
  return listaEspera.filter((registro) => registro.produtoId === produtoId)
}

export function jaEstaNaEspera(listaEspera, produtoId, email) {
  const emailLimpo = email.trim().toLowerCase()
  return listaEspera.some(
    (registro) => registro.produtoId === produtoId && registro.email === emailLimpo
  )
}
