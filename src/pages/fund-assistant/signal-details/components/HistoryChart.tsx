import { useState, useEffect, useRef } from 'react'
import { Dialog, SpinLoading } from 'antd-mobile'
import { cloneDeep } from 'lodash'
import { sendPoint } from '@/utils/sendPoint'
// @ts-ignore
import { BaseAreaChart } from '@/components/Chart'
import styles from '@/pages/fixed-plan-detail/index.module.less'
import '../index.less'
import { usePageContext } from '../usePageContext'
import ask from '@/assets/images/ask_symbol.png'
// import ChartLock from './ChartLock'
// import useQuery from '@/pages/fund-assistant/signal-details/useQuery'

const showQustion = () => {
  Dialog.show({
    title: '提示',
    closeOnMaskClick: true,
    content:
      '本策略历史累积收益为模拟本基金使用买卖点信号而得出的模拟业绩，即买卖点信号工具在本基金上的模拟应用展示，并非本基金的历史业绩，不构成本基金宣传推介材料的一部分，亦不构成对本基金收益的承诺及保障。投资有风险，入市需谨慎。',
    closeOnAction: true,
    actions: [
      [
        {
          key: 'confirm',
          text: '确定',
          bold: true,
          style: { color: '#0051cc' }
        }
      ]
    ]
  })
}
export default function HistoryChart(props: { timePeriod: any; setTimePeriod: any }) {
  // const { is_cover } = useQuery()
  const { timePeriod, setTimePeriod } = props
  const { historyInfo } = usePageContext()

  const { isToBuyCombo } = usePageContext()
  const [chartData, setChartData] = useState<any>([])
  const [chartLabel, setChartLabel] = useState<any>([])

  const chartLabelDefaultRef = useRef({})

  useEffect(() => {
    setChartData(historyInfo?.chart_list)
    setChartLabel(historyInfo?.chart_list?.label ?? [])
    chartLabelDefaultRef.current = historyInfo?.chart_list?.label ?? []
  }, [historyInfo])

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

  return (
    <div className="history-card">
      <div className="history_compare_warp">
        <div className="itemWrap">
          <span className="value">{historyInfo?.fund_total_yield?.yield}</span>
          <div className="fund_wrap">
            <span className="name">{historyInfo?.fund_total_yield?.yield_name}</span>
            <img
              src={ask}
              className="ask"
              onClick={() => {
                Dialog.show({
                  title: '',
                  closeOnMaskClick: true,
                  content: '自买卖点信号首次出现后历史业绩',
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'confirm',
                        text: '知道了',
                        bold: true,
                        style: { color: '#0051cc' }
                      }
                    ]
                  ]
                })
              }}
              alt=""
            />
          </div>
        </div>
        <div className="itemWrap">
          <span className="value">{historyInfo?.signal_total_yield?.yield}</span>
          <div className="nameWrap">
            <span className="name">{historyInfo?.signal_total_yield?.yield_name}</span>
            <img
              src={ask}
              alt=""
              style={{ width: '16px', marginLeft: '2px' }}
              onClick={showQustion}
            />
          </div>
        </div>
      </div>

      <div className={styles.areaChartWrap}>
        <div
          className="area_chart_label"
          style={{
            padding: '16px 16px 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {chartLabel?.map?.((item: any, idx: number) => (
            <div
              className={styles.labelItemWrap}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              key={item + '' + idx}
              onClick={() => {
                sendPoint({
                  pageid: 'Underdetail',
                  // ts: ts_in_app,
                  ts: Date.now(),
                  event: `click2`
                })
                if (~item.val.indexOf('解锁')) {
                  isToBuyCombo?.()
                }
              }}
            >
              <div
                className={styles.labelItemTop}
                style={{
                  color:
                    item.val?.replace(/%/g, '') > 0
                      ? '#e74949'
                      : item.val?.replace(/%/g, '') < 0
                      ? '#4BA471'
                      : '#121D3A'
                }}
              >
                {item.val}
              </div>
              <div
                className={styles.labelItemBottom}
                style={{
                  fontSize: '11px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {idx > 0 && (
                  <div
                    style={{
                      width: '8px',
                      height: '2px',
                      marginRight: '4px',
                      backgroundColor: ['#545968', '#E74949', '#FFAF00'][idx - 1]
                    }}
                    className={styles.labelKeyRect}
                  />
                )}
                <div>{item.key}</div>
              </div>
            </div>
          ))}
        </div>
        {chartData?.chart?.length > 0 ? (
          <div className="hisotryChartWrap" style={{ marginTop: '10px' }}>
            <BaseAreaChart
              areaColors={['l(90) 0:#E74949 1:#fff', 'transparent', '#50D88A']}
              colors={['#545968', '#E74949', '#FFAF00']}
              data={chartData?.chart}
              onChange={(obj: any) => {
                const { items } = obj
                onChange(items)
              }}
              ownColor={false}
              onHide={() => {
                // @ts-ignore
                setChartLabel(chartLabelDefaultRef.current)
              }}
              padding={[5, 20, 20, 50]}
              percent={true}
              showArea={false}
              showDate={true}
              tofixed={2}
            />
            {/* {is_cover !== '1' && isLock && <ChartLock canvasId="BaseAreaChart" />} */}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1.3rem',
              paddingBottom: '1.6rem'
            }}
          >
            <SpinLoading color="#0051cc" style={{ '--size': '24px' }} />
          </div>
        )}
      </div>
      {chartData?.chart?.length > 0 && (
        <div className="period-wrap">
          {chartData?.sub_tabs?.map((el: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setTimePeriod(el.val)
                }}
                className="period"
                style={
                  timePeriod == el.val ? { background: '#dee8ff' } : { background: 'transparent' }
                }
              >
                <span
                  className="period-text"
                  style={
                    timePeriod == el.val
                      ? { fontFamily: 'PingFangSC-Medium', color: '#0051cc' }
                      : {
                          fontFamily: 'PingFangSC-Regular',
                          color: '#545968'
                        }
                  }
                >
                  {el.name}
                </span>
              </div>
            )
          })}
        </div>
      )}
      {chartData?.chart?.length > 0 && (
        <div className="tips">
          *买卖信号策略曲线为模拟本基金使用买卖点信号而得出的模拟业绩，
          即买卖点信号工具在本基金上的模拟应用展示，并非本基金的历史业绩，
          不构成本基金宣传推介材料的一部分，亦不构成对本基金收益的承诺及保障。
        </div>
      )}
    </div>
  )
}
