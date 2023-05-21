import time from '@/assets/images/time.png'
import calendar from '@/assets/images/calendar.png'
import funds from '@/assets/images/funds.png'
import FixedButton from '@/components/FixedButton'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep } from 'lodash'
import { BaseAreaChart } from '@/components/Chart'
import { Dialog, SpinLoading, Toast } from 'antd-mobile'
import styles from './index.module.less'
import {
  callGetFundBasicInfo,
  callMyFixPlanDetail,
  cancelSubscribeFixedPlan
} from '@/pages/my-plan-detail/services'
import debounce, { isIphoneX, setLocalToken } from '@/utils'
import { history } from 'umi'
import Loading from '@/components/Loading'
import popModal from '@/assets/images/pop_window.png'
import closePop from '@/assets/images/close_pop.png'
import CommonModal from '@/components/CommonModal'
import { setTitle } from '@/utils/setTitle'
const FixedPlanDetail = () => {
  const query = history.location.query as {
    token: string
    uid: string
    chn: string
    fund_code: string
    invest_plan_id: string
  }
  const [fundCode, setFundCode] = useState('')
  const [fundName, setFundName] = useState('')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [investInfo, setInvestInfo] = useState<any>({})
  const [chartData, setChartData] = useState<any>({})
  const [chartLabel, setChartLabel] = useState<any>([])
  const chartLabelDefaultRef = useRef({})
  const [showPop, setShowPop] = useState(false)
  const [is_stop_profit, setIsStopProfit] = useState(false)
  const [is_cancel_sub, setIsCancelSub] = useState(false)
  const [investCalcResult, setInvestCalcResult] = useState<any>({})
  const [isMember, setIsMember] = useState(true)
  const [percent, setPercent] = useState<any>('')
  const init = useCallback(() => {
    ;(async () => {
      const res = await Promise.all([
        callGetFundBasicInfo({
          fund_code: query.fund_code
        }),
        callMyFixPlanDetail({
          uid: query.uid,
          invest_plan_id: query.invest_plan_id
        })
      ])

      if (res && res[0] && res[1]) {
        updateState(res[1])
        setIsMember(res[1]?.is_member)
        setFundCode(res[0]?.info?.code)
        setFundName(res[0]?.info?.name)
        setTags(res[0]?.info?.tags)
        setLoading(false)
      }
    })()
  }, [])
  const updateState = (result: any) => {
    if (result && Object.keys(result).length > 0) {
      setIsStopProfit(result?.data?.is_stop_profit)
      setIsCancelSub(result?.data?.is_cancel_sub)
      setChartData(result?.data?.chart_list)
      setChartLabel(result?.data?.chart_list?.label ?? [])
      chartLabelDefaultRef.current = result?.data?.chart_list?.label ?? []
      setInvestCalcResult(result?.data?.invest_calculate ?? {})
      setInvestInfo(result?.data?.invest_info ?? {})
      let stopProfit = result?.data?.invest_info?.stop_profit?.replace(/%/g, '')
      // @ts-ignore
      setPercent(~~stopProfit)
    }
  }
  useEffect(() => {
    setLocalToken(query.token)
    setTitle('定投计划详情')
    init()
  }, [init])

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
  const cancelSubscribe = (): any => {
    // 是否确认取消订阅此定投方案，取消后将无法再接收到买卖提醒消息？
    Dialog.show({
      title: '提示',
      closeOnMaskClick: true,
      content: '是否确认取消订阅此定投方案，取消后将无法再接收到买卖提醒消息？',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
            style: { color: '#9aa0b1' }
          },
          {
            key: 'confirm',
            text: '确定',
            bold: true,
            style: { color: '#0051cc' },
            onClick: async () => {
              Toast.show({
                icon: 'loading',
                maskClickable: false,
                content: '请稍等...'
              })
              const res = await cancelSubscribeFixedPlan({
                uid: query.uid,
                invest_plan_id: query.invest_plan_id
              })
              Toast.clear()
              if (res > 0) {
                init()
                ;(window as any).wx.miniProgram.navigateBack({
                  delta: 1
                })
              }
            }
          }
        ]
      ]
    })
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.header} style={{ paddingTop: '44px' }}>
            <div className={styles.panel}>
              <div className={styles['fund_header']}>
                <div className={styles.left}>
                  <div className={styles.top}>
                    <span className={styles.name}>{fundName}</span>
                    <span className={styles.code}>{fundCode}</span>
                  </div>
                  <div className={styles.bottom}>
                    {tags.map((el) => {
                      return (
                        <div key={el} className={styles.type_view}>
                          <span className={styles.title}>{el}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.fund_footer}>
                <div className={styles.top}>
                  <img src={time} alt="" className={styles.icon} />
                  <span className={styles.range}>定投测算时间范围</span>
                  <span className={styles.time}>{investInfo?.start_to_end_time ?? ''}</span>
                  {is_stop_profit && (
                    <div className={styles.status}>
                      <span>已止盈</span>
                    </div>
                  )}
                </div>
                <div className={styles.middle}>
                  <img src={calendar} alt="" className={styles.icon} />
                  <span className={styles.fixed_year}>{investInfo?.invest_duration ?? ''}</span>
                  <span className={styles.fixed_day}>{investInfo?.invest_period ?? ''}</span>
                  <div className={styles.fixed_wrap}>
                    <span>定投</span>
                    <span className={styles.money}>{investInfo?.fix_invest_money ?? ''}元</span>
                  </div>
                </div>
                {percent > 0 && (
                  <div className={styles.bottom}>
                    <img src={funds} alt="" className={styles.icon} />
                    <span className={styles.goal}>止盈目标</span>
                    <span className={styles.rate}>{investInfo?.stop_profit ?? ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.section} style={{ marginTop: '12px' }}>
            <div className={styles.list_row}>
              <div className={styles.list_row_wrap}>
                <span className={styles.title}>定投收益率</span>
                <span className={styles.detail}>{investCalcResult?.yield_rate ?? ''}</span>
              </div>
            </div>
            <div className={styles.list_row}>
              <div className={styles.list_row_wrap}>
                <span className={styles.title}>定投收益</span>
                <span className={styles.detail}>{investCalcResult?.yield ?? ''}</span>
              </div>
            </div>
            <div className={styles.list_row}>
              <div className={styles.list_row_wrap}>
                <span className={styles.title}>定投期数</span>
                <span className={styles.detail}>{investCalcResult?.period_num ?? ''}</span>
              </div>
            </div>
            <div className={styles.list_row}>
              <div className={styles.list_row_wrap}>
                <span className={styles.title}>投入本金</span>
                <span className={styles.detail}>{investCalcResult?.total_invest_money ?? ''}</span>
              </div>
            </div>
            <div className={styles.list_row}>
              <div className={styles.list_row_wrap}>
                <span className={styles.title}>总资产</span>
                <span className={styles.detail}>{investCalcResult?.total_value ?? ''}</span>
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <div className={styles.chart_header}>
              <span className={styles.title}>定投收益曲线</span>
            </div>

            <div className={styles.areaChartWrap}>
              <div className={styles.chart_Label}>
                {chartLabel?.map?.((item: any, idx: number) => (
                  <div className={styles.labelItem} key={item + '' + idx}>
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
                    <div className={styles.labelItemBottom}>
                      {idx > 0 && (
                        <div
                          style={{ backgroundColor: ['#E74949', '#545968', '#FFAF00'][idx - 1] }}
                          className={styles.labelKeyRect}
                        />
                      )}
                      <div>{item.key}</div>
                    </div>
                  </div>
                ))}
              </div>
              {chartData ? (
                <BaseAreaChart
                  areaColors={['l(90) 0:#E74949 1:#fff', 'transparent', '#50D88A']}
                  colors={['#E74949', '#545968', '#FFAF00']}
                  data={chartData?.chart}
                  onChange={(obj: any) => {
                    const { items } = obj
                    onChange(items)
                  }}
                  onHide={() => {
                    // @ts-ignore
                    setChartLabel(chartLabelDefaultRef.current)
                  }}
                  padding={['auto', 20, 'auto', 50]}
                  percent={true}
                  showArea={true}
                  showDate={true}
                  tofixed={2}
                />
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

            <div className={styles.table}>
              <div className={styles.table_hover}>
                <div className={styles.top_title}>
                  <span>目标基金定投</span>
                </div>
                <div className={styles.middle_title}>
                  <span
                    style={{
                      color:
                        chartLabel[1]?.val.replace(/%/g, '') > 0
                          ? '#e74949'
                          : chartLabel[1]?.val.replace(/%/g, '') < 0
                          ? '#4BA471'
                          : '#545968'
                    }}
                  >
                    {chartLabel[1]?.val}
                  </span>
                </div>
                <div className={styles.bottom_title}>
                  <span
                    style={{
                      color: '#545968'
                    }}
                  >
                    {chartLabel[1]?.max_drawdown}
                  </span>
                </div>
              </div>
              <div className={styles.row_container} style={{ height: '40px' }}>
                <div className={styles.row_wrap}>
                  <div className={styles.leftVal}>
                    <span>{chartLabel[0]?.val}</span>
                  </div>
                  <div className={styles.center}>
                    <span />
                  </div>
                  <div
                    className={styles.right}
                    style={{
                      fontFamily: 'PingFangSC-Semiboid'
                    }}
                  >
                    <span>沪深300</span>
                  </div>
                </div>
              </div>
              <div className={styles.row_container} style={{ background: '#fff', height: '48px' }}>
                <div className={styles.row_wrap}>
                  <div className={styles.leftVal}>
                    <span>收益率</span>
                  </div>
                  <div className={styles.center}>
                    <span />
                  </div>
                  <div className={styles.right}>
                    <span
                      style={{
                        color:
                          chartLabel[2]?.val.replace(/%/g, '') > 0
                            ? '#e74949'
                            : chartLabel[2]?.val.replace(/%/g, '') < 0
                            ? '#4BA471'
                            : '#545968'
                      }}
                    >
                      {chartLabel[2]?.val}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.row_container} style={{ height: '48px' }}>
                <div className={styles.row_wrap}>
                  <div className={styles.leftVal}>
                    <span>最大回撤</span>
                  </div>
                  <div className={styles.center}>
                    <span />
                  </div>
                  <div className={styles.right}>
                    <span
                      style={{
                        color: '#545968'
                      }}
                    >
                      {chartLabel[2]?.max_drawdown}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer} style={{ paddingBottom: isIphoneX() ? '93px' : '76px' }}>
            <p className={styles.p_txt}>
              1、收益结果根据该基金的历史数据进行测算，仅供参考，不构成未来投资收益的预测。
            </p>
            <p className={styles.p_txt}>
              2、本基金产品，不保证一定盈利，也不保证最低收益，其过往业绩不代表未来表现，基金管理人管理的其他基金的业绩并不构成本基金业绩表现的保证，未来可能存在收益波动甚至本金损失，请您知晓并理解产品特征和相关风险，根据自身的风险承受能力、投资期限和投资目标等，审慎选择合适的产品或服务。市场有风险，投资需谨慎。
            </p>
          </div>
          {!is_cancel_sub && !is_stop_profit && (
            <FixedButton onClick={debounce(cancelSubscribe)} title={'取消订阅此方案'} />
          )}
          {showPop && (
            <div className={styles.fixed_modal}>
              <div className={styles.pop_wrap}>
                <img src={popModal} className={styles.popup} />
                <img
                  src="https://static.licaimofang.com/wp-content/uploads/2023/03/lcgj_qrcode_for_mini.jpeg"
                  className={styles.offical}
                />
                <img
                  src={closePop}
                  className={styles.close_p}
                  onClick={() => {
                    setShowPop(false)
                    // @ts-ignore
                    wx.miniProgram.navigateBack({
                      delta: 1
                    })
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {!isMember && (
        <CommonModal
          index={0}
          bool={false}
          title={''}
          isClose={false}
          closeModal={() => {}}
          lookSample={() => {}}
          openMember={() =>
            (window as any).wx.miniProgram.switchTab({
              url: '/pages/member-buy/index'
            })
          }
        />
      )}
    </>
  )
}
export default FixedPlanDetail
