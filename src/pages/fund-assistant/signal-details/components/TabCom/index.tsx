/* eslint-disable jsx-quotes */
import ActivityIndicator from '@/components/ActivityIndicator'
import DefaultGraph from '@/components/DefaultGraph'
import { level_color_3 } from '@/config'
import { baseAreaChart, ChartTagsType, LineChartDataType } from '@/utils/chartOption'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Toast from '@/components/Toast'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import {
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'

import { CanvasRenderer } from 'echarts/renderers'

import './index.less'
import { valuationSignal } from './services'
import { genChartOption } from './utils/genChartOption'

echarts.use([
  GaugeChart,
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export interface HistoryType {
  daily_level: number // 1~5 档位
  ra_code: string // 基金代码
  ra_date: string // 日期
  history_text: string
}

const line_colors = ['#3370ff', '#4BA471', '#E74949']

interface IProps {
  index_id: 'SH' | 'SZ'
}

const TabCom: FC<IProps> = ({ index_id }) => {
  const chart = useRef<any>(null)
  const myChart = useRef<any>(null)

  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [chartLegend, setChartLegend] = useState<any>({})
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartLoading, setChartLoading] = useState<boolean>(false)
  const [, setChartTags] = useState<ChartTagsType>([])
  const [chartEmpty, setChartEmpty] = useState<boolean>(false) // 折线数据为空

  const [signalLevel, setSignalLevel] = useState<number>() // 估值档位(1 | 2 |3)
  const [tabChartTitle, setTabChartTitle] = useState<string>() // tab下折线图title
  const [slideTitle, setSlideTitle] = useState<string>() // 折线图顶部显示
  const [chartName, setchartName] = useState<string[]>() // 折线图legend
  const [period, setPeriod] = useState<string>('y1')
  const [chartTime, setChartTime] = useState<any>([])
  const getHistoryFund = async () => {
    setChartLoading(true)
    try {
      const res = await valuationSignal({
        index_id,
        period
      })
      let _list = res.chart.list || []
      // setTimeout(() => {
      setChartLoading(false)
      setChartTime(res?.chartTime)
      setChartTags(res?.highlight || [])
      setSignalLevel(
        res?.indexInfo?.signal_level ? parseInt(res?.indexInfo?.signal_level) : undefined
      )
      setTabChartTitle(res?.indexInfo?.title)
      setChartLineData(_list)
      setSlideTitle(res?.chart?.signal_name)
      setchartName(res?.chart?.chart_name || [])
      if (_list?.length > 0) {
        setChartEmpty(false)
        let _chartLegendTime = _list[_list?.length - 1].date
        let _chartLegend: any = {}
        setChartLegendTime(_chartLegendTime)
        _list.map((item: any) => {
          if (item.signal_level && item.date === _chartLegendTime) {
            _chartLegend[item.type] = item.signal_level
          }
        })
        setChartLegend(_chartLegend)
      } else {
        setChartEmpty(true)
      }
      // }, 400)
    } catch (error) {
      setChartEmpty(true)
      setChartLoading(false)
    }

    Toast.hide()
  }

  // 图表滑动legend变化
  const onChartChange = useCallback(
    ({ obj }: { obj: any }) => {
      setChartLegendTime(obj.items[0].origin.date)
      let _chartLegend: any = {}
      if (obj.items.length > 0) {
        obj.items.map((item: any) => {
          if (item.origin.signal_level) {
            _chartLegend[item.name] = item.origin.signal_level
          }
        })
      }
      setChartLegend(_chartLegend)
    },
    [chartLegend, chartLegendTime]
  )
  // 图表滑动结束
  const onHide = useCallback(() => {
    if (chartLineData?.length > 0) {
      let _chartLegendTime = chartLineData[chartLineData?.length - 1].date
      let _chartLegend: any = {}
      setChartLegendTime(_chartLegendTime)
      chartLineData.map((item: any) => {
        if (item.signal_level && item.date === _chartLegendTime) {
          _chartLegend[item.type] = item.signal_level
        }
      })
      setChartLegend(_chartLegend)
    }
  }, [chartLineData])

  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      baseAreaChart({
        id: `${index_id}-historicalNewsLineChart`,
        data: chartLineData,
        areaColors: ['l(90) 0:#3370ff 1:#f7f7f7', 'transparent', 'transparent'],
        colors: ['#3370ff', '#4BA471', '#E74949'],
        showArea: true,
        onChange: onChartChange,
        onHide: onHide,
        legend: false
      })
    }
  }, [chartLineData])

  useEffect(() => {
    getHistoryFund()
  }, [period])

  useEffect(() => {
    if (signalLevel) {
      if (chart.current) {
        if (!myChart.current) {
          myChart.current = echarts.init(chart.current)
        } else {
          myChart.current?.clear?.()
        }
        let option = genChartOption(signalLevel)
        myChart.current.setOption(option)
      }
    }
  }, [signalLevel])

  return (
    <div className="tab-com-container">
      <div className="dashboard-chart-container">
        {chartLoading && !signalLevel ? (
          <div
            style={{
              width: '311px',
              height: '220px',
              margin: '0 auto',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator size="large" />
          </div>
        ) : (
          <div ref={chart} style={{ width: '311px', height: '220px', margin: '0 auto' }} />
        )}
      </div>
      {!chartEmpty ? (
        <div>
          <div className="card-container">
            <div className="content-card">
              {tabChartTitle ? <div className="card-title">{tabChartTitle}</div> : null}
              <div>
                <div className="chart-container">
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
                            <span
                              className="lengend-value"
                              style={{
                                color: level_color_3[chartLegend[item]].color
                              }}
                            >
                              {level_color_3[chartLegend[item]].text}
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
                            <div
                              style={{
                                width: '.16rem',
                                height: '.04rem',
                                background: '#3370ff',
                                marginRight: '.08rem'
                              }}
                            />
                            {/* <span className="lengend-key">{item}</span> */}
                            <span className="lengend-key">{slideTitle}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {chartLineData?.length > 0 && !chartLoading ? (
                    <div>
                      <div
                        style={{
                          width: '100%',
                          height: '4rem',
                          marginBottom: '.24rem',
                          marginTop: '.3rem',
                          position: 'relative',
                          userSelect: 'none'
                        }}
                      >
                        <canvas
                          id={`${index_id}-historicalNewsLineChart`}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                      <div className="legend-container">
                        {chartName?.map((item, index) => {
                          return (
                            <div key={index} className="legend">
                              <div
                                className="legend-point"
                                style={{
                                  background: line_colors[index]
                                }}
                              />
                              <div>{item}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}

                  {chartLoading ? (
                    <div
                      style={{
                        height: '3.1rem',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ActivityIndicator size="large" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="period-wrap">
            {chartTime.map((el: any, index: number) => {
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
          <div className="tips" style={{ color: '#9aa0b1', fontSize: '0.22rem' }}>
            *买卖点信号为魔方为平台用户提供的专属服务，魔方认为采取更科学的对公估值法，低估时多买，正常时少买，高估时卖出，以期获得长期收益。买卖点信号内容不构成基金宣传推介材料的任何部分，亦不构成任何投资建议。跟随买卖点信号购买不保证一定盈利，也不保证最低收益，投资者仍存在本金损失可能性。投资有风险，入市需谨慎。
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default TabCom
