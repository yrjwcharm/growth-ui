/*
 * @Date: 2023-02-23 15:34:21
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-23 15:44:27
 * @FilePath: /growth-ui/src/utils/sendMsgToWX.ts
 * @Description:
 */

/** 向小程序发送消息 */
export default function sendMsgToWX(msg: any) {
  try {
    const { wx } = window as unknown as { wx: { miniProgram: { postMessage: any } } }
    wx.miniProgram.postMessage({
      data: msg
    })
  } catch (error) {}
}
