export * from './url'
export * from './local'
export * from './device'
export * from './regfunc'
//   生成唯一id
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0
    const v = c === 'x' ? r : (r && 0x3) || 0x8
    return v.toString(16)
  })
}
export function isIphoneX() {
  return (
    /iphone/gi.test(navigator.userAgent) &&
    window.screen &&
    window.screen.height === 812 &&
    window.screen.width === 375
  )
}
/** 十六进制转RGBA  */
export function colorRgba(color: string = '#D83931', opacity?: number) {
  const rergba = new RegExp(/(rgba)\(([0-9]+),([0-9]+),([0-9]+)/)
  const regRgbaResult = color && rergba.test(color.replace(/\s/g, ''))

  if (regRgbaResult) {
    return color
  }
  const rergb = new RegExp(/(rgb)\(([0-9]+),([0-9]+),([0-9]+)/)
  const regRgbResult = color && rergb.test(color.replace(/\s/g, ''))

  if (regRgbResult) {
    let new_col = color.replace(/rgb/i, 'rgba')
    new_col = new_col.replace(/\)/i, `, ${opacity ?? 1})`)
    return new_col
  }
  var sColor = color.toLowerCase()
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      // eslint-disable-next-line radix
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return `rgba(${sColorChange.join(',')},${opacity ?? 1})`
  }
  return sColor
}
export default function debounce(
  fun: { (): Promise<void>; (): Promise<void>; apply?: any; call?: any },
  delay = 500,
  immediate = true
) {
  let timer: any = null //保存定时器
  return function (args: any) {
    // @ts-ignore
    let that = this
    let _args = args
    if (timer) clearTimeout(timer) //不管是否立即执行都需要首先清空定时器
    if (immediate) {
      if (!timer) fun.apply(that, _args) //如果定时器不存在,则说明延时已过,可以立即执行函数
      //不管上一个延时是否完成,都需要重置定时器
      timer = setTimeout(function () {
        timer = null //到时间后,定时器自动设为null,不仅方便判断定时器状态还能避免内存泄露
      }, delay)
    } else {
      //如果是非立即执行版,则重新设定定时器,并将回调函数放入其中
      timer = setTimeout(function () {
        fun.call(that, _args)
      }, delay)
    }
  }
}
export const isIOS = () => {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  return isiOS
}
