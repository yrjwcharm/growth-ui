import axios from 'axios'
import {
  RedirectURI
  // channel, codepushver
} from '@/config'
import { getLocalToken, removeLocalToken } from '@/utils'
import Toast from '@/components/Toast'
const ERR_OK = '000000' // 请求成功
const ERR_TOKEN = '000403' // token失效或者丢失 需要重新登录
const ERR_FAILED = '999997' // 请求错误

const service = axios.create({
  baseURL: RedirectURI,
  timeout: 20000
})

service.interceptors.request.use(async (config: any) => {
  const token = getLocalToken()
  if (token) {
    config.headers.Authorization = token
  }

  // if (!config.noprefix) {
  //   // 接口增加/api
  //   config.url = combineURL(prefix, config.url)
  // }

  if (config.headers.type === 'upload') {
    config.timeout = undefined
  }

  return config
})

service.interceptors.response.use(
  async (response: any): Promise<any> => {
    const {
      status,
      data: { message, code, result }
    }: any = response
    // Toast.hide()
    if (status === 200) {
      // token失效 token 401
      if (code === ERR_TOKEN) {
        // 退出登录
        removeLocalToken()
        // replace('Login')
      }
      if (code === ERR_OK) {
        // 统一隐藏一次Toast菊花
        // 处理分享的配置
        // if (result && result.share_config) {
        //   share(result.share_config || {}, result.h5_share_info || {})
        // }
        return Promise.resolve(result)
      }
      if (code === ERR_FAILED) {
        // eslint-disable-next-line no-console
        try {
          if (message) {
            Toast.failed(message, 1500)
          }
          // Toast.hide()
        } catch (error) {}

        return Promise.reject(message)
      }
    }
  },
  (e) => {
    console.log(e)
    if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1) {
      // Toast.failed('请求超时！')
      return
      // return service.request(originalRequest);//例如再重复请求一次
    }
    const { status } = e.response
    if (status === 500) {
      Toast.info('服务器发生错误，请稍后再试')
      return
    }
    // eslint-disable-next-line no-console
    console.log(e)
    return Promise.reject(e)
  }
)

// const share = (share: any, share_info: any) => {
//   let config:
//     | {
//         link: string
//         title: string
//         desc: string
//         imgUrl: string
//       }
//     | undefined = undefined
//   if (Object.keys(share_info).length !== 0) {
//     config = {
//       link: share_info.link,
//       title: share_info.title,
//       desc: share_info.sub_title,
//       imgUrl: share_info.icon
//     }
//   }
//
//   wxShareConfig(share, config)
// }

export default service as any
