import './PerformanceTrend.less'
import DownArrow from '@/assets/images/fund-details/down_arrow.png'
import UpArrow from '@/assets/images/fund-details/up_arrow.png'
import { useEffect, useRef, useState } from 'react'
import { Popover } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/popover'
import BaseAreaChart from '@/components/Chart/BaseAreaChart'
import { cloneDeep } from 'lodash'
import { callGetPerfTrendChartApi, callHistoryNavApi } from '@/pages/fund-details/services'
import { decorationColor } from '@/utils/common'
import DefaultGraph from '@/components/DefaultGraph'
import Loading from '@/components/Loading'
import { RightOutline } from 'antd-mobile-icons'
import debounce from '@/utils'

const PerformanceTrend = ({
  fund_code,
  uid,
  info
}: {
  info: TInfo
  fund_code: string
  uid: string
}) => {
  const [timePeriod, setTimePeriod] = useState<string>('m3')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState<any>([])
  const [[, leftSide, centerSide, rightSide], setChartLabel] = useState<
    { key: string; val: string }[]
  >([])
  const [index_id, setIndexId] = useState<string>('SH')
  const chartLabelDefaultRef = useRef({})
  //历史净值
  const [navList, setNavList] = useState([])
  const [isDown, setIsDown] = useState<boolean>(true)
  const actions: Action[] = [
    {
      key: 'SH',
      text: '上证指数'
    },
    {
      key: 'HS',
      text: '沪深300'
    },
    {
      key: 'CY',
      text: '创业板指'
    },
    {
      key: 'SZ',
      text: '深证成指'
    },
    {
      key: 'GZ',
      text: '国债指数'
    }
  ]
  const onChange = (items: any) => {
    setChartLabel((prev: any) => {
      const next = cloneDeep(prev)
      next[0].val = items[0].title
      next[1].val = items[0].value || '0%'
      next[2].val = items[1].value || '0%'
      next[1].color = items[0].origin.value > 0 ? '#E74949' : '#4BA471'
      next[2].color = items[1].origin.value > 0 ? '#E74949' : '#4BA471'
      return next
    })
  }
  useEffect(() => {
    ;(async () => {
      if (!fund_code) return
      const res = await callGetPerfTrendChartApi({
        index_id: index_id,
        fund_code,
        period: timePeriod
      })
      const response = await callHistoryNavApi({
        fund_code,
        period: timePeriod
      })
      setNavList(response?.fund_list?.navs ?? [])
      if (res?.chart_list?.chart?.length > 0) setIsEmpty(false)
      else setIsEmpty(true)
      setChartData(res?.chart_list)
      setChartLabel(res?.chart_list?.label ?? [])
      chartLabelDefaultRef.current = res?.chart_list?.label ?? []
      setLoading(false)
    })()
  }, [fund_code, timePeriod, index_id])
  const jumpToHistoryNav: any = () => {
    window.wx.miniProgram.navigateTo({
      url: `/pages/history-nav/index?fund_code=${fund_code}&period=${timePeriod}&fund_name=${info.name}`
    })
  }
  return (
    <div
      style={{
        height: '300px'
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="performance_trend_box">
          {!isEmpty ? (
            <>
              {chartData?.chart?.length > 0 && (
                <>
                  <div className="perf_trend_legend">
                    <div className="left_side">
                      <span
                        className="value"
                        style={{
                          color: decorationColor(leftSide?.val)
                        }}
                      >
                        {leftSide?.val}
                      </span>
                      <div className="label_wrap">
                        <div className="line_color" />
                        <span className="label">{leftSide?.key}</span>
                      </div>
                    </div>
                    <div className="center_side">
                      <span
                        className="value"
                        style={{
                          color: decorationColor(centerSide?.val)
                        }}
                      >
                        {centerSide?.val}
                      </span>
                      <Popover.Menu
                        actions={actions.map((action) => ({
                          ...action,
                          icon: null
                        }))}
                        onAction={(node) => {
                          setIsDown(!isDown)
                          setIndexId(node.key as string)
                        }}
                        placement="bottom-start"
                        trigger="click"
                      >
                        <div className="label_wrap">
                          <div className="line_color" />
                          <span className="label">{centerSide?.key}</span>
                          <img src={isDown ? DownArrow : UpArrow} alt="" className="arrow" />
                        </div>
                      </Popover.Menu>
                    </div>
                    {rightSide?.key && (
                      <div className="right_side">
                        <span className="value">{rightSide?.val}</span>
                        <div className="label_wrap">
                          <div className="line_color" />
                          <span className="label">{rightSide?.key}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/*业绩走势图表*/}
                  <div className="perf_trend_chart" style={{ marginTop: '16px' }}>
                    <BaseAreaChart
                      id="perf"
                      data={chartData?.chart}
                      onChange={(obj: any) => {
                        const { items } = obj
                        onChange(items)
                      }}
                      ownColor={true}
                      onHide={() => {
                        setChartLabel(
                          chartLabelDefaultRef?.current as { key: string; val: string }[]
                        )
                      }}
                      padding={[5, 20, 20, 50]}
                      percent={true}
                      showArea={true}
                      showDate={true}
                      tofixed={2}
                    />
                    <div className="period-wrap">
                      {chartData?.chart_time?.map((el: any, index: number) => {
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              setTimePeriod(el.value)
                            }}
                            className="period_item"
                            style={
                              timePeriod == el.value
                                ? { background: '#DEE8FF' }
                                : { background: 'transparent' }
                            }
                          >
                            <span
                              style={
                                timePeriod == el.value
                                  ? {
                                      fontFamily: 'PingFangSC-Medium',
                                      color: '#0051cc',
                                      fontWeight: '500'
                                    }
                                  : {
                                      fontFamily: 'PingFangSC-Regular',
                                      color: '#545968',
                                      fontWeight: 400
                                    }
                              }
                            >
                              {el.key}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="profit_header">
                    <div className="wrap">
                      <span className="left_side">日期</span>
                      <span className="center_side">净值</span>
                      <span className="right_side">日涨幅</span>
                    </div>
                  </div>
                  {navList
                    .slice(0, 10)
                    .map(
                      (item: { date: string; inc_ratio: number; nav: number }, index: number) => {
                        return (
                          <div className="profit_list">
                            <div className="list_wrap">
                              <span className="left_side">{item.date}</span>
                              <span className="center_side">{item.nav}</span>
                              <span
                                className="right_side"
                                style={{
                                  color: decorationColor((item.inc_ratio * 100).toFixed(2))
                                }}
                              >
                                {(item.inc_ratio * 100).toFixed(2) + '%'}
                              </span>
                            </div>
                          </div>
                        )
                      }
                    )}
                  <div className="search_more" onClick={debounce(jumpToHistoryNav)}>
                    <div className="wrap">
                      <span className="search">查看历史净值</span>
                      <RightOutline color="545968" />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div
              style={{
                height: '300px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <DefaultGraph title="暂无数据" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default PerformanceTrend
