/*
 * @Date: 2023-02-09 11:44:46
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-09 18:43:00
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/usePageContext.ts
 * @Description:
 */
import React, { useContext } from 'react'

export interface IHistoryInfo {
  chart_list: {
    chart: any[]
    label: any[]
    sub_tabs: { name: string; val: string }[]
  }
  fund_profit_info: {
    excess_profit: {
      profit: string
      color: string
    }
    fund_profit: {
      profit: string
      color: string
    }
  }
  fund_total_yield: {
    profit: number
    yield: string
    yield_name: string
  }
  signal_total_yield: {
    profit: number
    yield: string
    yield_name: string
  }
}

// export interface IFundInfo {
//   chart: {
//     list: any[]
//     chart_name: string[]
//     signal_name: string
//   }
//   chartTime: { key: string; value: string }[]
//   indexInfo: {
//     signal_date: string
//     signal_level: number
//     title: string
//   }
// }

interface InfoType {
  fund_name: string // 基金名称
  fund_code: string // 基金代码
  ra_date: string
  tags: string[] // 标签
  daily_estimate: string // 日估值
  month_estimate: string // 月估值
  daily_level: 1 | 2 | 3 | 4 | 5 // 日档位
  month_level: number // 月档位
  info_text: string // 提示语
  sug_title: string // 标题
}
export interface IFundDetailInfo {
  chart: {
    list: any[]
    hightlist: any[]
  }
  chartTime: { key: string; value: string }[]
  fundInfo: InfoType
  is_lock: boolean
  is_member: boolean
}

interface IContext {
  isLock: boolean

  isToBuyCombo: Function | null
  fundBaseInfo?: InfoType
  historyInfo?: IHistoryInfo
}

export const pageContext = React.createContext<IContext>({
  isLock: true,
  isToBuyCombo: null,
  fundBaseInfo: undefined,
  historyInfo: undefined
})

export function usePageContext() {
  const values = useContext(pageContext)

  return values
}

export default usePageContext
