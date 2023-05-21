import time from '@/assets/images/time.png'
import calendar from '@/assets/images/calendar.png'
import funds from '@/assets/images/funds.png'
import FixedButton from '@/components/FixedButton'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep } from 'lodash'
// @ts-ignore
import { BaseAreaChart } from '@/components/Chart'
import { Dialog as AlertDialog, Popup, Slider, SpinLoading, Toast } from 'antd-mobile'
import popup from '@/assets/images/close_popup.png'
import ask from '../../assets/images/ask.png'
import styles from './index.module.less'
import {
  callGetFixInfo,
  callGetFundBasicInfo,
  queryFixedDetail,
  subscribeFixedPlan
} from '@/pages/fixed-plan-detail/services'
import debounce, { isIphoneX, setLocalToken } from '@/utils'
import { history } from 'umi'
import Loading from '@/components/Loading'
import popModal from '@/assets/images/pop_window.png'
import closePop from '@/assets/images/close_pop.png'
import { setTitle } from '@/utils/setTitle'
const FixedPlanDetail = () => {
  const query = history.location.query as {
    token: string
    uid: string
    fund_code: string
    fund_name: string
    chn: string
    did: string
    invest_plan_id: string
    stop_profit: string
    fix_invest_money: string
    invest_period: string
    invest_duration: string
  }
  const [fundCode, setFundCode] = useState('')
  const [fundName, setFundName] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [numVal, setNumVal] = useState(1000)
  const [investInfo, setInvestInfo] = useState<any>({})
  const [percent, setPercent] = useState(30)
  const [tags, setTags] = useState([])
  const [chartData, setChartData] = useState<any>([])
  const [chartLabel, setChartLabel] = useState<any>([])
  const [isOrdinaryFixed, setIsOrdinaryFixed] = useState(true)
  const [subscribeTitle, setSubscribeTitle] = useState('订阅此定投方案')
  const chartLabelDefaultRef = useRef({})
  const [showPop, setShowPop] = useState(false)
  const [fixedDuration, setFixDuration] = useState('')
  const [fixDurationList, setFixDurationList] = useState([])
  const [fixPeriod, setFixPeriod] = useState('')
  const [fixedWeekList, setFixWeekList] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [investCalcResult, setInvestCalcResult] = useState<any>({})
  const [fixedStrategyList, setFixedStrategyList] = useState([])
  const init = useCallback(() => {
    ;(async () => {
      const res = await Promise.all([
        callGetFixInfo(),
        callGetFundBasicInfo({
          fund_code: query.fund_code
        }),
        queryFixedDetail({
          uid: query.uid,
          fund_code: query.fund_code,
          invest_plan_id: query.invest_plan_id,
          stop_profit: query.stop_profit,
          fix_invest_money: query.fix_invest_money,
          invest_period: query.invest_period,
          invest_duration: query.invest_duration
        })
      ])
      if (res[0] && res[1] && res[2]) {
        const { invest_duration = {}, invest_period = {} } = res[0]
        let investDurationList: any = Object.entries(invest_duration).map((el, index) => {
          return { key: el[0], value: el[1], isActive: false }
        })
        let investPeriodList: any = Object.entries(invest_period).map((el, index) => {
          return { key: el[0], value: el[1], isActive: false }
        })
        updateState(res[2], investPeriodList, investDurationList)
        setFixDurationList(investDurationList)
        setFixWeekList(investPeriodList)
        setFundCode(res[1]?.info?.code)
        setFundName(res[1]?.info?.name)
        setTags(res[1]?.info?.tags)
        setLoading(false)
      }
    })()
  }, [])
  const updateState = (result: any, investPeriodList = [], investDurationList = []) => {
    setInvestInfo(result?.data?.invest_info)
    setInvestCalcResult(result?.data?.invest_calculate)
    setNumVal(result?.data?.invest_info?.fix_invest_money)
    let period = result?.data?.invest_info?.invest_period
    let duration = result?.data?.invest_info?.invest_duration
    let stopProfit = result?.data?.invest_info?.stop_profit.replace(/%/g, '')
    setIsOrdinaryFixed(stopProfit == 0)
    let fixStrategyList = [
      {
        title: '普通定投',
        isActive: stopProfit == 0,
        subtitle: '震荡环境优选'
      },
      {
        title: '目标止盈',
        isActive: !(stopProfit == 0),
        subtitle: '上涨环境优选'
      }
    ]
    // @ts-ignore
    setFixedStrategyList(fixStrategyList)
    setPercent(~~stopProfit)
    investPeriodList.find((item: any) => {
      item.isActive = false
      if (~item.value.indexOf(period)) {
        period = item.key
        item.isActive = true
        return true
      }
      return false
    })
    investDurationList.find((item: any) => {
      item.isActive = false
      if (~duration.indexOf(item.value)) {
        duration = item.key
        item.isActive = true
        return true
      }
      return false
    })
    setFixDuration(duration)
    setFixPeriod(period)
    setChartData(result?.data?.chart_list)
    setChartLabel(result?.data?.chart_list?.label)
    chartLabelDefaultRef.current = result?.data?.chart_list?.label
  }
  useEffect(() => {
    setTitle('定投计划详情')
    setLocalToken(query.token)
    init()
  }, [init])

  const onChange = (items: any) => {
    setChartLabel((prev: any) => {
      console.log(items, prev)
      const next = cloneDeep(prev)
      next[0].val = items[0].title
      next[1].val = items[0].value || '0%'
      next[2].val = items[1].value || '0%'
      next[1].color = items[0].origin.value > 0 ? '#E74949' : '#4BA471'
      next[2].color = items[1].origin.value > 0 ? '#E74949' : '#4BA471'
      return next
    })
  }
  const selFixDuration = (item: any) => {
    fixDurationList.map((el: any) => {
      el['isActive'] = false
      if (JSON.stringify(el) == JSON.stringify(item)) {
        el['isActive'] = true
      }
    })
    setFixDuration(item.key)
    setFixDurationList([...fixDurationList])
  }
  const selFixWeek = (item: any) => {
    fixedWeekList?.map((el: any) => {
      el['isActive'] = false
      if (JSON.stringify(el) == JSON.stringify(item)) {
        el['isActive'] = true
      }
    })
    setFixPeriod(item.key)
    setFixWeekList([...fixedWeekList])
  }
  const onChangeRuler = (value: number | number[]) => {
    // console.log(value);
    typeof value === 'number' && setNumVal(value)
  }
  const onChangeRuler1 = (value: number | number[]) => {
    typeof value === 'number' && setPercent(value)
  }

  const selFixedStrategy = (item: any, index: number) => {
    fixedStrategyList.map((el: any) => {
      el.isActive = false
      if (JSON.stringify(el) == JSON.stringify(item)) {
        el.isActive = true
      }
    })
    index == 0 ? setIsOrdinaryFixed(true) : setIsOrdinaryFixed(false)
    index == 0 && setPercent(0)
    setFixedStrategyList([...fixedStrategyList])
  }
  const confirmParams = async () => {
    if (numVal < 1) {
      Toast.show({
        content: '定投金额区间在1～10000'
      })
      return
    }
    if (!isOrdinaryFixed) {
      if (percent < 1) {
        Toast.show({
          content: '目标止盈区间在1～10000'
        })
        return
      }
    }
    Toast.show({
      icon: 'loading',
      content: '请稍等...',
      maskClickable: false
    })
    const res = await queryFixedDetail({
      uid: query.uid,
      fund_code: query.fund_code,
      invest_plan_id: query.invest_plan_id,
      stop_profit: percent / 100,
      fix_invest_money: numVal,
      invest_period: fixPeriod,
      invest_duration: fixedDuration
    })
    updateState(res, fixedWeekList, fixDurationList)
    Toast.clear()
    setVisible(false)
  }
  const subscribe = async () => {
    Toast.show({
      icon: 'loading',
      maskClickable: false,
      content: '请稍等...'
    })
    try {
      const res = await subscribeFixedPlan({
        uid: query.uid,
        fund_code: query.fund_code,
        fund_name: query.fund_name,
        stop_profit: percent / 100,
        fix_invest_money: investInfo['fix_invest_money'],
        invest_period: fixPeriod,
        invest_duration: fixedDuration,
        invest_period_nums: investCalcResult['period_num']
      })
      if (res > 0) {
        setSubscribeTitle('已订阅')
        setDisabled(true)
        setShowPop(true)
      }
      Toast.clear()
    } catch (e: any) {
      AlertDialog.show({
        title: '',
        closeOnMaskClick: true,
        content: e,
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
              }
            }
          ]
        ]
      })

      Toast.clear()
    }
  }
  // @ts-ignore
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
                  <div className={styles.bottom_wrap}>
                    <div className={styles.bottom}>
                      {tags.map((el) => {
                        return (
                          <div key={el} className={styles.type_view}>
                            <span className={styles.title}>{el}</span>
                          </div>
                        )
                      })}
                    </div>
                    {!disabled && (
                      <div className={styles.right_btn} onClick={() => setVisible(true)}>
                        <span className={styles.title}>修改定投参数</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.fund_footer}>
                <div className={styles.top}>
                  <img src={time} alt="" className={styles.icon} />
                  <span className={styles.range}>定投测算时间范围</span>
                  <span className={styles.time}>{investInfo?.start_to_end_time ?? ''}</span>
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
                {percent != 0 && (
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
                  // splitTag={chartData?.tag_position?.[0]}
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
                  <div className={styles.left}>
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
                  <div className={styles.left}>
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
                  <div className={styles.left}>
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
          <Popup
            visible={visible}
            onMaskClick={() => {
              setVisible(false)
            }}
            bodyStyle={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              maxHeight: '75vh',
              background: '#f5f6f8'
            }}
          >
            <div className={styles.popup}>
              <div className={styles.popup_header}>
                <img
                  src={popup}
                  className={styles.close_popup}
                  onClick={() => {
                    setVisible(false)
                  }}
                />
                <span className={styles.title}>修改定投参数</span>
                <span className={styles.confirm} onClick={confirmParams}>
                  确定
                </span>
              </div>
              <div className={styles.scroll} style={{ height: '65vh', overflowY: 'scroll' }}>
                <div className={styles.fixed_money}>
                  <div className={styles.fixed_header}>
                    <span className={styles.title}>定投金额(元)</span>
                    <div
                      className={styles.right_wrap}
                      onClick={() => {
                        Toast.show({
                          content: `根据工资比例法，一般定投金额可以设定在每月月薪10%-20%。`
                        })
                      }}
                    >
                      <img src={ask} className={styles.ask} />
                      <span className={styles.title}>每次定投多少钱合适？</span>
                    </div>
                  </div>

                  <div
                    className={styles.flex}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      marginTop: '8px'
                    }}
                  >
                    <div className={styles.money_wrap}>
                      <span className={styles.money_value}>{numVal}</span>
                      {/*<img src={edit} className={styles.edit} />*/}
                    </div>
                    {/*<ScaleComponent*/}
                    {/*  start={0}*/}
                    {/*  end={100}*/}
                    {/*  precision={1}*/}
                    {/*  current={numVal}*/}
                    {/*  onChange={changeRuler}*/}
                    {/*/>*/}
                    <Slider
                      step={100}
                      min={0}
                      defaultValue={numVal}
                      max={10000}
                      onChange={onChangeRuler}
                    />
                  </div>
                </div>
                {/*定投时长*/}
                <div className={styles.fixed_duration}>
                  <div className={styles.fixed_duration_header}>
                    <span className={styles.title}>定投时长</span>
                    <div
                      className={styles.right_wrap}
                      onClick={() => {
                        Toast.show({
                          content: `A股一轮完整的牛熊周期走势在3~10年，建议定投时间至少1年，推荐定投时间3年以上。`
                        })
                      }}
                    >
                      <img src={ask} className={styles.ask} />
                      <span className={styles.title}>建议定投多久？</span>
                    </div>
                  </div>
                  <div className={styles.list_row}>
                    {fixDurationList.map((el: any, index: number) => {
                      return (
                        <div
                          key={el + `` + index}
                          className={styles.list_row_item}
                          onClick={() => selFixDuration(el)}
                          style={{ background: el.isActive ? '#D4E5FF' : '#F5F6F8' }}
                        >
                          <span
                            style={{
                              color: el['isActive'] ? '#0046B1' : '#545968',
                              fontFamily: el['isActive']
                                ? 'PingFangSC-Medium'
                                : 'PingFangSC-Regular'
                            }}
                          >
                            {el.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/*定投周期*/}
                <div className={styles.fixed_duration}>
                  <div className={styles.fixed_duration_header}>
                    <span className={styles.title}>定投周期</span>
                  </div>
                  <div className={styles.list_row}>
                    {fixedWeekList?.map((el: any, index: number) => {
                      return (
                        <div
                          key={el + `` + index}
                          onClick={() => selFixWeek(el)}
                          className={styles.list_row_item}
                          style={{ background: el.isActive ? '#D4E5FF' : '#F5F6F8' }}
                        >
                          <span
                            style={{
                              color: el['isActive'] ? '#0046B1' : '#545968',
                              fontFamily: el['isActive']
                                ? 'PingFangSC-Medium'
                                : 'PingFangSC-Regular'
                            }}
                          >
                            {el.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={styles.fixed_strategy}>
                  <div className={styles.fixed_strategy_header}>
                    <span className={styles.title}>定投策略</span>
                  </div>
                  <div className={styles.list_row}>
                    {fixedStrategyList.map((el: any, index: number) => {
                      return (
                        <div
                          key={index + '' + el}
                          className={styles.list_row_item}
                          onClick={() => selFixedStrategy(el, index)}
                          style={{ background: el.isActive ? '#D4E5FF' : '#f5f6f8' }}
                        >
                          <span
                            className={styles.title}
                            style={{ color: el.isActive ? '#0051CC' : '#545968' }}
                          >
                            {el.title}
                          </span>
                          <span
                            className={styles.subtitle}
                            style={{ color: el.isActive ? '#0051CC' : '#9AA0B1' }}
                          >
                            {el.subtitle}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {!isOrdinaryFixed && (
                    <div className={styles.flex} style={{ flexWrap: 'wrap', marginTop: '24px' }}>
                      <div className={styles.money_wrap}>
                        <span className={styles.money_value}>{percent + '%'}</span>
                        {/*<img src={edit} className={styles.edit} />*/}
                      </div>
                      <Slider
                        step={1}
                        min={0}
                        defaultValue={percent}
                        max={100}
                        onChange={onChangeRuler1}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Popup>
          <FixedButton onClick={debounce(subscribe)} title={subscribeTitle} disabled={disabled} />
          {showPop && (
            <div className={styles.fixed_modal}>
              <div className={styles.pop_wrap}>
                <img
                  src={popModal}
                  className={styles.popup}
                  style={{
                    padding: 0
                  }}
                />
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
    </>
  )
}
export default FixedPlanDetail
