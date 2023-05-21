import './Header.less'
import up from '@/assets/images/fund-details/up_down.png'
import React, { useEffect, useState } from 'react'
import down from '@/assets/images/fund-details/drop_down.png'
import { decorationColor } from '@/utils/common'
import { callHoldProfitInfoApi } from '@/pages/fund-details/services'
import debounce from '@/utils'
type TProps = {
  inc_type: string
  day_inc: string
  title: string
  time: string
  fund_code: string
  uid: string
  info: TInfo
}
const HeaderComponent = React.memo(
  ({ inc_type, day_inc, title, time, info, fund_code, uid }: TProps) => {
    const [expand, setExpand] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [yield_info, setYieldInfo] = useState<TYieldInfo>()
    useEffect(() => {
      ;(async () => {
        const res = await callHoldProfitInfoApi({
          fund_code
        })
        if (Array.isArray(res?.yield_info) && res?.yield_info?.length == 0) {
          setIsEmpty(true)
        } else {
          setYieldInfo(res?.yield_info)
          setIsEmpty(false)
        }
      })()
    }, [fund_code])
    const jumpToIncomeDetail: any = () => {
      window.wx.miniProgram.navigateTo({
        url: `/pages/profit-analysis/index?fund_code=${fund_code}&&fund_name=${info.name}`
      })
    }
    return (
      <div className="fund_details_header_box">
        <div className="fund_header">
          <div className="fund_sel_wrap">
            <div className="fund_sel">
              <img
                src={require('@/assets/images/fund-details/prev.png')}
                className="prev"
                alt="prev"
              />
              <div className="fund_wrap">
                <span className="fund_name">{info.name}</span>
                <span className="fund_code">{info.code}</span>
              </div>
              <img
                src={require('@/assets/images/fund-details/next.png')}
                className="next"
                alt="next"
              />
            </div>
          </div>
        </div>
        <div className="update_time">
          {time && (
            <span>
              {' '}
              {title}：{info?.is_monetary ? '--' : time}
            </span>
          )}
        </div>
        <div className="bottom_wrap">
          <div className="left_container">
            <div className="left_side">
              <div className="bottom">
                <span className="cur_gain">当日涨幅</span>
                {inc_type && <div className="esti">{inc_type}</div>}
              </div>
              <span className="rate" style={{ color: decorationColor(day_inc) }}>
                {info?.is_monetary ? '--' : day_inc}
              </span>
            </div>
            <div className="center_side">
              <span className="bottom">{info?.year_yield?.title}</span>
              <span
                className="rate"
                style={{
                  color: decorationColor(info?.year_yield?.value)
                }}
              >
                {info?.year_yield?.value}
              </span>
            </div>
          </div>
          {!isEmpty && (
            <>
              {!info?.is_monetary && (
                <img
                  src={expand ? up : down}
                  alt="up"
                  className="right_icon"
                  onClick={() => {
                    setExpand(!expand)
                  }}
                />
              )}
            </>
          )}
        </div>
        {!isEmpty && (
          <>
            {!info?.is_monetary && (
              <>
                {expand && (
                  <div className="raise_info">
                    <div className="top_wrap">
                      <div className="left_side">
                        <span className="label">持有金额</span>
                        <span className="value">{yield_info?.hold_amount}</span>
                      </div>
                      <div className="center_side">
                        <span className="label">持仓占比</span>
                        <span className="value">{yield_info?.hold_ratio}</span>
                      </div>
                      <div className="right_side">
                        <span className="label">持仓成本</span>
                        <span className="value">{yield_info?.import_nav}</span>
                      </div>
                    </div>
                    <div className="center_wrap">
                      <div className="left_side">
                        <span className="label">持有收益</span>
                        <span
                          className="value"
                          style={{
                            color: decorationColor(yield_info?.hold_profit)
                          }}
                        >
                          {yield_info?.hold_profit}
                        </span>
                      </div>
                      <div className="center_side">
                        <span className="label">持有收益率</span>
                        <span
                          className="value"
                          style={{
                            color: yield_info?.hold_inc
                          }}
                        >
                          {yield_info?.hold_inc}
                        </span>
                      </div>
                      <div className="right_side">
                        <span className="label">持有天数</span>
                        <span className="value">{yield_info?.hold_day}</span>
                      </div>
                    </div>
                    <div className="bottom_wrapper">
                      <div className="left_side">
                        <span className="label">昨日收益</span>
                        <span
                          className="value"
                          style={{
                            color: decorationColor(yield_info?.day_profit)
                          }}
                        >
                          {yield_info?.day_profit}
                        </span>
                      </div>
                      <div className="center_side">
                        <span className="label">昨日收益率</span>
                        <span
                          className="value"
                          style={{
                            color: yield_info?.day_inc
                          }}
                        >
                          {yield_info?.day_inc}
                        </span>
                      </div>
                      <div className="right_side">
                        <span
                          className="label"
                          style={{
                            color: 'transparent'
                          }}
                        >
                          ------
                        </span>
                        <span
                          className="value"
                          style={{
                            color: 'transparent'
                          }}
                        >
                          -----
                        </span>
                      </div>
                    </div>

                    <div className="profit_mx_wrap" onClick={debounce(jumpToIncomeDetail)}>
                      <span className="profit_txt">收益明细</span>
                      <img
                        src={require('@/assets/images/fund-details/arrow_icon.png')}
                        alt=""
                        className="arrow_right"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    )
  }
)
export default HeaderComponent
