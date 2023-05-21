import request from '@/services/request'
export function callGetFixInfo() {
  return request('/assistant/layer/fund/investPlan/defaultInfo', {
    method: 'GET'
  })
}

export function queryFixedDetail(params: any) {
  return request(`/assistant/invest/plan/calculate`, {
    method: 'GET',
    params
  })
}
export function subscribeFixedPlan(params: any) {
  return request(`/assistant/invest/plan/sub`, {
    method: 'POST',
    params
  })
}

export function callGetFundBasicInfo(params: any) {
  return request(`/assistant/fundManage/fund/info`, {
    method: 'GET',
    params
  })
}
