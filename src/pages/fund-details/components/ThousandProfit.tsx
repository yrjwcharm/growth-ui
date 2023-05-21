import './ThousandProfit.less'
import { useEffect, useRef, useState } from 'react'
import BaseAreaChart from '@/components/Chart/BaseAreaChart'
import { cloneDeep } from 'lodash'
import { decorationColor } from '@/utils/common'
import DefaultGraph from '@/components/DefaultGraph'
import Loading from '@/components/Loading'
import {
  callBarrageListApi,
  callBarrageOpenCloseApi,
  callRaiseFallApi,
  callSendBarrageApi,
  callThousandProfitApi
} from '@/pages/fund-details/services'
import { Popup, TextArea, Toast } from 'antd-mobile'
import BulletScreen from 'rc-bullets-ts'
import OpenBarrage from '@/assets/images/fund-details/open-barrage.png'
import CloseBarrage from '@/assets/images/fund-details/close_barrage.png'
import RaiseSelect from '@/assets/images/fund-details/rasie_select.png'
import Raise from '@/assets/images/fund-details/raise.png'
import EventBus from '@/utils/EventBus'
import FallSelect from '@/assets/images/fund-details/fall_select.png'
import Fall from '@/assets/images/fund-details/fall.png'
const ThousandProfit = ({ fund_code, info }: { fund_code: string; info: TInfo }) => {
  const [colorList, setColorList] = useState<
    {
      color: string
      isActive: boolean
      colorTxt: string
      colorType: string
    }[]
  >([
    {
      color: '#9AA1B2',
      colorTxt: '灰色',
      isActive: true,
      colorType: 'gray'
    },
    {
      color: '#E74949',
      colorTxt: '红色',
      isActive: false,
      colorType: 'red'
    },
    {
      color: '#4BA471',
      colorTxt: '绿色',
      isActive: false,
      colorType: 'green'
    }
  ])
  const maxLimitRef = useRef<number>(20)
  const [open, setOpen] = useState<boolean>(true)
  const [click0, setClick0] = useState<boolean>(true)
  const [click1, setClick1] = useState<boolean>(false)
  const [count, setCount] = useState<number>(20)
  const [timePeriod, setTimePeriod] = useState<string>('m3')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState<any>([])
  const [showColorPanel, setShowColorPanel] = useState<boolean>(false)
  const [color, setColor] = useState<string>('gray')
  const [visible, setVisible] = useState<boolean>(false)
  const [keywords, setKeywords] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const textareaRef = useRef(null)
  const [[leftSide, centerSide], setChartLabel] = useState<{ key: string; val: string }[]>([])
  const chartLabelDefaultRef = useRef({})
  const onChange = (items: any) => {
    setChartLabel((prev: any) => {
      const next = cloneDeep(prev)
      next[0].val = items[0].title
      next[1].val = items[0].value || '0%'
      return next
    })
  }
  useEffect(() => {
    ;(async () => {
      if (!fund_code) return
      setColor(localStorage.getItem('color') ?? 'gray')
      const res = await callThousandProfitApi({
        fund_code,
        period: timePeriod
      })
      if (res?.chart_list?.chart?.length > 0) setIsEmpty(false)
      else setIsEmpty(true)
      setChartData(res?.chart_list)
      setChartLabel(res?.chart_list?.label ?? [])
      chartLabelDefaultRef.current = res?.chart_list?.label ?? []
      setLoading(false)
    })()
  }, [fund_code, timePeriod])
  useEffect(() => {
    if (!fund_code) return
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    let timer: NodeJS.Timer
    if (chartData?.chart?.length > 0) {
      let big = new BulletScreen(document.querySelector('.acc_profit_chart'))
      let small = new BulletScreen(document.querySelector('.small_screen'))
      timer = setInterval(async () => {
        const res = await callBarrageListApi({
          page,
          limit: 1,
          fund_code
        })
        if (Array.isArray(res) && res.length > 0) {
          let list = res.map((item: { ass_msg: string; ass_color: string }, index: number) => {
            return {
              msg: item.ass_msg,
              color:
                item.ass_color == 'red'
                  ? '#E74949'
                  : item.ass_color == 'gray'
                  ? '#9AA1B2'
                  : '#4BA471'
            }
          })

          big.push(list[0])
          small.push(list[0])
          setPage((page) => page + 1)
        }
      }, 2500)
    }
    return () => {
      timer && clearInterval(timer)
    }
  })
  const onTextareaChange = (value: string) => {
    setKeywords(value)
    setCount(value.length > 20 ? 0 : maxLimitRef.current - value.length)
  }
  useEffect(() => {
    //弹幕是否开启 是否选中看涨、看跌 或者取消
    if (info?.view?.expect_rise_fall == 2) {
      setClick0(false)
      setClick1(false)
    } else if (info?.view?.expect_rise_fall == 1) {
      setClick0(true)
      setClick1(false)
    } else {
      setClick0(false)
      setClick1(true)
    }
    setOpen(info?.view?.bullet_screen_open == 1)
  }, [info])
  const sendBarrage = async () => {
    if (!keywords) {
      Toast.show({
        content: '请输入弹幕'
      })
      return
    }
    const res = await callSendBarrageApi({
      fund_code,
      msg: keywords,
      color
    })
    if (Object.keys(res).length == 0) {
      // @ts-ignore
      textareaRef.current!.clear()
      setKeywords('')
    }
  }
  const selColor = (item: {
    color: string
    colorType: string
    isActive: boolean
    colorTxt: string
  }) => {
    colorList.map((el) => {
      el.isActive = JSON.stringify(el) === JSON.stringify(item)
    })
    setColorList([...colorList])
    setColor(item.colorType)
    localStorage.setItem('color', item.colorType)
  }
  /**
   * 期限组件
   */
  const PeriodCom: any = ({ chartData, timePeriod }: { chartData: any; timePeriod: string }) => {
    return (
      <div className="period-wrap">
        {chartData?.chart_time?.map((el: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                setTimePeriod(el.value)
              }}
              className="period_item"
              style={
                timePeriod == el.value ? { background: '#DEE8FF' } : { background: 'transparent' }
              }
            >
              <span
                style={
                  timePeriod == el.value
                    ? {
                        fontFamily: 'PingFangSC-Medium',
                        color: '#0051cc',
                        fontWeight: '500'
                      }
                    : {
                        fontFamily: 'PingFangSC-Regular',
                        color: '#545968',
                        fontWeight: 400
                      }
                }
              >
                {el.key}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div
      style={{
        height: '300px'
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="fund_details_thousand_profit">
          {!isEmpty ? (
            <>
              {chartData?.chart?.length > 0 && (
                <>
                  {/*万分收益曲线legend*/}
                  <div className="acc_legend">
                    <span className="date_label">{leftSide?.key}</span>
                    <span className="date_value">{leftSide?.val}</span>
                    <div className="line_color" />
                    <span className="acc_label">{centerSide?.key}</span>
                    <span
                      className="value"
                      style={{
                        color: decorationColor(centerSide?.val)
                      }}
                    >
                      {centerSide?.val}
                    </span>
                  </div>

                  {/*万分收益图表*/}
                  <div className="acc_profit_chart" style={{ marginTop: '16px' }}>
                    <BaseAreaChart
                      id="perf"
                      areaColors={['l(90) 0:#3370ff 1:#fff', 'transparent', '#3370ff']}
                      colors={['#3370ff']}
                      data={chartData?.chart}
                      onChange={(obj: any) => {
                        const { items } = obj
                        onChange(items)
                      }}
                      ownColor={false}
                      onHide={() => {
                        setChartLabel(
                          chartLabelDefaultRef?.current as { key: string; val: string }[]
                        )
                      }}
                      padding={[5, 20, 20, 50]}
                      percent={false}
                      showArea={true}
                      showDate={true}
                      tofixed={2}
                    />
                    <PeriodCom chartData={chartData} timePeriod={timePeriod} />
                  </div>

                  {/* 弹幕*/}
                  <Popup
                    className="Popup"
                    style={{
                      position: 'relative',
                      zIndex: visible ? 99 : -9999
                    }}
                    closeOnMaskClick={true}
                    visible={true}
                    onMaskClick={() => {
                      setVisible(false)
                    }}
                    bodyStyle={{
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                      minHeight: '280px',
                      width: '100vw'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div className="acc_legend">
                        <span className="date_label">{leftSide?.key}</span>
                        <span className="date_value">{leftSide?.val}</span>
                        <div className="line_color" />
                        <span className="acc_label">{centerSide?.key}</span>
                        <span
                          className="value"
                          style={{
                            color: decorationColor(centerSide?.val)
                          }}
                        >
                          {centerSide?.val}
                        </span>
                      </div>
                      <div style={{ height: '16px' }} />
                      {chartData?.chart?.length > 0 && (
                        <>
                          {!showColorPanel && (
                            <div style={{ width: '100%' }} className="small_screen">
                              <BaseAreaChart
                                id="perf1"
                                areaColors={['l(90) 0:#3370ff 1:#fff', 'transparent', '#3370ff']}
                                colors={['#3370ff']}
                                data={chartData?.chart}
                                onChange={(obj: any) => {
                                  const { items } = obj
                                  onChange(items)
                                }}
                                ownColor={false}
                                onHide={() => {
                                  setChartLabel(
                                    chartLabelDefaultRef?.current as { key: string; val: string }[]
                                  )
                                }}
                                padding={[5, 20, 20, 50]}
                                percent={false}
                                showArea={true}
                                showDate={true}
                                tofixed={2}
                              />
                            </div>
                          )}
                          <PeriodCom chartData={chartData} timePeriod={timePeriod} />
                        </>
                      )}
                      <div className="send_barrage">
                        <img
                          onClick={() => {
                            setShowColorPanel(true)
                          }}
                          src={
                            color === 'gray'
                              ? require('@/assets/images/fund-details/gray_icon.png')
                              : color === 'green'
                              ? require('@/assets/images/fund-details/green_icon.png')
                              : require('@/assets/images/fund-details/red_icon.png')
                          }
                          alt=""
                          className="icon"
                        />
                        <div className="textarea_input">
                          <TextArea
                            ref={textareaRef}
                            onFocus={() => {
                              setShowColorPanel(false)
                            }}
                            style={{
                              '--color':
                                color == 'gray'
                                  ? '#9AA1B2'
                                  : color == 'green'
                                  ? '#4BA471'
                                  : '#E74949',
                              caretColor: '#545958'
                            }}
                            onChange={onTextareaChange}
                            className="textarea"
                            placeholder=""
                            maxLength={20}
                            autoSize={{ minRows: 1, maxRows: 1 }}
                          />
                          <span className="limit">{count}</span>
                        </div>
                        <div className="send_btn" onClick={sendBarrage}>
                          <span
                            className="txt_send"
                            style={{
                              color: keywords.length > 0 ? '#0051CC' : '#9AA1B2'
                            }}
                          >
                            发送
                          </span>
                        </div>
                      </div>
                      {showColorPanel && (
                        <div className="edit_color_wrap">
                          <span className="title">选择弹幕颜色</span>
                          <div className="color_list">
                            {colorList.map((el, index) => {
                              return (
                                <div
                                  key={el + `` + index}
                                  className="color_wrap"
                                  onClick={() => selColor(el)}
                                >
                                  <div
                                    className="color_items"
                                    style={{
                                      borderColor: el.isActive ? el.color : 'transparent'
                                    }}
                                  >
                                    <div
                                      className="inner"
                                      style={{
                                        background: el.color
                                      }}
                                    />
                                  </div>
                                  <span
                                    className="txt"
                                    style={{
                                      color: el.color
                                    }}
                                  >
                                    {el.colorTxt}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </Popup>
                  <div className="fund_details_barrage_box">
                    <div className="left_side" onClick={() => setVisible(true)}>
                      <div
                        className="barrage_icon"
                        onClick={async (e) => {
                          e.stopPropagation()
                          const res = await callBarrageOpenCloseApi({
                            fund_code,
                            type: open ? 0 : 1
                          })

                          if (Object.keys(res).length == 0) {
                            setOpen((prev) => {
                              if (prev) setPage(1)
                              return !prev
                            })
                          }
                        }}
                      >
                        <img src={open ? OpenBarrage : CloseBarrage} alt="" className="icon" />
                      </div>
                      <div className="click_barrage">点我发弹幕</div>
                    </div>
                    <div className="right_side">
                      <div
                        className="praise"
                        style={{
                          background: click0 ? `url(${RaiseSelect})` : `url(${Raise})`,
                          backgroundSize: click0 ? 'cover' : 'contain',
                          color: click0 ? '#fff' : '#E74949'
                        }}
                        onClick={async () => {
                          await callRaiseFallApi({
                            fund_code,
                            type: click0 ? 2 : 1
                          })
                          EventBus.emit('updateRaiseFall')
                          setClick1(false)
                          setClick0(!click0)
                        }}
                      >
                        <span>看涨{info?.view?.rise}人</span>
                        {click0 && (
                          <img
                            src={require('@/assets/images/fund-details/praise.png')}
                            className="icon"
                            alt=""
                          />
                        )}
                      </div>
                      <div
                        className="trample"
                        style={{
                          background: click1 ? `url(${FallSelect})` : `url(${Fall})`,
                          backgroundSize: click1 ? 'cover' : 'contain',
                          color: click1 ? '#fff' : '#4BA471'
                        }}
                        onClick={async () => {
                          await callRaiseFallApi({
                            fund_code,
                            type: click1 ? 2 : 0
                          })
                          EventBus.emit('updateRaiseFall')
                          setClick0(false)
                          setClick1(!click1)
                        }}
                      >
                        <span>看跌{info?.view?.fall}人</span>
                        {click1 && (
                          <img
                            src={require('@/assets/images/fund-details/cai.png')}
                            className="icon"
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div
              style={{
                height: '300px',
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
      )}
    </div>
  )
}
export default ThousandProfit
