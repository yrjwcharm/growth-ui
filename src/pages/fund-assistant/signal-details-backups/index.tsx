import { level_color } from '@/config'
import './index.less'
import { useCallback, useEffect, useState } from 'react'
import { setTitle } from '@/utils/setTitle'
import { setLocalToken } from '@/utils'
import Toast from '@/components/Toast'
import { history } from 'umi'
import { detailFund, diagram } from './services'
import DefaultGraph from '@/components/DefaultGraph'
import helpIcon from '@/assets/images/icons/help.png'
import Dialog from '@/components/Dialog'
import { sendPoint } from '@/utils/sendPoint'
import ActivityIndicator from '@/components/ActivityIndicator'
import { baseAreaChart, ChartTagsType, LineChartDataType } from '@/utils/chartOption'

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

const level_back = {
  1: {
    background: 'linear-gradient(180deg, #EDF7EC 0%, #FFFFFF 14%, #FFFFFF 100%)',
    borderColor: level_color[1].color
  },
  2: {
    background: 'linear-gradient(180deg, #F5FCE2 0%, #FFFFFF 14%, #FFFFFF 100%)',
    borderColor: level_color[2].color
  },
  3: {
    background: 'linear-gradient(180deg, #FFF3D8 0%, #FFFFFF 14%, #FFFFFF 100%)',
    borderColor: level_color[3].color
  },
  4: {
    background: 'linear-gradient(180deg, #FFF6E6 0%, #FFFFFF 14%, #FFFFFF 100%)',
    borderColor: level_color[4].color
  },
  5: {
    background: 'linear-gradient(180deg, #FFEDED 0%, #FFFFFF 14%, #FFFFFF 100%)',
    borderColor: level_color[5].color
  }
}

const areaColors = [
  'transparent',
  'rgb(0, 152, 8)',
  'rgb(112, 209, 0)',
  'rgb(255, 226, 104)',
  'rgb(255, 137, 0)',
  'rgb(255, 0, 0)'
]

export default function SignalDetails() {
  const [info, setInfo] = useState<InfoType>()
  // const [historyInfo, setHistoryInfo] = useState<HistoryType[]>()
  const [empty, setEmpty] = useState<boolean>(false) // 页面是否为空
  const [modalContent, setModalContent] = useState<string>('') // 说明文案

  // const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1) // 档位

  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [chartLegend, setChartLegend] = useState<any>({})
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartLoading, setChartLoading] = useState<boolean>(false)
  const [chartTags, setChartTags] = useState<ChartTagsType>([])
  const [chartEmpty, setChartEmpty] = useState<boolean>(false) // 折线数据为空

  const init = async (uid: string, fund_code: string) => {
    try {
      Toast.show({
        content: '请稍等...'
      })
      const res = await detailFund({
        uid: uid,
        fund_code
      })
      if (res?.fund_name) {
        setEmpty(false)
        setInfo(res)
      } else {
        setEmpty(true)
      }
    } catch (error) {}
    Toast.hide()
  }

  const getHistoryFund = async (uid: string, fund_code: string) => {
    setChartLoading(true)
    try {
      const res = await diagram({
        uid: uid,
        fund_code
      })
      let _list = res.list || []
      setTimeout(() => {
        setChartLoading(false)
        setChartTags(res.highlight)
        setChartLineData(_list)
        if (_list?.length > 0) {
          setChartEmpty(false)
          let _chartLegendTime = _list[_list?.length - 1].date
          let _chartLegend: any = {}
          setChartLegendTime(_chartLegendTime)
          _list.map((item: any) => {
            if (item.date === _chartLegendTime) {
              _chartLegend[item.type] = item.value
            }
          })
          setChartLegend(_chartLegend)
        } else {
          setChartEmpty(true)
        }
      }, 400)
    } catch (error) {
      setChartEmpty(true)
      setChartLoading(false)
    }

    Toast.hide()
  }

  useEffect(() => {
    setTitle('买卖点信号详情')
    const query = history.location.query as {
      token: string
      uid: string
      fund_code: string
      chn: string
      did: string
    }

    setLocalToken(query.token)

    init(query.uid, query.fund_code)
    getHistoryFund(query.uid, query.fund_code)

    ts_in = Date.now()
    sendPoint({
      app: 5001,
      uid: query.uid,
      chn: query.chn || 'mini_program', // 渠道：mini_program(默认)
      did: query.did || null, // 渠道：mini_program(默认)
      pageid: pageid,
      ts: ts_in,
      event: 'load'
    })
  }, [])

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
      baseAreaChart({
        id: 'historicalNewsLineChart',
        data: chartLineData,
        colors: ['#545968'],
        showArea: false,
        onChange: onChartChange,
        onHide: onHide,
        tags: chartTags,
        min: 0.5,
        max: 5.5,
        ticksY: [1, 2, 3, 4, 5],
        labelY: (val) => {
          {
            const cfg = {
              text: ''
            }
            cfg.text = level_color[val].text
            return cfg
          }
        }
      })
    }
  }, [chartLineData])

  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      let _data: {
        value: number
        type: string
        date: string
      }[] = []
      let _y = [0.5, 1, 1, 1, 1, 1]

      _y.map((item, index) => {
        _data.push({
          value: item,
          type: `${index}`,
          date: chartLineData[0].date
        })
        _data.push({
          value: item,
          type: `${index}`,
          date: chartLineData[chartLineData.length - 1].date
        })
      })
      baseAreaChart({
        id: 'backLineChart',
        data: _data,
        colors: ['transparent'],
        areaColors: areaColors,
        min: 0.5,
        max: 5.5,
        ticksY: [1, 2, 3, 4, 5],
        adjust: 'stack',
        labelY: (val) => {
          {
            const cfg = {
              text: ''
            }
            cfg.text = level_color[val].text
            return cfg
          }
        }
      })
    }
  }, [chartLineData])

  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {empty ? (
        <div
          style={{
            marginTop: '2rem'
          }}
        >
          <DefaultGraph
            title="暂无估值数据"
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
                  className="default-graph-subtitle"
                >
                  <span>如下情况会导致没有基金估值数据</span>
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
        <div className="signal-details">
          <div className="product-card">
            <div className="product-card-title">
              <span className="product-name">{info?.fund_name}</span>
              <span className="product-code">{info?.fund_code}</span>
            </div>
            {info?.tags?.length ? (
              <div className="product-tag-container">
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
          <div className="describe-container">
            <div style={info?.daily_level ? level_back[info?.daily_level] : level_back[1]}>
              <div
                className="describe-title"
                style={{
                  color: info?.daily_level
                    ? level_color[info.daily_level].color
                    : level_color[1].color
                }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${info?.sug_title || ''}`
                  }}
                />
              </div>
              <div className="describe-sub-title">
                <span>AI系统分析建议</span>
              </div>
              <div className="describe-content">
                <span className="describe">
                  {info?.info_text ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${info?.info_text}`
                      }}
                    />
                  ) : null}
                </span>
              </div>
            </div>
          </div>
          <div className="level-container">
            <div className="valuation">
              <span>短期估值</span>
              <div
                style={{
                  height: '.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  // alignItems: 'flex-end',
                  padding: '0 .3rem 0 .1rem'
                }}
                onClick={() => {
                  setModalContent('短期估值：基于昨日基金及市场净值数据深度分析计算出的估值数据。')
                }}
              >
                <img
                  src={helpIcon}
                  style={{
                    width: '.3rem',
                    height: '.3rem'
                  }}
                />
              </div>
            </div>
            <div className="level-bar-container">
              {Object.keys(level_color).map((item: any, index) => {
                return (
                  <div
                    style={{
                      // width: "19%",
                      flex: 1,
                      marginRight: index + 1 === Object.keys(level_color).length ? 0 : '.12rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div
                      style={{
                        background: item == info?.daily_level ? level_color[item].color : '#E9EAEF'
                      }}
                      className="level-bar"
                    />
                    <div
                      style={{
                        color: item == info?.daily_level ? level_color[item].color : '#9AA0B1'
                      }}
                      className="level-text"
                    >
                      {level_color[item].text}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="card-container">
            <div className="content-card">
              <div className="card-title">近30天此基金短期估值走势</div>
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
                                color: level_color[chartLegend[item]].color
                              }}
                            >
                              {level_color[chartLegend[item]].text}
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
                                background: '#545968',
                                marginRight: '.08rem'
                              }}
                            />
                            <span className="lengend-key">{item}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {chartLineData?.length > 0 && !chartLoading ? (
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
                      <canvas id="backLineChart" style={{ width: '100%', height: '100%' }} />
                      <canvas
                        id="historicalNewsLineChart"
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
                  ) : null}

                  {chartLineData?.length > 0 && !chartLoading ? (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      {Object.values(level_color).map((item, index) => {
                        return (
                          <div className="chart-tab">
                            <div
                              className="chart-tab-tag"
                              style={{
                                background: areaColors[index + 1]
                              }}
                            />
                            <div className="chart-tab-text">{item.text}</div>
                          </div>
                        )
                      })}
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
          </div>
        </div>
      )}
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
    </div>
  )
}
