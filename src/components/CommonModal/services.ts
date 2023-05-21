import request from '@/services/request'

export const callBuyPriceApi = () => {
  return request(`/assistant/user/right/per/day/price`, {
    method: 'GET'
  })
}
