import request from '@/services/request'

interface ProductDetailsType {
  fund_code: string
  period?: string
  direction?: number
}
type params = {
  fund_code: string
  period: string
}
type unlockInfo = {
  fund_code: string
  unlock_re_id?: string
  combo_id?: string
  uid?: string
}
/** detailFund: 低估信号详情
 */
export const queryUserFocusStatus = async (params: any) => {
  return request('/assistant/fundManage/get/user/collectStatus', {
    method: 'GET',
    params
  })
}

export const lowBuySignal = async (params: {
  period: string
  page_source: string
  fund_code: string
}) => {
  return request(`/assistant/fundManage/lowBuySignal/fund/tdDetail`, {
    method: 'GET',
    params
  })
}
export const signalChart = async (params: ProductDetailsType) => {
  return request(`/assistant/fundManage/lowBuySignal/fund/market/chart`, {
    method: 'GET',
    params
  })
}
export const fallSignalChart = async (params: ProductDetailsType) => {
  return request(`/assistant/fundManage/lowBuySignal/fund/market/chart`, {
    method: 'GET',
    params
  })
}

/** historyFund: 低估信号详情=>历史
 */
// export const historyFund = async (data: ProductDetailsType) => {
//   return request('/assistant/fundManage/historyFund', {
//     method: 'POST',
//     data
//   })
// }

/** diagram: 低估信号详情=>近30天折线图
 */
export const diagram = async (data: ProductDetailsType) => {
  return request('/assistant/fundManage/diagram', {
    method: 'POST',
    data
  })
}

export const addFocus = async (data: any) => {
  return request(`/assistant/fundManage/addFund`, {
    method: 'POST',
    data: {
      type: 1,
      ...data
    }
  })
}
export const getTimeCurveApi = ({ fund_code, period }: params) => {
  return request(
    `/assistant/fundManage/lowBuySignal/fund/historyYield/chart?fund_code=${fund_code}&period=${period}`,
    {
      method: 'GET'
    }
  )
}
export const callComboInfoInterfaceApi = () => {
  return request(`/assistant/user/right/comboInfo`, {
    method: 'GET'
  })
}
export const callFundUnlockInterfaceApi = (params: unlockInfo) => {
  return request(`/assistant/user/right/unlock/fund`, {
    method: 'POST',
    params
  })
}

export const callEstiNavApi = ({ uid, fund_code }: { uid: string; fund_code: string }) => {
  return request(
    `/assistant/fundManage/lowBuySignal/fund/currentValuation?fund_code=${fund_code}&uid=${uid}`,
    {
      method: 'GET'
    }
  )
}
