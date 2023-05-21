import request from '@/services/request'

export const callGetPerfTrendChartApi = ({
  fund_code,
  period,
  index_id
}: {
  fund_code: string
  period: string
  index_id: string
}) => {
  return request(
    `/assistant/v4/fundManage/fund/index/chart?fund_code=${fund_code}&period=${period}&index_id=${index_id}`,
    {
      method: 'GET'
    }
  )
}
/**
 * 净值曲线
 * @param uid
 * @param fund_code
 */
export const callEstiNavApi = ({ uid, fund_code }: { uid: string; fund_code: string }) => {
  return request(
    `/assistant/v4/fundManage/lowBuySignal/fund/currentValuation?fund_code=${fund_code}&uid=${uid}`,
    {
      method: 'GET'
    }
  )
}
/**
 * 七日年化
 * @param fund_code
 * @param period
 */
export const callSevenDayAnnualApi = ({
  fund_code,
  period
}: {
  fund_code: string
  period: string
}) => {
  return request(
    `/assistant/v4/fundManage/fund/weekApr/chart?fund_code=${fund_code}&period=${period}`,
    {
      method: 'GET'
    }
  )
}
/**
 * 万分收益接口
 * @param fund_code
 * @param period
 */
export const callThousandProfitApi = ({
  fund_code,
  period
}: {
  fund_code: string
  period: string
}) => {
  return request(
    `/assistant/v4/fundManage/fund/tenThousand/chart?fund_code=${fund_code}&period=${period}`,
    {
      method: 'GET'
    }
  )
}

export const callGetFundInfoApi = (fund_code: string) => {
  return request(`/assistant/v4/fundManage/fund/info?fund_code=${fund_code}`, {
    method: 'GET'
  })
}
/**
 * 我的收益-持有接口
 * @param fund_code
 * @param period
 */
export const callHoldProfitChartApi = ({
  fund_code,
  period
}: {
  fund_code: string
  period: string
}) => {
  return request(
    `/assistant/v4/fundManage/user/fund/holdYield/chart?fund_code=${fund_code}&period=${period}`,
    {
      method: 'GET'
    }
  )
}
/**
 * 获取持有收益基本信息
 */
export const callHoldProfitInfoApi = ({ fund_code }: { fund_code: string }) => {
  return request(`/assistant/v4/fundManage/fund/holdYield/info?fund_code=${fund_code}`, {
    method: 'GET'
  })
}
/**
 * 弹幕发送
 */
export const callSendBarrageApi = (params: { fund_code: string; msg: string; color: string }) => {
  return request(`/assistant/v4/bulletChat/send`, {
    method: 'POST',
    params
  })
}
export const callBarrageListApi = ({
  page,
  limit,
  fund_code
}: {
  fund_code: string
  page: number
  limit: number
}) => {
  return request(
    `/assistant/v4/bulletChat/list?fund_code=${fund_code}&page=${page}&limit=${limit}`,
    {
      method: 'GET'
    }
  )
}
/**
 * 获取基金历史净值
 */
export const callHistoryNavApi = ({ fund_code, period }: { fund_code: string; period: string }) => {
  return request(
    `/assistant/v4/fundManage/fund/history/list?fund_code=${fund_code}&period=${period}`
  )
}
/**
 * 弹幕开启与关闭
 */
export const callBarrageOpenCloseApi = (params: { fund_code: string; type: number }) => {
  return request(`/assistant/v4/bulletChat/open/save`, {
    method: 'POST',
    params
  })
}
/**
 * 看涨看跌
 */
export const callRaiseFallApi = (params: { fund_code: string; type: number }) => {
  return request(`/assistant/v4/fundUpDown/click`, {
    method: 'POST',
    params
  })
}
