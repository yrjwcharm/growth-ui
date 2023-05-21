// 根据百分比获取宽度
export const wp = (percentage: number) => {
  return `${percentage}vw`
}

// 根据百分比获取高度
export const hp = (percentage: number) => {
  return `${percentage}vh`
}

export function isWeChat() {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase()
  const res = ua.match(/MicroMessenger/i)
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (res && res[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}
