import './index.less'
import { lazy, Suspense, useEffect, useState } from 'react'
import { setLocalToken } from '@/utils'
import { setTitle } from '@/utils/setTitle'
import { sendPoint } from '@/utils/sendPoint'
import Empty from './components/Empty'
import Download from './components/Download'
import TodaySign from './components/TodaySign'
import BuySingChart from './components/BuySignChart'
import ShareGuideBtn from './components/ShareGuideBtn'
import { CompareCard, ProductCard, WechatBlock } from './components/ProductCard'
import useQuery from './useQuery'
import { pageContext } from './usePageContext'
import type { IHistoryInfo } from './usePageContext'
import {
  lowBuySignal,
  getTimeCurveApi,
  callEstiNavApi,
  callFundUnlockInterfaceApi
} from './services'
import NavEstiChart from '@/pages/fund-assistant/signal-details/components/NavEstiChart'
import EventBus from '@/utils/EventBus'
import OneBuyBall from './components/ActiveBall/OneBuyBall'
import { Toast } from 'antd-mobile'
import sendMsgToWX from '@/utils/sendMsgToWX'
const TabCom = lazy(() => import('./components/TabCom'))
const HistoryChart = lazy(() => import('./components/HistoryChart'))
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

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="top-header">
      <div className="top-wrap">
        <div className="nav" />
        <span className="signal">{title}</span>
        <span className="layout">{desc}</span>
      </div>
    </div>
  )
}

export default function SignalDetails() {
  const query = useQuery()
  const { fund_code, uid } = useQuery()
  const [tabs, setTabs] = useState<
    {
      tab_title: string
      id: number
      is_active: boolean
    }[]
  >([
    {
      id: 0,
      tab_title: '净值走势',
      is_active: true
    },
    {
      id: 1,
      tab_title: '净值估算',
      is_active: false
    }
  ])
  const [visible, setVisible] = useState<boolean>(false)
  const [info, setInfo] = useState<InfoType>()
  const [historyInfo, setHistoryInfo] = useState<IHistoryInfo>()
  const [empty, setEmpty] = useState<boolean>(false) // 页面是否为空
  const [isLock, setIsLock] = useState<boolean>(true)
  const [timePeriod, setTimePeriod] = useState<string>('all_signal')
  const [tabId, setTabId] = useState<number>(0)
  const [valuation_nav, setValuation_nav] = useState<string>('')
  const [valuation_cur_gain, setValuationCurGain] = useState<string>('')
  const [valuation_date, setValuationDate] = useState<string>('')
  const [user_level, setUserLevel] = useState('')
  const [period] = useState<string>('y3')
  const [button_info, setButtonInfo] = useState<string>('')
  const [pop_info, setPopInfo] = useState<string>('')
  useEffect(() => {
    setTitle('买卖点信号详情')
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
  }, [])

  useEffect(() => {
    if (!fund_code) return
    setLocalToken(query.token)
    getDetail(period).then((r) => {})
    //刷新买卖点详情顶部遮罩层
    EventBus.addListener('unlock_trigger', () => {
      getDetail(period).then((r) => {})
    })
    return () => {
      EventBus.addListener('unlock_trigger', () => {})
    }
  }, [fund_code])
  useEffect(() => {
    if (!fund_code) return
    let before = Date.now()
    let timer = setInterval(() => {
      let now = Date.now()
      if (now - before > 40000) {
        loadData().then((r) => {})
        before = now
      }
    }, 1000)
    loadData().then((r) => {})
    return () => timer && clearInterval(timer)
  }, [fund_code])
  /**
   * 加载实时估值数据
   */
  const loadData = async () => {
    const res = await callEstiNavApi({
      uid,
      fund_code
    })
    const { valuation_cur_gain = '', valuation_nav = '', valuation_date = '' } = res?.valuation_info
    setValuation_nav(valuation_nav)
    setValuationCurGain(valuation_cur_gain)
    setValuationDate(valuation_date)
  }
  const getDetail = async (period: string) => {
    if (fund_code) {
      const res = await lowBuySignal({
        fund_code,
        page_source: query?.is_cover === '1' ? 'subject' : '',
        period
      })
      setIsLock(res['is_lock'])
      if (res?.fundInfo) {
        setEmpty(false)
        setInfo(res.fundInfo)
      } else {
        setEmpty(true)
      }
    }
  }
  useEffect(() => {
    ;(async () => {
      if (!fund_code) return
      const res = await getTimeCurveApi({
        fund_code: query.fund_code,
        period: timePeriod
      })
      setHistoryInfo(res)
    })()
  }, [fund_code, timePeriod])

  const isToBuyCombo = async () => {
    Toast.show({
      content: '请稍等...',
      icon: 'loading',
      maskClickable: false
    })
    const res = await callFundUnlockInterfaceApi({
      fund_code: query.fund_code
    })
    Toast.clear()
    if (res.status == 0) {
      Toast.show({
        content: '解锁成功',
        icon: 'success',
        duration: 1000,
        maskClickable: false
      })
      getDetail(query.fund_code)
    } else if (res.status == 10 || res.status == 11) {
      ;(window as any).wx.miniProgram.navigateTo({
        url: `/pages/member-buy/pay?withFound=true&fund_code=${query.fund_code}`
      })
    } else if (res.status == 12) {
      sendPoint({
        pageid: 'signal-details',
        event: 'view',
        ctrl: 'unlock_quota_window',
        ts: Date.now()
      })
      setPopInfo(res.pop_info)
      setUserLevel(res.user_level)
      setButtonInfo(res.button_info)
      setVisible(true)
    }
  }

  if (empty) {
    return <Empty />
  }
  const onTabClick = (item: { tab_title: string; is_active: boolean; id: number }) => {
    tabs?.map((el) => {
      el.is_active = Object.is(item, el)
    })
    setTabId(item.id)
    setTabs([...tabs])
  }
  return (
    <pageContext.Provider value={{ isLock, isToBuyCombo, historyInfo }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowX: 'hidden'
        }}
        className="signal_container"
      >
        <Download />
        <div className="signal-details">
          {Object.keys(info ?? {}).length > 0 && <ProductCard info={info} />}
          {/*  基金涨幅对比 */}
          <CompareCard gain={valuation_cur_gain} nav={valuation_nav} esti_date={valuation_date} />

          <div className="describe-section">
            <div className="upgrade">
              <span>算法升级</span>
            </div>
            <SectionHeader title={'买卖点择时信号'} desc="助力低点布局、高点止盈" />
            {/* 今日买卖点信号 */}
            <TodaySign info={info} />
            {/* 关注微信号 */}
            <WechatBlock />
            {/* 净值走势/净值估算 */}
            <div className="tab_wrap">
              {tabs?.map((item, index) => {
                return (
                  <div
                    style={{
                      marginRight: index == tabs.length - 1 ? '4px' : '28px'
                    }}
                    key={item + '' + index}
                    onClick={() => onTabClick(item)}
                    className={item.is_active ? 'tab_item_active' : 'tab_item'}
                  >
                    <span className="tab_title">{item.tab_title}</span>
                    <div
                      className="tab_separator"
                      style={{
                        position: 'relative',
                        left: index == 0 ? 0 : '18px'
                      }}
                    />
                  </div>
                )
              })}
              {valuation_cur_gain && (
                <div
                  className="nav_esti"
                  style={{
                    background:
                      +valuation_cur_gain?.replace(/%/g, '') > 0
                        ? '#E74949'
                        : +valuation_cur_gain?.replace(/%/g, '') < 0
                        ? '#4BA471'
                        : '#949AA8'
                  }}
                >
                  <span>{valuation_cur_gain}</span>
                </div>
              )}
            </div>
            {/* 业绩走势曲线*/}
            {tabId == 0 && <BuySingChart />}
            {/*实时估值曲线*/}
            {tabId == 1 && (
              <NavEstiChart
                gain={valuation_cur_gain}
                nav={valuation_nav}
                esti_date={valuation_date}
              />
            )}
            <SectionHeader title={'历史累计收益率'} desc="" />
            {/* 历史收益曲线 */}
            <Suspense fallback={<div />}>
              <HistoryChart timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
            </Suspense>
          </div>

          <div className="describe-section" style={{ marginBottom: '2rem' }}>
            <SectionHeader title="上证指数估值信号" desc="助您掌握大盘动态" />
            {/* 上证估值曲线 */}
            <Suspense fallback={<div />}>
              <TabCom index_id="SH" />
            </Suspense>
          </div>
        </div>
        <ShareGuideBtn />
        <OneBuyBall />
        {visible && (
          <div className="upgrade_pop_up">
            <div className="pop_content_wrapper">
              <div className="head_title">
                <span>当前已解锁{pop_info}支，无法再解锁新的基</span>
                <span>金信号。您可以通过取消解锁来释</span>
                <span>放额度。</span>
              </div>
              <div
                className="upgrade_btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setVisible(false)
                  sendPoint({
                    pageid: 'signal-details',
                    event: 'click',
                    ctrl: 'btn_up',
                    ts: Date.now()
                  })
                  ;(window as any).wx.miniProgram.navigateTo({
                    url: `/pages/member-buy/pay?withFound=true&fund_code=${query.fund_code}&user_level=${user_level}&pay`
                  })
                }}
              >
                <span>{button_info}</span>
              </div>
              <div
                className="manage_fund"
                onClick={(e) => {
                  e.stopPropagation()
                  setVisible(false)
                  sendPoint({
                    pageid: 'signal-details',
                    event: 'click',
                    ctrl: 'btn_manage_unlock',
                    ts: Date.now()
                  })
                  sendMsgToWX({
                    type: 'scroll',
                    msg: '给小程序发送一条消息'
                  })
                  ;(window as any).wx.miniProgram.switchTab({
                    url: '/pages/buy-sell-signal/index'
                  })
                }}
              >
                去管理我已解锁的基金
              </div>
            </div>
          </div>
        )}
      </div>
    </pageContext.Provider>
  )
}
