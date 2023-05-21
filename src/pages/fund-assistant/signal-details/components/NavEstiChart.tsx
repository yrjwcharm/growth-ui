/*
 * @Date: 2023/2/17 15:00
 * @Author: yanruifeng
 * @Description:净值估算
 */
import './NavEsti.less'
import { baseAreaChart, LineChartDataType } from '@/utils/chartOption'
import { useEffect, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { callEstiNavApi } from '@/pages/fund-assistant/signal-details/services'
import useQuery from '@/pages/fund-assistant/signal-details/useQuery'
import DefaultGraph from '@/components/DefaultGraph'
import Loading from '@/components/Loading'
const NavEstiChart = ({
  gain,
  nav,
  esti_date
}: {
  gain: string
  nav: string
  esti_date: string
}) => {
  const { uid, fund_code } = useQuery()
  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartLegend, setChartLegend] = useState<
    {
      id: number
      value: string
      label: string
      nav?: string
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    loadData()
  }, [fund_code, gain])

  const loadData = async () => {
    if (fund_code) {
      const res = await callEstiNavApi({
        uid,
        fund_code
      })
      const chartData = res?.list?.chart ?? []
      chartData.length > 0 ? setIsEmpty(false) : setIsEmpty(true)
      let chart_data = chartData
        .map((el: { date: string | number }) => {
          return { ...el, date: dayjs(+el.date * 1000).format('YYYY-MM-DD HH:mm') }
        })
        .filter(
          (el: { date: string | number | Date | dayjs.Dayjs | null | undefined }) =>
            dayjs(el.date).format('HH:mm') <= '15:00'
        )

      setChartLegend([
        {
          value: dayjs(chart_data[chart_data.length - 1]?.date).format('YYYY-MM-DD'),
          id: 0,
          label: '日期'
        },
        { value: chart_data[chart_data.length - 1]?.nav ?? nav, id: 1, label: '估算净值' },
        {
          value: chart_data[chart_data.length - 1]?.value ?? +gain?.replace(/%/g, '') / 100,
          id: 2,
          label: '估算涨幅'
        }
      ])
      setLoading(false)
      setChartLineData([...chart_data])
    }
  }
  // 图表滑动legend变化
  /**
   * 初始化数据
   */
  const onChartChange = useCallback(
    ({ obj }: { obj: any }) => {
      setChartLegendTime(dayjs(obj.items[0].origin?.date).format('YYYY-MM-DD'))
      let _chartLegend: {
        id: number
        value: string
        label: string
        nav?: string
      }[] = []
      if (obj.items.length > 0) {
        obj.items.map((item: any) => {
          _chartLegend = [
            { value: dayjs(item.origin?.date).format('YYYY-MM-DD'), id: 0, label: '日期' },
            { value: item.origin?.nav ?? nav, id: 1, label: '估算净值' },
            {
              value: item.origin?.value ?? +gain?.replace(/%/g, '') / 100,
              id: 2,
              label: '估算涨幅'
            }
          ]
        })
      }
      setChartLegend(_chartLegend)
    },
    [chartLegendTime]
  )

  // 图表滑动结束
  const onHide = useCallback(() => {
    if (chartLineData?.length > 0) {
      let _chartLegendTime = chartLineData[chartLineData?.length - 1]?.date
      setChartLegendTime(dayjs(_chartLegendTime).format('YYYY-MM-DD'))
      let _chartLegend: {
        id: number
        value: string
        label: string
        nav?: string
      }[] = []
      chartLineData.map((item: any) => {
        if (item.date === _chartLegendTime) {
          _chartLegend = [
            { value: dayjs(item.date).format('YYYY-MM-DD'), id: 0, label: '日期' },
            { value: item.nav ?? nav, id: 1, label: '估算净值' },
            { value: item.value ?? +gain?.replace(/%/g, '') / 100, id: 2, label: '估算涨幅' }
          ]
        }
      })
      setChartLegend(_chartLegend)
    }
  }, [chartLineData]) // 图表滑动legend变化
  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      baseAreaChart({
        id: 'historicalNewsLineChart',
        data: chartLineData,
        percent: true,
        tickCountX: 3,
        yunit: '%',
        colors: ['#3370ff'], // 老版本 ['l(90) 0:#3370ff 1:#f7f7f7'],
        showArea: false,
        onChange: onChartChange,
        onHide: onHide,
        padding: [5, 20, 20, 60],
        isTimeDivision: true
      })
    }
  }, [chartLineData])

  return (
    <div className="nav_esti_box">
      {loading ? (
        <Loading />
      ) : (
        <>
          {!isEmpty ? (
            <>
              {chartLineData?.length > 0 && (
                <div className="nav_esti_header">
                  {chartLegend.map((el, index) => {
                    return (
                      <div key={el.id} className="list_item_nav">
                        <span
                          className="value"
                          style={{
                            color:
                              el.id == 2
                                ? +el.value > 0
                                  ? '#E74949'
                                  : +el.value < 0
                                  ? '#4ba471'
                                  : '#121d3a'
                                : ''
                          }}
                        >
                          {el.id == 2 ? (+el.value * 100).toFixed(2) + '%' : el.value}
                        </span>
                        <span className="label">{el.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            <DefaultGraph title="暂无估值" />
          )}
          {chartLineData?.length > 0 && (
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
                id="historicalNewsLineChart"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  position: 'absolute',
                  top: 0,
                  right: 5
                }}
              />
            </div>
          )}
          {chartLineData?.length > 0 && (
            <div className="tips">*估值仅供参考，实际涨跌幅以基金公司为准</div>
          )}
        </>
      )}
    </div>
  )
}

export default NavEstiChart
