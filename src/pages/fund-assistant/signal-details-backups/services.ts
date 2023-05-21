import request from '@/services/request'

interface ProductDetailsType {
  uid: string
  fund_code: string
}

/** detailFund: 低估信号详情
 */
export const detailFund = async (data: ProductDetailsType) => {
  return request('/assistant/fundManage/detailFund', {
    method: 'POST',
    data
  })
}

/** historyFund: 低估信号详情=>历史
 */
export const historyFund = async (data: ProductDetailsType) => {
  return request('/assistant/fundManage/historyFund', {
    method: 'POST',
    data
  })
}

/** diagram: 低估信号详情=>近30天折线图
 */
export const diagram = async (data: ProductDetailsType) => {
  return request('/assistant/fundManage/diagram', {
    method: 'POST',
    data
  })
}
