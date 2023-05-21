const getEquipment = () => {
  let u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isIOS) {
    return 'ios'
  }
}

export default getEquipment
