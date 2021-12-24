const path = require('path')
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['zh', 'en'],
  header: 'accept-language',
  defaultLocale: 'zh',
  directory: path.join(__dirname, 'locales')
})

module.exports = i18n
