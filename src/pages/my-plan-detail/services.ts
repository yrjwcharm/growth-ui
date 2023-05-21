import request from '@/services/request'
export function callMyFixPlanDetail(params: any) {
  return request(`/assistant/invest/plan/user/calculate`, {
    method: 'GET',
    params
  })
}
export function subscribeFixedPlan(params: any) {
  return request(`/assistant/invest/plan/add`, {
    method: 'POST',
    params
  })
}
export function cancelSubscribeFixedPlan(params: any) {
  return request(`/assistant/invest/plan/cancel/sub`, {
    method: 'GET',
    params
  })
}

export function callGetFundBasicInfo(params: any) {
  return request(`/assistant/fundManage/fund/info`, {
    method: 'GET',
    params
  })
}
