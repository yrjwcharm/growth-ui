import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { setTitle } from '@/utils/setTitle'
import { isIphoneX, setLocalToken } from '@/utils'
import Toast from '@/components/Toast'
import { history } from 'umi'
import {
  chartData,
  defaultInfo,
  fundInfo,
  fundInvest,
  fundPerformance,
  ManagerInfoType,
  userInfo
} from './services'
import DefaultGraph from '@/components/DefaultGraph'
import { sendPoint } from '@/utils/sendPoint'
import { LineChartDataType } from '@/utils/chartOption'

import LineChart from './components/LineChart'
import DiagnosticList from './components/DiagnosticList'
import GradeCard from './components/GradeCard'
import GradeTable from './components/GradeTable'
import SubCardTitle from './components/SubCardTitle'
import ConclusionCard from './components/ConclusionCard'
import LockImage from './components/LockImage'
import Modal from '@/components/Modal'
import DownLoadModal from './components/DownLoadModal'
import CommonModal from '@/components/CommonModal'
import { addFocus, queryUserFocusStatus } from '@/pages/fund-assistant/signal-details/services'

interface InfoType {
  code: string
  found_year: number
  funding_date: string
  name: string
  tags: string[]
}

const pageid: string = 'Funddiagnosis'
let ts_in: number = 0

export default function DiagnosticReport() {
  const query = history.location.query as {
    token: string
    uid: string
    fund_code: string
    chn: string
    did: string
    isFree: string
  }
  const [focus, setFocus] = useState(false)
  const [info, setInfo] = useState<InfoType>()
  const [empty, setEmpty] = useState<boolean>(false) // 页面是否为空
  const [index, setIndex] = useState(0)
  const [modalVisible, setModalVisible] = useState<boolean>(false) // 复制弹窗

  const [bannerImg, setBannerImg] = useState<string>('') // 顶部banner图
  const [managerInfo, setManagerInfo] = useState<ManagerInfoType[]>() // 基金经理信息

  const [moduleTitle, setModuleTitle] = useState<{
    fund_invest?: string // 基金适不适合当下投资
    fund_manager?: string // 基金经理怎么样
    fund_performance?: string // 基金业绩怎么样
  }>()

  const [activateLock, setActivateLock] = useState<{
    // 用户未激活时显示的默认图片
    fund_invest?: string // 基金适不适合当下投资
    fund_manager?: string // 基金经理怎么样
    fund_performance?: string // 基金业绩怎么样
  }>()
  const [downLoadModal, setDownLoadModal] = useState<{
    button?: string // 点击按钮
    jump_url?: string // 复制的下载链接
    pop_up?: string // 弹窗背景图
  }>()

  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [chartLegend, setChartLegend] = useState<any>({})
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>() // 折线图数据
  const [chartTime, setChartTime] = useState<
    {
      key: string
      value: string
    }[]
  >() // 可选时间
  const [indexDirection, setIndexDirection] = useState<
    {
      direction: 1 | -1
      end_date: string
      start_date: string
    }[]
  >()

  const [performanceTitle, setPerformanceTitle] = useState<{
    index_name: string
    index_title: string
    module_title: string
  }>()

  const [summarize, setSummarize] = useState<{
    text: string
    title: string
  }>() // 业绩总结
  const [performance, setPerformance] = useState<{
    title: string
    content: {
      key: string
      value: string
    }[][]
  }>() // 业绩总结
  const [listItems, setListItems] = useState([
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_buy_signal.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_buy_signal.png',
      explain: '买卖点信号',
      isActive: true
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_fixed.png',
      selectImg: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_fixed.png',
      explain: '智能定投管家',
      isActive: false
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_family_class.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_family_class.png',
      explain: '家庭理财课程',
      isActive: false
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_fund_report.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_fund_report.png',
      explain: '基金投研报告',
      isActive: false
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_community_group.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_community_group.png',
      explain: '投资大咖社群',
      isActive: false
    }
  ])
  const [showGuide, setShowGuide] = useState(false)
  const [investSummarize, setInvestSummarize] = useState<{
    text: string
    title: string
  }>() // 基金适不适合投资
  const [investPerformance, setInvestPerformance] = useState<{
    title?: string
    content?: {
      title?: string
      direction?: 1 | -1 // 上涨 ｜ 下跌
      content?: {
        level?: {
          good_level?: {
            key: string
            value: string
          }
          stability_level?: {
            key: string
            value: string
          }
        }
        list?: {
          table_head?: {
            index: string
            title: string
          }[]
          table_list?: Record<string, any>[]
        }
      }
    }[]
  }>() // 基金适不适合投资

  const [userActivation, setUserActivation] = useState<boolean>(false) // 用户是否激活(未激活时显示默认图)

  const init = async (fund_code: string) => {
    try {
      Toast.show()
      const res = await fundInfo({
        fund_code
      })
      focusMethod(fund_code)

      if (res?.fund_info) {
        setEmpty(false)
        setInfo(res.fund_info)
      } else {
        setEmpty(true)
      }
      setManagerInfo(res?.manager_info)
    } catch (error) {}
    Toast.hide()
  }
  const focusMethod = (fund_code: string) => {
    ;(async () => {
      const res1 = await queryUserFocusStatus({
        fund_code,
        type: 1
      })
      setFocus(res1?.is_collect)
    })()
  }

  const getChartData = async (fund_code: string) => {
    try {
      const res = await chartData({
        fund_code,
        period: 'y1'
      })

      setPerformanceTitle({
        index_name: res.index_name,
        index_title: res.index_title,
        module_title: res.module_title
      })

      const _chart = res?.chart
      if (_chart && _chart.length > 0) {
        // setChartTags(res.chart.highlight)
        setChartLineData(_chart)
        let _chartLegendTime = _chart[_chart?.length - 1].date
        let _chartLegend: any = {}
        setChartLegendTime(_chartLegendTime)
        _chart.map((item: any) => {
          if (item.date === _chartLegendTime) {
            _chartLegend[item.type] = item.value
          }
        })
        setChartLegend(_chartLegend)
        setChartTime(res.chartTime)
        setIndexDirection(res.indexDirection)
      } else {
        setChartLineData([])
      }
    } catch (error) {}
  }

  const getUserInfo = async () => {
    try {
      const res = await userInfo(query.fund_code)
      setUserActivation(res.is_activate)
    } catch (error) {}
  }

  const getDefaultInfo = async () => {
    try {
      const res = await defaultInfo()
      setBannerImg((res.banner && res.banner[0]) || '')
      setModuleTitle(res.module)
      setActivateLock(res.activate_lock)
      setDownLoadModal(res.url_pop)
    } catch (error) {}
  }

  // 获取基金业绩
  const getFundPerformance = async (fund_code: string) => {
    try {
      const res = await fundPerformance({
        fund_code: fund_code
      })
      setSummarize(res.summarize)
      setPerformance(res.performance)
    } catch (error) {}
  }

  // 获取基金适不适合投资
  const geFundInvest = async (fund_code: string) => {
    try {
      const res = await fundInvest({
        fund_code: fund_code
      })
      setInvestSummarize(res.summarize)
      setInvestPerformance(res.performance_data)
    } catch (error) {}
  }

  const showModal = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    setTitle('基金诊断报告')

    setLocalToken(query.token)

    getDefaultInfo()
    getUserInfo()
    init(query.fund_code)
    getFundPerformance(query.fund_code)
    geFundInvest(query.fund_code)
    getChartData(query.fund_code)

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
  const selPrivilege = (el: any, index: number) => {
    sendPoint({
      pageid: 'Funddiagnosis',
      // ts: ts_in_app,
      ts: Date.now(),
      event: `click${index + 1}`
    })
    listItems.map((item) => {
      item.isActive = false
      if (JSON.stringify(item) == JSON.stringify(el)) {
        item.isActive = true
      }
    })
    setShowGuide(true)
    sendPoint({
      pageid: 'Purchaseguide',
      // ts: ts_in_app,
      ts: Date.now(),
      event: `load`
    })
    setIndex(index)
    setListItems([...listItems])
  }
  // @ts-ignore
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingBottom: isIphoneX() ? '77PX' : '60PX',
        overflowX: 'hidden'
      }}
    >
      {empty ? (
        <div
          style={{
            marginTop: '2rem'
          }}
        >
          <DefaultGraph
            title="暂无基金诊断数据"
            subtitle={
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                  className={styles['default-graph-subtitle']}
                >
                  <span>如下情况会导致没有基金诊断数据</span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span>1、基金清盘、退市；</span>
                    <span>2、新基金上市1年内；</span>
                    <span>3、其他异常数据问题；</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      ) : (
        <div className={styles['diagnostic-report']}>
          {bannerImg ? (
            <img
              style={{
                width: '100%'
              }}
              src={bannerImg}
              alt=""
            />
          ) : null}

          <div
            className={styles['content-container']}
            style={{
              marginTop: bannerImg ? '-4.02rem' : 0
            }}
          >
            <div className={styles['product-card']}>
              <div className={styles.product_wrap}>
                <div className={styles.product_top}>
                  <div className={styles['product-card-title']}>
                    <span
                      className={styles['product-name']}
                      style={{ width: query.isFree ? '170px' : '100%' }}
                    >
                      {info?.name}
                    </span>
                    <span className={styles['product-code']}>{info?.code}</span>
                  </div>
                  {info?.tags?.length ? (
                    <div className={styles['product-tag-container']}>
                      {info.tags.map((item, index) => {
                        if (item) {
                          return <div key={index}>{item}</div>
                        } else {
                          return null
                        }
                      })}
                    </div>
                  ) : null}
                </div>
                {query.isFree && (
                  <div
                    className={styles.focus}
                    onClick={async () => {
                      if (!focus) {
                        Toast.show({
                          icon: 'loading',
                          maskClickable: false
                        })
                        const res = await addFocus({
                          optional_code: [query.fund_code],
                          type: 1,
                          upload_fund_page: 'fundDiagnose',
                          user_type: '2'
                        })
                        if (res) {
                          focusMethod(query.fund_code)
                        }
                        Toast.hide()
                      } else {
                        Toast.show({
                          icon: 'success',
                          maskClickable: false,
                          duration: 3500,
                          content: '您已关注成功'
                        })
                      }
                    }}
                  >
                    <span className={styles.focus_txt}>{focus ? '已关注' : '+关注'}</span>
                  </div>
                )}
              </div>
              <div className={styles['privilege_flex']}>
                {listItems.map((el, index) => {
                  return (
                    <div
                      key={el + '' + index}
                      className={styles['privilege_item']}
                      onClick={() => selPrivilege(el, index)}
                    >
                      <img
                        src={el.isActive ? el.selectImg : el.img}
                        className={styles['img_card']}
                      />
                      <span
                        className={styles['explain']}
                        style={{
                          color: el.isActive ? '#121D3A' : '#545968',
                          fontFamily: el.isActive ? 'PingFangSC-Medium' : 'PingFangSC-Regular',
                          fontWeight: el.isActive ? 'bold' : 'normal'
                        }}
                      >
                        {el.explain}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 基金业绩怎么样 */}
            <div className={styles['card-container']}>
              <div className={styles['card-title']}>
                {moduleTitle?.fund_performance ? <img src={moduleTitle?.fund_performance} /> : null}
              </div>

              {userActivation ? (
                summarize?.text ? (
                  <ConclusionCard data={summarize.text} />
                ) : null
              ) : activateLock?.fund_performance ? (
                <LockImage src={activateLock.fund_performance} onClick={showModal} />
              ) : null}
              <div className={styles['sub-card-container']}>
                <SubCardTitle
                  title={performanceTitle?.module_title}
                  subTitle={`${performanceTitle?.index_title ? performanceTitle?.index_title : ''}${
                    performanceTitle?.index_title ? '：' : ''
                  }${performanceTitle?.index_name ? performanceTitle?.index_name : ''}`}
                />
                <div>
                  <LineChart
                    defaultLegend={chartLegend}
                    defaultLegendTime={chartLegendTime}
                    defaultLineData={chartLineData}
                    defaultChartTime={chartTime}
                    fund_code={query.fund_code}
                    defaultCanvasId="line1"
                  />
                </div>
              </div>
              {performance && performance.content.length > 0 ? (
                <div className={styles['sub-card-container']}>
                  {performance.title ? <SubCardTitle title={performance.title} /> : null}

                  <div>
                    {performance.content.map((item, index) => {
                      return (
                        <div key={index}>
                          <DiagnosticList data={item} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            {/* 基金适不适合投资 */}
            {!investSummarize && !investPerformance ? null : (
              <div className={styles['card-container']}>
                <div className={styles['card-title']}>
                  {moduleTitle?.fund_invest ? <img src={moduleTitle?.fund_invest} /> : null}
                </div>
                {userActivation ? (
                  investSummarize?.text ? (
                    <ConclusionCard data={investSummarize.text} />
                  ) : null
                ) : activateLock?.fund_invest ? (
                  <LockImage src={activateLock.fund_invest} onClick={showModal} />
                ) : null}
                <div className={styles['sub-card-container']}>
                  <SubCardTitle
                    title={performanceTitle?.module_title}
                    subTitle={`${
                      performanceTitle?.index_title ? performanceTitle?.index_title : ''
                    }${performanceTitle?.index_title ? '：' : ''}${
                      performanceTitle?.index_name ? performanceTitle?.index_name : ''
                    }`}
                  />
                  <div>
                    <LineChart
                      defaultLegend={chartLegend}
                      defaultLegendTime={chartLegendTime}
                      defaultLineData={chartLineData}
                      defaultChartTime={chartTime}
                      fund_code={query.fund_code}
                      defaultCanvasId="line2"
                      defaultIndexDirection={indexDirection}
                    />
                  </div>
                </div>

                {investPerformance?.content?.map((item, index) => {
                  return (
                    <div className={styles['sub-card-container']} key={index}>
                      {item.title ? <SubCardTitle title={item.title} /> : null}
                      {item.content?.level ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '.32rem'
                          }}
                        >
                          {item.content?.level.good_level ? (
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <GradeCard
                                text={item.content?.level.good_level.value}
                                gradeKey={parseInt(item.content?.level.good_level.key)}
                                alignItems={'center'}
                              />
                            </div>
                          ) : null}
                          {item.content?.level.stability_level ? (
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <GradeCard
                                text={item.content?.level.stability_level.value}
                                gradeKey={parseInt(item.content?.level.stability_level.key)}
                                length={2}
                                alignItems={'center'}
                              />
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {item.content?.list &&
                      item.content.list.table_head &&
                      item.content.list.table_head?.length > 0 ? (
                        <div
                          style={{
                            marginTop: '.36rem'
                          }}
                        >
                          <GradeTable data={item.content.list} />
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}

            {/* 基金经理怎么样 */}
            {userActivation ? (
              managerInfo && managerInfo?.length > 0 ? (
                <div className={styles['card-container']}>
                  <div className={styles['card-title']}>
                    {moduleTitle?.fund_manager ? <img src={moduleTitle?.fund_manager} /> : null}
                  </div>
                  {managerInfo.map((item) => {
                    return (
                      <div key={item.name}>
                        <div className={styles['manager-info-container']}>
                          <div className={styles['manager-info']}>
                            {item.head_img ? <img src={item.head_img} /> : null}
                            {item.name ? <span>{item.name}</span> : null}
                          </div>
                          <div className={styles['manager-popularity']}>
                            {item.influenceLevel.title ? (
                              <div>{item.influenceLevel.title}</div>
                            ) : null}
                            <GradeCard
                              text={''}
                              gradeKey={item.influenceLevel.level}
                              alignItems="flex-start"
                            />
                          </div>
                        </div>

                        {item?.detail?.map((val, i) => {
                          return (
                            <div className={styles['sub-card-container']} key={i}>
                              <SubCardTitle
                                title={val.title}
                                rightTitleBold={val.hot_rank}
                                rightTitle={val.manage_year}
                              />
                              <div>
                                <DiagnosticList data={val.content} judgeStatus={'style'} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ) : null
            ) : activateLock?.fund_manager ? (
              <div className={styles['card-container']}>
                <div className={styles['card-title']}>
                  {moduleTitle?.fund_manager ? <img src={moduleTitle?.fund_manager} /> : null}
                </div>
                <LockImage src={activateLock.fund_manager} onClick={showModal} />
              </div>
            ) : null}
          </div>
        </div>
      )}
      <Modal visible={modalVisible}>
        <DownLoadModal
          data={downLoadModal}
          closeModal={() => {
            setModalVisible(false)
          }}
          query={query}
        />
      </Modal>
      {showGuide && (
        <CommonModal
          index={index}
          bool={false}
          title={
            index == 0
              ? '查看基金买卖点'
              : index == 1
              ? '定制你的定投方案'
              : index == 2
              ? '学习完整课程'
              : ''
          }
          isClose={true}
          closeModal={() => {
            setShowGuide(false)
          }}
          lookSample={() => {}}
          openMember={() => {
            setShowGuide(false)
            sendPoint({
              pageid: 'Purchaseguide',
              // ts: ts_in_app,
              ts: Date.now(),
              event: `click`
            })
            // @ts-ignore
            wx.miniProgram.switchTab({
              url: '/pages/member-buy/index'
            })
          }}
        />
      )}
    </div>
  )
}
