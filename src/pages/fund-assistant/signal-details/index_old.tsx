import './index.less'
// @ts-ignore
import { BaseAreaChart } from '@/components/Chart'
import { useCallback, useEffect, useRef, useState } from 'react'
import { setTitle } from '@/utils/setTitle'
import debounce, { setLocalToken } from '@/utils'
import { history } from 'umi'
import {
  callComboInfoInterfaceApi,
  callFundUnlockInterfaceApi,
  getTimeCurveApi,
  lowBuySignal
} from './services'
import DefaultGraph from '@/components/DefaultGraph'
import Dialog from '@/components/Dialog'
import { Dialog as AlertDialog, Popup } from 'antd-mobile'
import { sendPoint } from '@/utils/sendPoint'
import { baseAreaChart, ChartTagsType, LineChartDataType } from '@/utils/chartOption'
import TabCom from './components/TabCom'
import { SpinLoading, Toast } from 'antd-mobile'

import CompareBar from './components/CompareBar'
import styles from '@/pages/fixed-plan-detail/index.module.less'
import ask from '@/assets/images/ask_symbol.png'
import ShareGuideBtn from './components/ShareGuideBtn'
interface InfoType {
  fund_name: string // 基金名称
  fund_code: string // 基金代码
  ra_date: string
  tags: string[] // 标签
  daily_estimate: string // 日估值
  month_estimate: string // 月估值
  daily_level: 1 | 2 | 3 | 4 | 5 // 日档位
  month_level: number // 月档位
  info_text: string // 提示语
  sug_title: string // 标题
}

const pageid: string = 'Underdetail'
let ts_in: number = 0
import { cloneDeep } from 'lodash'
import buy from '@/assets/images/buy.png'
import buyArea from '@/assets/images/buy_area.png'
import seal from '@/assets/images/seal.png'
import sealArea from '@/assets/images/seal_area.png'
import signalMask1 from '@/assets/images/sign-detail/lock_mask_today.png'
import signalMask2 from '@/assets/images/sign-detail/lock_mask_chart.png'
import signalMaskHistory from '@/assets/images/sign-detail/lock_mask_history.png'

import arrow from '@/assets/images/arrow.png'
import close from '@/assets/images/close.png'
import forward from '@/assets/images/forward.png'
import Empty from './components/Empty'
import Download from './components/Download'
import ProductCard from './components/ProductCard'
type fundTotalYieldType = {
  yield: string
  yield_name: string
  profit: number
}
type signalTotalYieldType = {
  yield: string
  yield_name: string
  profit: number
}

type ProfitType = {
  color: string
  profit: string
}

interface Ifund_profit_info {
  excess_profit: ProfitType
  fund_profit: ProfitType
}

export default function SignalDetails() {
  const query = history.location.query as {
    token: string
    uid: string
    isFree: string
    fund_code: string
    chn: string
    did: string
    is_cover?: string
  }
  const [info, setInfo] = useState<InfoType>()
  const [empty, setEmpty] = useState<boolean>(false) // 页面是否为空
  const [modalContent, setModalContent] = useState<string>('') // 说明文案
  const [haschart, setHaschart] = useState<any>(null)
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  //净值图表
  const [isLock, setIsLock] = useState<boolean>(false)
  const [comboList, setComboList] = useState([])
  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [chartLegend, setChartLegend] = useState<any>({})
  const [signalInfo, setSignalInfo] = useState<any>({})
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartTags, setChartTags] = useState<ChartTagsType>([])
  const [chartEmpty, setChartEmpty] = useState<boolean>(false) // 折线数据为空
  const [period, setPeriod] = useState<string>('y1')
  const [timePeriod, setTimePeriod] = useState<string>('all')
  const chartLabelDefaultRef = useRef({})
  const [chartData, setChartData] = useState<any>([])
  const [chartLabel, setChartLabel] = useState<any>([])
  const [chartTime, setChartTime] = useState<any>([])
  const [chartRect, setChartRect] = useState<
    { start_date: string; end_date: string; opacity: number; color: string }[]
  >([])

  const [fund_total_yield, setFundTotalYield] = useState<fundTotalYieldType>({
    yield: '',
    yield_name: '',
    profit: 0
  })
  const [signal_total_yield, setSignalTotalYield] = useState<signalTotalYieldType>({
    yield: '',
    yield_name: '',
    profit: 0
  })
  // 基金收益比较
  const [, setFund_profit_info] = useState<Ifund_profit_info>()
  const [visible, setVisible] = useState<boolean>(false)

  const init = async (uid: string, fund_code: string) => {
    try {
      const res = await lowBuySignal({
        fund_code,
        period,
        page_source: query?.is_cover == '1' ? 'subject' : ''
      })

      setIsLock(res['is_lock'])
      if (res?.fundInfo) {
        setEmpty(false)
        setInfo(res.fundInfo)
      } else {
        setEmpty(true)
      }
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
        let arr = []
        for (let i = 0; i < purchaseList.length; i++) {
          let index = sellList.findIndex((el: { date: string }) => el.date > purchaseList[i].date)
          if (index != -1) {
            arr.push({
              start_date: purchaseList[i].date,
              end_date: sellList[index].date,
              opacity: 0.1,
              color: '#91E47E'
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
        // }, 400)
      }
    } catch (error) {
      setChartEmpty(true)
    }
  }
  useEffect(() => {
    ;(async () => {
      const res = await getTimeCurveApi({
        fund_code: query.fund_code,
        period: timePeriod
      })
      console.log('res?.fund_profit_info: ', res?.fund_profit_info)
      setChartData(res?.chart_list)
      setChartLabel(res?.chart_list?.label ?? [])
      setFundTotalYield(res?.fund_total_yield ?? {})
      setSignalTotalYield(res?.signal_total_yield ?? {})
      setFund_profit_info(res?.fund_profit_info ?? {})
      chartLabelDefaultRef.current = res?.chart_list?.label ?? []
    })()
  }, [timePeriod])
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
    setTitle('买卖点信号详情')
    setLocalToken(query.token)

    init(query.uid, query.fund_code)

    ts_in = Date.now()
    sendPoint({
      app: 5001,
      uid: query.uid,
      chn: query.chn || 'mini_program', // 渠道：mini_program(默认)
      did: query.did || null, // 渠道：mini_program(默认)
      pageid: pageid,
      ts: ts_in,
      oid: query.fund_code,
      event: 'load'
    })
  }, [period])

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
  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      const canvas = document.getElementById('historicalNewsLineChart')
      const container = document.getElementById('chartContainer')
      const _hasChart = baseAreaChart({
        id: 'historicalNewsLineChart',
        data: chartLineData,
        // min: 0,
        tickCountY: 5,
        haschart,
        colors: ['l(90) 0:#3370ff 1:#f7f7f7'],
        showArea: false,
        onChange: onChartChange,
        onHide: onHide,
        rect: chartRect,
        tags: chartTags
      })
      setHaschart(_hasChart)
      setCanvasWidth(canvas?.offsetWidth ?? 0)
      setContainerHeight(container?.offsetHeight ?? 0)
    }
  }, [chartLineData])

  const searchComboDetail = (el: {
    combo_name: string
    combo_use_time_key:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    combo_use_time_val:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    can_unlock_num_key:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    can_unlock_num_val:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    can_unlock_time_key:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    can_unlock_time_val:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  }) => {
    AlertDialog.show({
      title: `${el.combo_name}详情`,
      closeOnMaskClick: true,
      content: (
        <>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#545968', fontSize: 12 }}>{el.combo_use_time_key}</span>
            <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
              {el.combo_use_time_val}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#545968', fontSize: 12 }}>{el.can_unlock_num_key}</span>
            <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
              {el.can_unlock_num_val}
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#545968', fontSize: 12 }}>{el.can_unlock_time_key}</span>
            <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
              {el.can_unlock_time_val}
            </span>
          </div>
        </>
      ),
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
  }
  const selCombo = (el: any) => {
    comboList.map((item: any) => {
      item.isActive = false
      if (JSON.stringify(el) === JSON.stringify(item)) {
        item.isActive = true
      }
    })
    setComboList([...comboList])
  }
  const unLock = async (el: { fund_code: string; unlock_re_id: string; combo_id: string }) => {
    Toast.show({
      content: '请稍等...',
      maskClickable: false,
      icon: 'loading'
    })
    const res = await callFundUnlockInterfaceApi({
      fund_code: query.fund_code,
      unlock_re_id: el.unlock_re_id,
      combo_id: el.combo_id,
      uid: query.uid
    })
    Toast.clear()
    res && // 是否确认取消订阅此定投方案，取消后将无法再接收到买卖提醒消息？
      AlertDialog.show({
        title: '买卖信号已解锁',
        closeOnMaskClick: true,
        content: '',
        closeOnAction: true,
        actions: [
          [
            {
              key: 'confirm',
              text: '知道了',
              bold: true,
              style: { color: '#0051cc' },
              onClick: async () => {
                setVisible(false)
                init(query.uid, query.fund_code)
              }
            }
          ]
        ]
      })
  }
  const jumpToOfficialAccount = (): any => {
    ;(window as any).wx.miniProgram.navigateTo({
      url: '/pages/official-account/index'
    })
  }
  const isToBuyCombo = async () => {
    Toast.show({
      content: '请稍等...',
      icon: 'loading',
      maskClickable: false
    })
    const res = await callComboInfoInterfaceApi()
    let list = (res.list ?? []).map((el: any, index: number) => {
      return { ...el, isActive: index == 0 }
    })
    setComboList(list)
    Toast.clear()
    Array.isArray(list) && list.length > 0
      ? setVisible(true)
      : (window as any).wx.miniProgram.navigateTo({
          url: `/pages/member-buy/pay?withFound=true&fund_code=${query.fund_code}`
        })
  }

  if (empty) {
    return <Empty />
  }
  // @ts-ignore
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
      className="signal_container"
    >
      <Download />
      <div className="signal-details">
        <ProductCard />
        <div className="describe-section">
          <div className="upgrade">
            <span>算法升级</span>
          </div>
          <div className="top-header">
            <div className="top-wrap">
              <div className="nav" />
              <span className="signal">买卖点择时信号</span>
              <span className="layout">助力低点布局、高点止盈</span>
            </div>
          </div>
          <div className="describe-wrap">
            <img
              src={
                info?.daily_level == 1
                  ? buy
                  : info?.daily_level == 2
                  ? buyArea
                  : info?.daily_level == 4
                  ? sealArea
                  : info?.daily_level == 5
                  ? seal
                  : ''
              }
              className="signal-reverse"
              alt=""
            />
            {isLock && (
              <img
                src={signalMask1}
                onClick={async () => {
                  sendPoint({
                    pageid: 'Underdetail',
                    // ts: ts_in_app,
                    ts: Date.now(),
                    event: `click1`
                  })
                  isToBuyCombo()
                }}
                className="signal_mask"
                alt=""
              />
            )}
          </div>
          <div
            onClick={debounce(jumpToOfficialAccount)}
            className="official_account"
            style={{ background: '#F1F6FF' }}
          >
            <div className="wrap">
              <span className="left">关注理财魔方公众号,获取每日买卖信号信息推送</span>
              <div className="right">
                <img alt="" src={arrow} width={10} />
              </div>
            </div>
          </div>
          <div className="card-container">
            <div className="content-card">
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
                            <span className="lengend-value">{chartLegend[item]}</span>
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
                            <span className="lengend-key">{item}</span>
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
                              event: `click2`
                            })
                            if (~signalInfo['signal_info'].indexOf('解锁')) {
                              isToBuyCombo()
                            }
                          }}
                        >
                          <span
                            className="lengend-value"
                            style={{
                              color: signalInfo['color'],
                              fontWeight: 400,
                              fontSize: 14,
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
                      {isLock && (
                        <img
                          src={signalMask2}
                          style={{
                            position: 'absolute',
                            right: 6,
                            bottom: 22.5,
                            width: canvasWidth * (1 / 3) - 20,
                            // width: canvasWidth * (1 / 3),
                            background: '#fff',
                            zIndex: 2,
                            height: containerHeight * 0.806451612
                          }}
                          onClick={() => {
                            sendPoint({
                              pageid: 'Underdetail',
                              // ts: ts_in_app,
                              ts: Date.now(),
                              event: `click3`
                            })
                            isToBuyCombo()
                          }}
                          alt=""
                        />
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
                            background: '#4BA471'
                          }}
                        />
                        <div className="chart-tab-text">买点信号</div>
                      </div>
                      <div className="chart-tab-1">
                        <div
                          className="chart-tab-tag"
                          style={{
                            background: '#E74949'
                          }}
                        />
                        <div className="chart-tab-text">卖点信号</div>
                      </div>
                      <div className="chart-tab-1">
                        <div
                          className="chart-tab-tag"
                          style={{
                            background: 'rgba(145,228,126,0.3)',
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
                        period == el.value
                          ? { background: '#dee8ff' }
                          : { background: 'transparent' }
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
            {/*市场上涨环境表现回顾*/}
            <div className="top-header" style={{ marginTop: '18px' }}>
              <div className="top-wrap">
                <div className="nav" style={{ marginLeft: 0 }} />
                <span className="signal">历史累计收益率</span>
              </div>
            </div>
            <div
              className="history_compare_warp"
              style={{
                display: 'flex',
                background: '#f5f6f8',
                borderRadius: '6px',
                paddingTop: '12px',
                paddingLeft: '12px',
                paddingBottom: '12px',
                marginTop: '16px',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div className="history_compare_item">
                <div className="nameWrap">
                  <span className="name">{fund_total_yield?.yield_name}</span>
                </div>
                <div className="barWrap">
                  <CompareBar value={fund_total_yield?.profit} other={signal_total_yield?.profit} />
                </div>
              </div>
              <div className="history_compare_item">
                <div className="nameWrap">
                  <span>{signal_total_yield?.yield_name}</span>
                  <img
                    src={ask}
                    alt=""
                    style={{ width: '16px', marginLeft: '2px' }}
                    onClick={() => {
                      AlertDialog.show({
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
                    }}
                  />
                </div>
                <div className="barWrap">
                  <CompareBar value={signal_total_yield?.profit} other={fund_total_yield.profit} />
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
                            backgroundColor: ['#E74949', '#545968', '#FFAF00'][idx - 1]
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
                <div className="hisotryChartWrap">
                  <BaseAreaChart
                    areaColors={['l(90) 0:#E74949 1:#fff', 'transparent', '#50D88A']}
                    colors={['#E74949', '#545968', '#FFAF00']}
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
                    padding={['auto', 20, 'auto', 50]}
                    percent={true}
                    showArea={false}
                    showDate={true}
                    tofixed={2}
                  />
                  {isLock && (
                    <div
                      className="lockWrap"
                      style={{
                        width: canvasWidth * (1 / 3) - 20
                      }}
                    >
                      <img
                        src={signalMaskHistory}
                        onClick={() => {
                          sendPoint({
                            pageid: 'Underdetail',
                            // ts: ts_in_app,
                            ts: Date.now(),
                            event: `click3`
                          })
                          isToBuyCombo()
                        }}
                        alt=""
                      />
                      {/* <div className="lockDesc">
                          <span>{`历史收益率可 增加${fund_profit_info?.excess_profit?.profit}`}</span>
                        </div> */}
                    </div>
                  )}
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
                        timePeriod == el.val
                          ? { background: '#dee8ff' }
                          : { background: 'transparent' }
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
          <div
            style={{
              width: '100%',
              height: '.24rem',
              background: '#F5F6F8'
            }}
          />
          <div className="top-header">
            <div className="top-wrap">
              <div className="nav" />
              <span className="signal">上证指数估值信号</span>
              <span className="layout">助您掌握大盘动态</span>
            </div>
          </div>
          <TabCom index_id="SH" />
        </div>
      </div>
      <Dialog
        visible={modalContent ? true : false}
        content={<div>{modalContent}</div>}
        action={[
          {
            title: '我知道了',
            onPress: () => {
              setModalContent('')
            }
          }
        ]}
      />
      <Popup
        className="__popup"
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          maxHeight: '40vh'
        }}
      >
        <div className="mock_content_signal">
          <div className="mock_content_signal_header">
            <span className="title">请选择用于解锁本基金买卖信号的套餐</span>
            <img
              alt=""
              onClick={() => {
                setVisible(false)
              }}
              src={close}
              className="close"
            />
          </div>
          <div
            className="mock_content_signal_list_container"
            style={{ height: '30vh', overflowY: 'scroll' }}
          >
            {comboList.map((el: any, index) => {
              return (
                <div
                  onClick={() => selCombo(el)}
                  className={
                    el.isActive
                      ? `mock_content_signal_list_container_wrap is_active`
                      : 'mock_content_signal_list_container_wrap'
                  }
                >
                  <div className="left">
                    <div className="top_wrap">
                      <span className="title">{el.combo_name}</span>
                      <span className="subtitle">{el.can_unlock_info}</span>
                    </div>
                    <span className="middle_title">{el.combo_time_info}</span>
                    <div className="bottom_wrap">
                      <div
                        onClick={(e) => {
                          searchComboDetail(el)
                        }}
                      >
                        <span className="title">查看详情</span>
                        <img alt="" src={forward} className="forward" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={el.isActive ? 'highlight_right' : 'normal_right'}
                    onClick={(e) => {
                      unLock(el)
                    }}
                  >
                    <span className="text" style={{ color: el.isActive ? 'white' : '#0051CC' }}>
                      解锁
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Popup>
      <ShareGuideBtn />
    </div>
  )
}
