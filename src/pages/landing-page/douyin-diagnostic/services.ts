import request from '@/services/request'

/** 获取跳转小程序的链接
 */
export const getMinAppLink = async (data: any) => {
  return request('/wechat/mini/h5/urlLink', {
    method: 'POST',
    data
  })
}

/** 数据回传
 */
export const arrivedH5 = async (data: { ad_info: string }) => {
  return request('/assistant/ad/arrivedH5', {
    method: 'POST',
    data
  })
}
