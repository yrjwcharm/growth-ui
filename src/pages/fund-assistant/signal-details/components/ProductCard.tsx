/*
 * @Date: 2023-02-08 18:57:25
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-10 14:31:31
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/ProductCard.tsx
 * @Description: 基金名称标签、基金使用买卖信号以后增加的收益率
 */

import React, { useEffect, useState } from 'react'
import { Toast } from 'antd-mobile'
import debounce from '@/utils'
import useQuery from '../useQuery'
import { addFocus, queryUserFocusStatus } from '../services'

import '../index.less'
import './ProductCard.less'
import arrow from '@/assets/images/arrow.png'
import usePageContext from '../usePageContext'
import { decorationColor } from '@/utils/common'
// 产品名称和标签
export function ProductCard({ info }: { info?: any }) {
  const query = useQuery()
  const { isToBuyCombo, isLock } = usePageContext()
  const [focus, setFocus] = useState(false)

  const focusMethod = (fund_code: string) => {
    ;(async () => {
      const res1 = await queryUserFocusStatus({
        fund_code,
        type: 1
      })
      setFocus(res1?.is_collect)
    })()
  }

  useEffect(() => {
    if (!query.fund_code) return
    focusMethod(query.fund_code)
  }, [query])
  return (
    <div className="product_card_header">
      <div className="product_card">
        {query.is_cover === '1' && isLock && (
          <img
            onClick={isToBuyCombo as React.MouseEventHandler<HTMLImageElement> | undefined}
            src={require('@/assets/images/mask_layer.png')}
            className="mask_layer"
            alt=""
          />
        )}
        <div
          className="product_wrap"
          style={{
            filter:
              query.is_cover === '1' && isLock ? `opacity(.5) blur(2px)` : 'opacity(1) blur(0)'
          }}
        >
          <div className="title_wrap">
            <span className="fund_name">{info?.fund_name}</span>
          </div>
          <div className="product-tag-wrap">
            <span className="fund_code">{info?.fund_code}</span>
            {info?.tags.map(
              (
                item:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => {
                if (item) {
                  return (
                    <div className="type_wrap" key={index}>
                      {item}
                    </div>
                  )
                } else {
                  return null
                }
              }
            )}
          </div>
        </div>
        <div
          style={{
            filter:
              query.is_cover === '1' && isLock ? `opacity(.5) blur(2px)` : 'opacity(1) blur(0)'
          }}
          className="focus"
          onClick={async () => {
            Toast.show({
              icon: 'loading',
              maskClickable: false,
              content: '请稍等...'
            })
            if (!focus) {
              const res = await addFocus({
                optional_code: [query.fund_code],
                type: 1,
                upload_fund_page: 'buySignal',
                user_type: '2'
              })
              if (res) {
                focusMethod(query.fund_code)
              }
              Toast.clear()
            } else {
              Toast.show({
                icon: 'success',
                maskClickable: false,
                duration: 3500,
                content: '您已关注成功'
              })
            }
          }}
        >
          <span className="focus_txt">{focus ? '已关注' : '+关注'}</span>
        </div>
      </div>
    </div>
  )
}

// 基金涨幅和历史比较
export function CompareCard({
  nav,
  gain,
  esti_date
}: {
  nav: string
  gain: string
  esti_date: string
}) {
  const { historyInfo } = usePageContext()

  return (
    <div className="compare-wrap">
      <div className="compare-content-wrap">
        <div className="left_wrap">
          <div className="left_side">
            <span
              className="profit_rate_value"
              style={{ color: historyInfo?.fund_profit_info?.fund_profit?.color ?? '' }}
            >
              {historyInfo?.fund_profit_info?.fund_profit?.profit ?? '0'}
            </span>
            <span className="profit_rate_label">历史收益率</span>
          </div>
          <div className="right_side">
            <div className="top_wrap">
              <img src={require('@/assets/images/gain.png')} alt="" className="icon" />
              <span
                className="rate"
                style={{ color: historyInfo?.fund_profit_info?.excess_profit?.color ?? '' }}
              >
                {historyInfo?.fund_profit_info?.excess_profit?.profit ?? 0}
              </span>
            </div>
            <div className="bottom_wrap">
              <img src={require('@/assets/images/add_signal.png')} alt="" className="icon" />
              <span className="signal_txt">买卖信号</span>
            </div>
          </div>
        </div>
        <div className="right_wrap">
          <div className="left_side">
            <span
              className="top"
              style={{
                color: decorationColor(gain)
              }}
            >
              {gain}
            </span>
            <div className="bottom_wrap">
              <span className="txt">当日涨幅</span>
              <img src={require('@/assets/images/esti.png')} alt="" className="icon" />
            </div>
          </div>
          <div className="right_side">
            <span className="val">{nav}</span>
            <span className="label">估值{esti_date ? `(${esti_date})` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const jumpToOfficialAccount = (): any => {
  ;(window as any).wx.miniProgram.navigateTo({
    url: '/pages/official-account/index'
  })
}

// 微信公众号
export function WechatBlock() {
  return (
    <div
      onClick={debounce(jumpToOfficialAccount)}
      className="official_account"
      style={{ background: '#F1F6FF' }}
    >
      <div className="wrap">
        <span className="left">关注基金理财工具公众号,获取每日买卖信号信息推送</span>
        <div className="right">
          <img alt="" src={arrow} width={10} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
