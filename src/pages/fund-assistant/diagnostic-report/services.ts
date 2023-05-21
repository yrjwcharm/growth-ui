import request from '@/services/request'

export interface ManagerInfoType {
  name: string
  head_img: string
  influenceLevel: { level: number; title: string }
  detail: {
    title: string
    manage_year?: string
    hot_rank?: string
    content: {
      key: string
      value: string
    }[]
  }[]
}

interface FundInfoType {
  fund_code: string
}

/** fundInfo: 基金诊断报告(基金信息+基金经理信息)
 */
export const fundInfo = async (params: FundInfoType) => {
  // /assistant/fundManage/lowBuySignal/fund/detail?fund_code=470018
  return request('/assistant/diagnose/fund/manager/info', {
    method: 'GET',
    params
  })
}

/** defaultInfo: 获取页面默认banner+标题图片
 */
export const defaultInfo = async () => {
  return request('/assistant/layer/diagnose/detail/defaultInfo', {
    method: 'GET'
  })
}

// 获取本基金和对标指数曲线图
export const chartData = async (params: { fund_code: string; period: string }) => {
  return request('/assistant/diagnose/fund/index/chart', {
    method: 'GET',
    params
  })
}

// 获取本基金业绩信息
export const fundPerformance = async (params: { fund_code: string }) => {
  return request('/assistant/diagnose/fund/performance', {
    method: 'GET',
    params
  })
}

// 获取基金适不适合当下投资
export const fundInvest = async (params: { fund_code: string }) => {
  return request('/assistant/diagnose/fund/invest', {
    method: 'GET',
    params
  })
}

// 获取用户信息
export const userInfo = async (fund_code = '') => {
  return request('/assistant/user/info', {
    method: 'GET',
    params: {
      fund_code,
      user_type: '2'
    }
  })
}
