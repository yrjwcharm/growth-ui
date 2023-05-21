export const local = localStorage
export const session = sessionStorage
/** 取出本地存储的token
 * @name getLocalToken
 * @returns {string | null} token
 */
export function getLocalToken(): string {
  return local.token
}
export function getSessionToken(): string {
  return session.token
}

/** 取入本地存储的token
 * @name setLocalToken
 */
export function setLocalToken(token: string) {
  local.token = token
}
export function setSessionToken(token: string) {
  session.token = token
}
/** 移除本地存储的token
 * @name removeLocalToken
 */
export function removeLocalToken() {
  local.removeItem('token')
}
export function removeSessionToken() {
  session.removeItem('token')
}

/** 取出本地存储的{key}字段的值
 * @name getStorage
 * @param {string} key
 */
export function getStorage(key: string) {
  return local[key]
}
export function getSession(key: string) {
  return session[key]
}
/** 存入本地存储的{key}字段的值
 * @name setStorage
 * @param {string} key
 * @param {string} value
 */
export function setStorage(key: string, value: string) {
  local[key] = value
}
export function setSession(key: string, value: string) {
  session[key] = value
}
/** 移除本地存储的{key}字段的值
 * @name setStorage
 * @param {string} key
 */
export function removeStorage(key: string) {
  local.removeItem(key)
}
export function removeSession(key: string) {
  session.removeItem(key)
}

/** 清除本地存储的所有字段的值
 * @name clearStorage
 */
export function clearStorage() {
  local.clear()
}
export function clearSession() {
  session.clear()
}
