import { regPhone, regCNName, regIDCard } from '@/constants'

/** 验证验证码正确性
 * @method regCode
 */
export const regCode = (code: string) => {
  const regResult = code.length === 4 && !isNaN(Number(code))
  return regResult
}
/** 验证手机号正确性
 * @method regMobile
 */
export const regMobile = (mobile: string) => {
  const regResult = regPhone.test(mobile) && !isNaN(Number(mobile))
  return regResult
}
/** 验证中文姓名
 * @method regName
 */
export const regName = (name: string) => {
  const regResult = name && regCNName.test(name)
  return regResult
}
/** 验证中文姓名
 * @method regIDCard
 */
export const regIDcard = (idCard: string) => {
  const regResult = idCard && regIDCard.test(idCard)
  return regResult
}
/** 验证颜色是否为RBG格式
 * @method regIsRGB
 */
export const regIsRGB = (color: string) => {
  const re = /(rgb)\(([0-9]+),([0-9]+),([0-9]+)/
  const regResult = color && re.test(color.replace(/\s/g, ''))
  return regResult
}
