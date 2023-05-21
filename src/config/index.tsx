/*
 * @Date: 2023-01-11 15:00:13
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-01-12 14:12:13
 * @FilePath: /growth-ui/src/config/index.tsx
 * @Description:
 */
export * from './variables'
export * from './styles'

export const prefix: string = '/api'
export const RedirectURI: string = {
  testing: 'http://assistant-api.yitao.mofanglicai.com.cn', // 测试
  // testing: 'http://assistant-api.xiaojun.mofanglicai.com.cn', // 测试
  pre1: 'https://assistant-api-kp1.licaimofang.com', // pre1
  production: 'https://assistant-api.licaimofang.com' // 正式
}[process.env.REACT_APP_ENV!]! //dev
/* *******************************Start*********************************** */
export const white_list: string[] = []
/* *******************************End************************************* */
