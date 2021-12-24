function isEn(ctx) {
  return ctx.header['accept-language'] === 'en'
}

module.exports = {
  isEn
}
