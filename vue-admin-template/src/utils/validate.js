/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/**
 * 手机号
 * @param {*} s
 */
export function validPhone (s) {
  return /^1[345789][0-9]\d{8}$/.test(s)
}

/**
 * 手机号
 */
export const validatePhone = (rule, value, callback) => {
  const phone = /^1[3456789]\d{9}$/
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!phone.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback()
  }
}
