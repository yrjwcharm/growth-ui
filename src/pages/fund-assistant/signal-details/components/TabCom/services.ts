import request from '@/services/request'

/** valuationSignal: 估值信号
 */
export const valuationSignal = async (params: {
  index_id: 'SH' | 'SZ' // 上证: SH; 深证: SZ
  period: string
}) => {
  return request('/assistant/fundManage/lowBuySignal/index/detailNew', {
    method: 'GET',
    params
  })
}
