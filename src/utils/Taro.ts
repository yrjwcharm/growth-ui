/*
 * @Date: 2023-03-02 10:30:52
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-02 11:28:31
 * @FilePath: /growth-ui/src/utils/Taro.ts
 * @Description: 通过webview通讯，实现部分taro的功能
 */

import sendMsgToWX from './sendMsgToWX'

const Taro = {
  switchTab: (params: { url: string }) => {
    window.wx.miniProgram.switchTab(params)
  },
  navigateTo: (params: { url: string }) => {
    window.wx.miniProgram.navigateTo(params)
  }
}

export default Taro
