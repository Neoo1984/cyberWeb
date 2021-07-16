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
 */
export const isEmail = (rule, value, callback) => {
  const email =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (!value){
    callback(new Error('请输入邮箱'))
  }else if (!email.test(value)){
    callback(new Error('请输入正确的邮箱'));
  }else {
    callback()
  }
}

/**
 * 手机号
 */
export const validatePhone = (rule, value, callback) => {
  const phone = /^1[23456789]\d{9}$/
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!phone.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback()
  }
}
