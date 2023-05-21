/*
 * @Date: 2023-02-24 10:56:50
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-06 11:57:52
 * @FilePath: /growth-ui/src/utils/sendPoint.ts
 * @Description:
 */
import sendMsgToWX from './sendMsgToWX'
const sendPoint = (params: { [key: string]: any }) => {
  const img = new Image()
  try {
    if (!params.ts) {
      params.ts = Date.now()
    }
  } catch (er) {}

  let _str = ''
  try {
    Object.keys(params)?.map((item, index) => {
      if (index === 0) {
        _str += `${item}=${params[item]}`
      } else {
        _str += `&${item}=${params[item]}`
      }
    })

    img.src = `https://tj.licaimofang.com/v.gif?${_str}`
  } catch (error) {}

  try {
    const msg = {
      type: 'umeng',
      params
    }
    sendMsgToWX(msg)
  } catch (error) {}
}

export { sendPoint }
