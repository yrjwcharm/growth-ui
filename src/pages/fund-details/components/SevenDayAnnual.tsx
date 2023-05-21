import './SevenDayAnnual.less'
import { useEffect, useRef, useState } from 'react'
import BaseAreaChart from '@/components/Chart/BaseAreaChart'
import { cloneDeep } from 'lodash'
import { decorationColor } from '@/utils/common'
import DefaultGraph from '@/components/DefaultGraph'
import Loading from '@/components/Loading'
import { callSevenDayAnnualApi } from '@/pages/fund-details/services'
import { RightOutline } from 'antd-mobile-icons'
const SevenDayAnnual = ({ fund_code }: { fund_code: string }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [timePeriod, setTimePeriod] = useState<string>('m3')
  const [chartData, setChartData] = useState<any>([])
  const [[leftSide, centerSide], setChartLabel] = useState<{ key: string; val: string }[]>([])
  const chartLabelDefaultRef = useRef({})
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    ;(async () => {
      if (!fund_code) return
      const res = await callSevenDayAnnualApi({
        fund_code,
        period: timePeriod
      })
      if (res?.chart_list?.chart?.length > 0) setIsEmpty(false)
      else setIsEmpty(true)
      setChartData(res?.chart_list)
      setChartLabel(res?.chart_list?.label ?? [])
      chartLabelDefaultRef.current = res?.chart_list?.label ?? []
      setLoading(false)
    })()
  }, [fund_code, timePeriod])
  const onChange = (items: any) => {
    setChartLabel((prev: any) => {
      const next = cloneDeep(prev)
      next[0].val = items[0].title
      next[1].val = items[0].value || '0%'
      return next
    })
  }
  return (
    <div
      style={{
        height: '300px'
      }}
    >
      {' '}
      {loading ? (
        <Loading />
      ) : (
        <div className="fund_details_seven_day_annual">
          {!isEmpty ? (
            <>
              {chartData?.chart?.length > 0 && (
                <>
                  <div className="acc_legend">
                    <span className="date_label">{leftSide?.key}</span>
                    <span className="date_value">{leftSide?.val}</span>
                    <div className="line_color" />
                    <span className="acc_label">{centerSide?.key}</span>
                    <span
                      className="value"
                      style={{
                        color: decorationColor(centerSide?.val)
                      }}
                    >
                      {centerSide?.val}
                    </span>
                  </div>

                  {/*业绩走势图表*/}
                  <div className="acc_profit_chart" style={{ marginTop: '16px' }}>
                    <BaseAreaChart
                      id="perf"
                      areaColors={['l(90) 0:#3370ff 1:#fff', 'transparent', '#3370ff']}
                      colors={['#3370ff']}
                      data={chartData?.chart}
                      onChange={(obj: any) => {
                        const { items } = obj
                        onChange(items)
                      }}
                      ownColor={false}
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
                </>
              )}
              <div className="profit_header">
                <div className="wrap">
                  <span className="left_side">日期</span>
                  <span className="center_side">万分收益</span>
                  <span className="right_side">七日年化</span>
                </div>
              </div>
              {(chartData?.chart ?? [])
                .reverse()
                .slice(0, 10)
                .map(
                  (item: { date: string; daily_return: number; value: number }, index: number) => {
                    return (
                      <div className="profit_list">
                        <div className="list_wrap">
                          <span className="left_side">{item.date}</span>
                          <span className="center_side">{item.daily_return}</span>
                          <span
                            className="right_side"
                            style={{
                              color: decorationColor((item.value * 100).toFixed(2))
                            }}
                          >
                            {(item.value * 100).toFixed(2) + '%'}
                          </span>
                        </div>
                      </div>
                    )
                  }
                )}
              <div className="search_more">
                <div className="wrap">
                  <span className="search">查看历史万分收益</span>
                  <RightOutline color="545968" />
                </div>
              </div>
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
              <DefaultGraph title="数据暂时为空" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default SevenDayAnnual
