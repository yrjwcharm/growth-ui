import { useState, useEffect, useCallback } from 'react'
import { usePageContext } from '../usePageContext'
import useQuery from '../useQuery'
import { baseAreaChart, ChartTagsType, LineChartDataType } from '@/utils/chartOption'
import { sendPoint } from '@/utils/sendPoint'
import { lowBuySignal } from '../services'
import DefaultGraph from '@/components/DefaultGraph'
import ChartLock from './ChartLock'
import '../index.less'
import Loading from '@/components/Loading'
export default function BuySingChart() {
  const query = useQuery()
  const { isLock, isToBuyCombo } = usePageContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [period, setPeriod] = useState<string>('y3')
  const [haschart, setHaschart] = useState<any>(null)
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartRect, setChartRect] = useState<
    { start_date: string; end_date: string; opacity: number; color: string }[]
  >([])
  const [chartTags, setChartTags] = useState<ChartTagsType>([])
  //净值图表
  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [chartLegend, setChartLegend] = useState<any>({})
  const [signalInfo, setSignalInfo] = useState<any>({})
  const [chartTime, setChartTime] = useState<any>([])
  const [chartEmpty, setChartEmpty] = useState<boolean>(false) // 折线数据为空
  useEffect(() => {
    if (query.fund_code) {
      init(query.uid, query.fund_code).then((r) => {})
    }
  }, [query.fund_code, period, isLock])

  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      const _hasChart = baseAreaChart({
        id: 'historicalNewsLineChart',
        data: chartLineData,
        tickCountY: 5,
        haschart,
        colors: ['#3370ff'], // 老版本 ['l(90) 0:#3370ff 1:#f7f7f7'],
        showArea: false,
        onChange: onChartChange,
        onHide: onHide,
        padding: [5, 10, 20, 30],
        rect: chartRect,
        tags: chartTags
      })
      setHaschart(_hasChart)
    }
  }, [chartLineData])

  const init = async (uid: string, fund_code: string) => {
    try {
      const res = await lowBuySignal({
        fund_code,
        period,
        page_source: query.is_cover == '1' ? 'subject' : ''
      })

      if (res?.chart) {
        let _list = res.chart.list ?? []
        let highlist = res.chart?.highlight ?? []
        setChartTime(res.chartTime)
        //买点 绿色
        const purchaseList = highlist.filter((el: { level: number }) => el.level == 1)
        //卖点 红色
        const sellList = highlist.filter((el: { level: number }) => el.level == 5)
        sellList.push({ date: _list[_list.length - 1]?.date ?? '' })
        highlist[0]?.level == 5 && purchaseList.unshift({ date: _list[0]?.date ?? '' })
        // 买入区域
        let arr = []
        for (let i = 0; i < purchaseList.length; i++) {
          let index = sellList.findIndex((el: { date: string }) => el.date > purchaseList[i].date)
          if (index != -1) {
            arr.push({
              start_date: purchaseList[i].date,
              end_date: sellList[index].date,
              opacity: 0.1,
              color: '#FF9393'
            })
          }
        }
        setChartRect(arr)
        setChartTags(highlist)
        setChartLineData(_list)
        if (_list?.length > 0) {
          setChartEmpty(false)
          let _chartLegendTime = _list[_list?.length - 1].date
          let _chartLegend: any = {},
            signal_info: any = {}
          setChartLegendTime(_chartLegendTime)
          _list.map((item: any) => {
            if (item.date === _chartLegendTime) {
              _chartLegend[item.type] = item.value
              signal_info['signal_info'] = item.signal_info
              signal_info['color'] = item.color
            }
          })
          setChartLegend(_chartLegend)
          setSignalInfo(signal_info)
        } else {
          setChartEmpty(true)
        }
      }
      setLoading(false)
    } catch (error) {
      setChartEmpty(true)
    }
  }

  // 图表滑动legend变化
  const onChartChange = useCallback(
    ({ obj }: { obj: any }) => {
      setChartLegendTime(obj.items[0].origin.date)
      let _chartLegend: any = {},
        signal_info: any = {}
      if (obj.items.length > 0) {
        obj.items.map((item: any) => {
          _chartLegend[item.name] = item.origin.value
          signal_info['signal_info'] = item.origin.signal_info
          signal_info['color'] = item.origin.color
        })
      }
      setChartLegend(_chartLegend)
      setSignalInfo(signal_info)
    },
    [chartLegend, chartLegendTime]
  )

  // 图表滑动结束
  const onHide = useCallback(() => {
    if (chartLineData?.length > 0) {
      let _chartLegendTime = chartLineData[chartLineData?.length - 1].date
      let _chartLegend: any = {},
        signal_info: any = {}
      setChartLegendTime(_chartLegendTime)
      chartLineData.map((item: any) => {
        if (item.date === _chartLegendTime) {
          _chartLegend[item.type] = item.value
          signal_info['signal_info'] = item.signal_info
          signal_info['color'] = item.color
        }
      })
      setChartLegend(_chartLegend)
      setSignalInfo(signal_info)
    }
  }, [chartLineData])
  return (
    <div
      className="card-container"
      style={{
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="content-card">
            <div>
              <div className="chart-container_wrap">
                <div className="chart-lengend">
                  {chartLegendTime ? (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <span className="lengend-value">{chartLegendTime}</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '.04rem'
                        }}
                      >
                        <span className="lengend-key">时间</span>
                      </div>
                    </div>
                  ) : null}
                  {Object.keys(chartLegend)?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          <span className="lengend-value">{chartLegend[item]}</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <div
                            style={{
                              width: '.16rem',
                              height: '.04rem',
                              background: '#3370ff',
                              position: 'relative',
                              top: '2px',
                              marginRight: '.08rem'
                            }}
                          />
                          <span className="lengend-key">{item}(复权)</span>
                        </div>
                      </div>
                    )
                  })}

                  {Object.keys(signalInfo).length > 0 && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                        onClick={() => {
                          sendPoint({
                            pageid: 'Underdetail',
                            // ts: ts_in_app,
                            ts: Date.now(),
                            event: `click2`,
                            app: 5001,
                            uid: query.uid,
                            chn: query.chn || 'mini_program', // 渠道：mini_program(默认)
                            did: query.did || null, // 渠道：mini_program(默认)
                            oid: query.fund_code
                          })
                          if (~signalInfo['signal_info'].indexOf('解锁')) {
                            // @ts-ignore
                            isToBuyCombo()
                          }
                        }}
                      >
                        <span
                          className="lengend-value"
                          style={{
                            color: signalInfo['color'],
                            fontWeight: 400,
                            fontSize: 13,
                            fontFamily: 'PingFangSC-Medium'
                          }}
                        >
                          {signalInfo['signal_info']}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '.04rem'
                        }}
                      >
                        <span className="lengend-key">买卖信号</span>
                      </div>
                    </div>
                  )}
                </div>

                {chartLineData?.length > 0 && (
                  <div
                    id="chartContainer"
                    style={{
                      width: '100%',
                      height: '3.1rem',
                      marginBottom: '.24rem',
                      marginTop: '.3rem',
                      position: 'relative'
                    }}
                  >
                    <canvas
                      id="historicalNewsLineChart"
                      style={{
                        height: '3.1rem',
                        width: '100%',
                        background: 'transparent',
                        position: 'absolute',
                        top: 0,
                        zIndex: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        margin: 'auto'
                      }}
                    />
                    {query.is_cover !== '1' && isLock && (
                      <ChartLock canvasId="historicalNewsLineChart" />
                    )}
                  </div>
                )}

                {chartLineData?.length > 0 && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="chart-tab-1">
                      <div
                        className="chart-tab-tag"
                        style={{
                          background: '#E74949'
                        }}
                      />
                      <div className="chart-tab-text">买点信号</div>
                    </div>
                    <div className="chart-tab-1">
                      <div
                        className="chart-tab-tag"
                        style={{
                          background: '#4BA471'
                        }}
                      />
                      <div className="chart-tab-text">卖点信号</div>
                    </div>
                    <div className="chart-tab-1">
                      <div
                        className="chart-tab-tag"
                        style={{
                          background: '#FF9393',
                          borderRadius: 0,
                          width: '7px',
                          height: '7px'
                        }}
                      />
                      <div className="chart-tab-text">买入区域</div>
                    </div>
                    <div className="chart-tab-1">
                      <div
                        className="chart-tab-tag chart_tab_tag"
                        style={{
                          background: '#fff',
                          width: '7px',
                          height: '7px'
                        }}
                      />
                      <div className="chart-tab-text">卖出区域</div>
                    </div>
                  </div>
                )}
                {chartEmpty ? (
                  <div
                    style={{
                      height: '3.1rem',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <DefaultGraph title="数据暂时为空" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {chartLineData.length > 0 && (
            <div className="period-wrap">
              {chartTime?.map((el: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setPeriod(el.value)
                    }}
                    className="period"
                    style={
                      period == el.value ? { background: '#dee8ff' } : { background: 'transparent' }
                    }
                  >
                    <span
                      className="period-text"
                      style={
                        period == el.value
                          ? { fontFamily: 'PingFangSC-Medium', color: '#0051cc' }
                          : {
                              fontFamily: 'PingFangSC-Regular',
                              color: '#545968'
                            }
                      }
                    >
                      {el.key}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
          {chartLineData.length > 0 && (
            <div className="tips">* 此提示不构成投资建议，需投资者自行承担投资风险。</div>
          )}
        </>
      )}
    </div>
  )
}
