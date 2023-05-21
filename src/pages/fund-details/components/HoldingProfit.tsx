import './HoldProfit.less'
import { useEffect, useRef, useState } from 'react'
import BaseAreaChart from '@/components/Chart/BaseAreaChart'
import { cloneDeep } from 'lodash'
import { decorationColor } from '@/utils/common'
import DefaultGraph from '@/components/DefaultGraph'
import Loading from '@/components/Loading'
import { callHoldProfitChartApi } from '@/pages/fund-details/services'

const HoldingProfit = ({ fund_code, uid }: { fund_code: string; uid: string }) => {
  const [timePeriod, setTimePeriod] = useState<string>('y1')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState<any>([])
  const [[, leftSide, centerSide], setChartLabel] = useState<{ key: string; val: string }[]>([])
  const chartLabelDefaultRef = useRef({})
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
      const res = await callHoldProfitChartApi({
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
        <div className="fund_details_hold_profit_box">
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

                  {/*持有收益走势图表*/}
                  <div className="acc_profit_chart" style={{ marginTop: '16px' }}>
                    <BaseAreaChart
                      id="perf"
                      // areaColors={['l(90) 0:#E74949 1:#fff', 'transparent', '#50D88A']}
                      // colors={['#545968', '#E74949', '#FFAF00']}
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
                      percent={false}
                      showArea={false}
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
export default HoldingProfit
