export const getKeyValue = (
  options: { value: string | number; label: string | number }[],
  labelName?: string,
  valueName?: string
) => {
  return options.reduce((prev: any, curr: any) => {
    prev[valueName ? curr[valueName] : curr.value] = labelName
      ? curr[labelName]
      : curr.label
    return prev
  }, {})
}
// name=1&age=2
/**
 * @param {string} str
 * @returns {string} birthday
 */
export const getQueryString = (str: string) => {
  const obj: any = {}
  const strArr = str.split('&')
  strArr.map((m) => {
    const mArr = m.split('=')
    obj[mArr[0]] = mArr[1]
  })
  return obj
}
/**从身份证中获取生日
 * @param {string} idCard
 * @returns {string} birthday
 */
export const getBirthdayFromIdCard = (idCard: string) => {
  var birthday = ''
  if (idCard != null && idCard !== '') {
    if (idCard.length === 15) {
      birthday = '19' + idCard.substr(6, 6)
    } else if (idCard.length === 18) {
      birthday = idCard.substr(6, 8)
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
  }
  return birthday
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 拼接 url
 * @param {*} urls
 */
export function combineURL(...urls: any[]) {
  const ret = urls.map((url) => {
    if (!url) {
      return url
    }
    if (isExternal(url)) {
      return url.replace(/\/+$/, '')
    }
    return url.replace(/^\/+/, '').replace(/\/+$/, '')
  })
  const url = ret.filter((r) => r).join('/')
  return isExternal(url) ? url : `/${url}`
}
/**
 * 获取原始类型的值
 * @param {*} val
 */
export function toRawType(val: any) {
  return {}.toString.call(val).slice(8, -1)
}
/**
 * 解析对象为 query { a: 1, b: 2 } => ?a=1&b=2
 * @param {*} data
 */
export function obj2Query(data: any) {
  if (toRawType(data) !== 'Object') return ''
  let ret = ''
  Object.keys(data).forEach((key) => {
    const val = data[key]
    if (val || val === 0 || val === false) {
      ret +=
        (ret.indexOf('?') === -1 ? '?' : '&') +
        `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    }
  })
  return ret
}
