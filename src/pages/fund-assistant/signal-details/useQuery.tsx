/*
 * @Date: 2023-02-09 14:03:18
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-02 12:12:47
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/useQuery.tsx
 * @Description:
 */
import { useState, useEffect } from 'react'
import qs from 'qs'
interface IQuery {
  token: string
  uid: string
  isFree: string
  fund_code: string
  chn: string
  did: string
  is_cover?: string
}

const search = window.location.search.replace('?', '')
const _query = qs.parse(search) as unknown as IQuery

export default function useQuery() {
  const [query, setQuery] = useState<IQuery>(_query)
  useEffect(() => {
    setQuery(_query)
  }, [])

  return query || _query
}
