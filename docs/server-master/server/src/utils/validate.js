const utils = require('utility') //md5加密

module.exports = {
  // 检查用户名
  checkUsername(value) {
    return value.length >= 3 && value.length <= 16
  },
  // 检查密码
  checkPassword(value) {
    return value.length >= 6 && value.length <= 16
  },
  // md5加密
  md5Str(value) {
    return utils.md5(value)
  },
  checkLength(value, min, max) {
    return value.length >= min && value.length <= max
  }
}
