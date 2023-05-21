import ActivityIndicator from '@/components/ActivityIndicator'
import DefaultGraph from '@/components/DefaultGraph'
import { baseAreaChart, LineChartDataType } from '@/utils/chartOption'
import getValueColor from '@/utils/getValueColor'
import { FC, useCallback, useEffect, useState } from 'react'
import { chartData } from '../../services'

import styles from './index.module.less'

const line_colors = ['#E74949', '#545968']

interface IProps {
  defaultLegendTime: string
  defaultLegend: string
  defaultLineData?: LineChartDataType[]
  defaultChartTime?: {
    key: string
    value: string
  }[]
  fund_code: string
  defaultCanvasId?: string
  defaultIndexDirection?: {
    direction: 1 | -1
    end_date: string
    start_date: string
  }[]
}

const riseColor = 'rgba(255, 0, 0, 0.15)' // 上涨阶段颜色
const fallColor = 'rgba(0, 152, 8, 0.15)' // 下跌阶段颜色

const LineChart: FC<IProps> = ({
  defaultLegendTime,
  defaultLegend,
  defaultLineData,
  defaultChartTime,
  fund_code,
  defaultCanvasId,
  defaultIndexDirection
}) => {
  const [chartLegendTime, setChartLegendTime] = useState<string>(defaultLegendTime || '')
  const [chartLegend, setChartLegend] = useState<any>(defaultLegend || {})
  const [chartLoading, setChartLoading] = useState<boolean>(true)
  const [chartEmpty, setChartEmpty] = useState<boolean>(false) // 折线数据为空
  const [haschart, setHaschart] = useState<any>(null)

  const [indexDirection, setIndexDirection] =
    useState<{ direction: 1 | -1; end_date: string; start_date: string }[]>()

  const [curPeriod, setCurPeriod] = useState<string>('y1') // 当前选中的时间
  const [chartTime, setChartTime] = useState<
    {
      key: string
      value: string
    }[]
  >([]) // 可选时间

  const [canvasId, setCanvasId] = useState<string>('lineChart')

  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>(defaultLineData || []) // 折线图数据

  useEffect(() => {
    setCanvasId(defaultCanvasId || 'lineChart')
  }, [defaultCanvasId])

  const getChartData = async (period: string) => {
    setChartLoading(true)
    try {
      const res = await chartData({
        fund_code,
        period: period
      })

      if (res?.chart && res?.chart.length > 0) {
        // setChartTags(res.chart.highlight)
        let _chartLegendTime = res?.chart[res?.chart?.length - 1].date
        let _chartLegend: any = {}
        setChartLegendTime(_chartLegendTime)
        res?.chart.map((item: any) => {
          if (item.date === _chartLegendTime) {
            _chartLegend[item.type] = item.value
          }
        })
        setChartLegend(_chartLegend)
        setChartTime(res.chartTime)

        if (defaultCanvasId === 'line2') {
          setIndexDirection(res.indexDirection)
        }
        setChartLineData(res?.chart)
      }
    } catch (error) {}
    setChartLoading(false)
  }
  useEffect(() => {
    setChartTime(defaultChartTime || [])
  }, [defaultChartTime])

  useEffect(() => {
    setChartLegendTime(defaultLegendTime || '')
  }, [defaultLegendTime])

  useEffect(() => {
    setChartLegend(defaultLegend || {})
  }, [defaultLegend])

  useEffect(() => {
    setIndexDirection(defaultIndexDirection || [])
  }, [defaultIndexDirection])

  useEffect(() => {
    if (defaultLineData) {
      setChartLoading(false)
      if (defaultLineData.length === 0) {
        setChartEmpty(true)
      } else {
        setChartEmpty(false)
      }
    } else {
      setChartLoading(true)
    }
  }, [defaultLineData])

  // 图表滑动legend变化
  const onChartChange = useCallback(
    ({ obj }: { obj: any }) => {
      setChartLegendTime(obj.items[0].origin.date)
      let _chartLegend: any = {}
      if (obj.items.length > 0) {
        obj.items.map((item: any) => {
          _chartLegend[item.name] = item.origin.value
        })
      }
      setChartLegend(_chartLegend)
    },
    [chartLegend, chartLegendTime]
  )

  useEffect(() => {
    if (defaultLineData) {
      setChartLineData(defaultLineData)
    }
  }, [defaultLineData])

  // 图表滑动结束
  const onHide = useCallback(() => {
    if (chartLineData?.length > 0) {
      let _chartLegendTime = chartLineData[chartLineData?.length - 1].date
      let _chartLegend: any = {}
      setChartLegendTime(_chartLegendTime)
      chartLineData.map((item: any) => {
        if (item.date === _chartLegendTime) {
          _chartLegend[item.type] = item.value
        }
      })
      setChartLegend(_chartLegend)
    }
  }, [chartLineData])

  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      let _rect: any = null
      if (indexDirection && indexDirection.length > 0) {
        _rect = indexDirection?.reduce(
          (
            pre: {
              color: string
              end_date: string
              start_date: string
            }[],
            cur
          ) => {
            return [
              ...pre,
              {
                color: cur.direction == 1 ? '#ff0000' : '#009808',
                end_date: cur.end_date,
                start_date: cur.start_date
              }
            ]
          },
          []
        )
      }
      let _haschart = baseAreaChart({
        id: canvasId,
        data: chartLineData,
        // colors: ['l(90) 0:#E74949 1:#f7f7f7', 'l(90) 0:#545968 1:#f7f7f7'],
        colors: line_colors,
        showArea: defaultCanvasId === 'line2' ? false : true,
        onChange: onChartChange,
        onHide: onHide,
        percent: true,
        yunit: '%',
        haschart: haschart,
        rect: _rect
      })

      setHaschart(_haschart)
    }
  }, [chartLineData, indexDirection])

  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      {!chartEmpty ? (
        <div className={styles['line-chart-container']}>
          <div
            style={{
              minHeight: '3.1rem'
            }}
          >
            <div className={styles['chart-lengend']}>
              {chartLegendTime ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <span className={styles['lengend-value']}>{chartLegendTime}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '.04rem'
                    }}
                  >
                    <span className={styles['lengend-key']}>时间</span>
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
                        className={styles['lengend-value']}
                        style={{
                          color: getValueColor((chartLegend[item] * 100).toFixed(2) + '%')
                        }}
                      >
                        {(chartLegend[item] * 100).toFixed(2) + '%'}
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
                          marginRight: '.08rem',
                          background: line_colors[index]
                        }}
                      />
                      <span className={styles['lengend-key']}>{item}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              style={{
                width: '100%',
                height: '3.1rem',
                marginBottom: '.24rem',
                marginTop: '.3rem',
                position: 'relative',
                userSelect: 'none'
              }}
            >
              <canvas
                id={canvasId}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            </div>

            {chartLineData?.length > 0 && indexDirection && indexDirection?.length > 0 ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className={styles['chart-tab']}>
                  <div
                    className={styles['chart-tab-tag']}
                    style={{
                      background: fallColor
                    }}
                  />
                  <div className={styles['chart-tab-text']}>下跌阶段</div>
                </div>
                <div className={styles['chart-tab']}>
                  <div
                    className={styles['chart-tab-tag']}
                    style={{
                      background: riseColor
                    }}
                  />
                  <div className={styles['chart-tab-text']}>上涨阶段</div>
                </div>
              </div>
            ) : null}
          </div>
          <div className={styles['time-container']}>
            {chartTime?.map((item) => {
              return (
                <div
                  key={item.value}
                  className={`${styles['time-button']} ${
                    item.value === curPeriod ? styles.active : ''
                  }`}
                  onClick={() => {
                    console.log('hhhh')
                    if (!chartLoading) {
                      setCurPeriod(item.value)
                      getChartData(item.value)
                    }
                  }}
                >
                  {item.key}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

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
      {chartLoading ? (
        <div
          style={{
            width: '100%',
            height: '3.1rem',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0
          }}
        >
          <ActivityIndicator size="large" />
        </div>
      ) : null}
    </div>
  )
}

export default LineChart
