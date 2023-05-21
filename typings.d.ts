/*
 * @Date: 2023-01-03 14:28:40
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-02 11:28:16
 * @FilePath: /growth-ui/typings.d.ts
 * @Description:
 */
declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.jpeg'
declare module 'weixin-js-sdk'
declare module 'react-fast-scroll'
declare module 'lodash'
declare module 'umi'
declare module 'lodash'
declare module 'qs'
declare module 'rc-bullets-ts'
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare const REACT_APP_ENV: 'testing' | 'pre1' | 'production'

/* eslint-disable */
declare const __webpack_public_path__: string
// test.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'wx-open-launch-weapp': any
  }
}
interface Window {
  wx: {
    config: Function
    ready: Function
    updateAppMessageShareData: Function
    updateTimelineShareData: Function

    miniProgram: {
      navigateTo: Function
      navigateBack: Function
      switchTab: Function
      postMessage: Function
      reLaunch: Function
      getEnv: Function
    }
    __wxjs_environment?: 'miniprogram'
  }
}
