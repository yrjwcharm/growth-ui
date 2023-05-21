/*
 * @Date: 2023/2/17 15:00
 * @Author: yanruifeng
 * @Description:净值估算
 */
import './NavEsti.less'
import './Barrage.less'
import { baseAreaChart, LineChartDataType } from '@/utils/chartOption'
import { useEffect, useState, useCallback, useRef } from 'react'
import dayjs from 'dayjs'
import Loading from '@/components/Loading'
import { decorationColor } from '@/utils/common'
import {
  callBarrageListApi,
  callBarrageOpenCloseApi,
  callEstiNavApi,
  callRaiseFallApi,
  callSendBarrageApi
} from '@/pages/fund-details/services'
import OpenBarrage from '@/assets/images/fund-details/open-barrage.png'
import CloseBarrage from '@/assets/images/fund-details/close_barrage.png'
import RaiseSelect from '@/assets/images/fund-details/rasie_select.png'
import Raise from '@/assets/images/fund-details/raise.png'
import FallSelect from '@/assets/images/fund-details/fall_select.png'
import Fall from '@/assets/images/fund-details/fall.png'
import { Input, Popup, Toast } from 'antd-mobile'
import DefaultGraph from '@/components/DefaultGraph'
import BaseAreaChart from '@/components/Chart/BaseAreaChart'
import BulletScreen from 'rc-bullets-ts'
import EventBus from '@/utils/EventBus'
const NavEstiChart = ({
  gain,
  nav,
  isBarrage,
  fund_code,
  uid,
  info
}: {
  gain: string
  nav: string
  isBarrage?: boolean
  fund_code: string
  uid: string
  info: TInfo
}) => {
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
  const [click0, setClick0] = useState<boolean>(true)
  const [click1, setClick1] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [chartLegendTime, setChartLegendTime] = useState<string>('')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [keywords, setKeywords] = useState<string>('')
  const maxLimitRef = useRef<number>(20)
  const [open, setOpen] = useState<boolean>(true)
  const [count, setCount] = useState<number>(20)
  const [xLocation, setXLocation] = useState<number>(0)
  const [xLocation1, setXLocation1] = useState<number>(0)
  const [yLocation, setYLocation] = useState<number>(0)
  const [yLocation1, setYLocation1] = useState<number>(0)
  const [chartLineData, setChartLineData] = useState<LineChartDataType[]>([]) // 折线图数据
  const [chartLegend, setChartLegend] = useState<
    {
      id: number
      value: string
      label: string
      nav?: string
    }[]
  >([])
  const [showColorPanel, setShowColorPanel] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [color, setColor] = useState<string>('gray')
  const [page, setPage] = useState<number>(1)
  const textareaRef = useRef(null)
  // 弹幕内容
  useEffect(() => {
    if (gain) loadData().then((r) => {})
  }, [gain])
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

  useEffect(() => {
    if (!fund_code) return
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    let timer: NodeJS.Timer
    if (chartLineData?.length > 0) {
      let big = new BulletScreen(document.querySelector('.big_screen'))
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
  }, [chartLineData, fund_code, page])
  const loadData = async () => {
    if (fund_code) {
      const res = await callEstiNavApi({
        uid,
        fund_code
      })
      setColor(localStorage.getItem('color') ?? 'gray')
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
  const onAreaChange = ({ x, y }: { x: number; y: number }) => {
    console.log(x, y)
    setXLocation(x)
    setYLocation(y)
  }
  useEffect(() => {
    if (chartLineData && chartLineData.length > 0) {
      baseAreaChart({
        id: 'historicalNewsLineChart',
        data: chartLineData,
        percent: true,
        areaColors: [`l(90) 0:${decorationColor(gain) as string} 1:#fff`, 'transparent', '#50D88A'],
        tickCountX: 3,
        yunit: '%',
        colors: [decorationColor(gain) as string], // 老版本 ['l(90) 0:#3370ff 1:#f7f7f7'],
        showArea: true,
        onLastHalfAreaChange: onAreaChange,
        onChange: onChartChange,
        onHide: onHide,
        padding: [5, 20, 20, 50],
        isTimeDivision: true
      })
    }
  }, [chartLineData])
  const onTextareaChange = (value: string) => {
    setKeywords(value)
    setCount(value.length > 20 ? 0 : maxLimitRef.current - value.length)
  }
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
  const onArea1Change = ({ x, y }: { x: number; y: number }) => {
    console.log(x, y, '测试数据+++++')
    setXLocation1(x)
    setYLocation1(y)
  }
  return (
    <div style={{ height: '300px' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!isEmpty ? (
            <>
              <Esti
                chartLineData={chartLineData}
                chartLegend={chartLegend}
                isBarrage={isBarrage as boolean}
              />
              {chartLineData?.length > 0 && (
                <div
                  className="big_screen"
                  style={{
                    width: '100vw',
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
                      top: 0
                      // right: 5
                    }}
                  />
                  {xLocation && (
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 99,
                        top: yLocation - 5,
                        left: xLocation - 5
                      }}
                      className="effect_flash"
                    >
                      <div
                        className={
                          decorationColor(gain) == '#E74949'
                            ? 'point point-flicker'
                            : decorationColor(gain) == '#4BA471'
                            ? 'point-g point-g-flicker'
                            : ''
                        }
                      />
                    </div>
                  )}
                </div>
              )}
              <Popup
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
                  <Esti
                    chartLineData={chartLineData}
                    chartLegend={chartLegend}
                    isBarrage={isBarrage as boolean}
                  />
                  <div style={{ height: '16px' }} />
                  {chartLineData?.length > 0 && (
                    <>
                      <div style={{ width: '100%', position: 'relative' }} className="small_screen">
                        {!showColorPanel && (
                          <>
                            <BaseAreaChart
                              id="Esti"
                              padding={[5, 20, 20, 50]}
                              colors={[decorationColor(gain) as string]}
                              showArea={true}
                              areaColors={[
                                `l(90) 0:${decorationColor(gain) as string} 1:#fff`,
                                'transparent',
                                '#50D88A'
                              ]}
                              onLastHalfAreaChange={onArea1Change}
                              data={chartLineData}
                              isTag={false}
                              percent={true}
                            />
                            {xLocation1 && (
                              <div
                                style={{
                                  position: 'absolute',
                                  zIndex: 99,
                                  top: yLocation1 - 5,
                                  left: xLocation1 - 5
                                }}
                                className="effect_flash"
                              >
                                <div
                                  className={
                                    decorationColor(gain) == '#E74949'
                                      ? 'point point-flicker'
                                      : decorationColor(gain) == '#4BA471'
                                      ? 'point-g point-g-flicker'
                                      : ''
                                  }
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
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
                      <Input
                        ref={textareaRef}
                        onFocus={() => {
                          setShowColorPanel(false)
                        }}
                        style={{
                          '--color':
                            color == 'gray' ? '#9AA1B2' : color == 'green' ? '#4BA471' : '#E74949',
                          caretColor: '#545958'
                        }}
                        onChange={onTextareaChange}
                        className="textarea"
                        placeholder=""
                        maxLength={20}
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
                          if (prev) {
                            setPage(1)
                          }
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
          ) : (
            <DefaultGraph title="暂无数据" />
          )}
        </>
      )}
    </div>
  )
}
export const Esti = ({
  chartLineData,
  chartLegend
}: {
  chartLineData: LineChartDataType[]
  chartLegend: {
    id: number
    value: string
    label: string
    nav?: string
  }[]
  isBarrage: boolean
}) => {
  return (
    <div className="nav_esti_box">
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
    </div>
  )
}
export default NavEstiChart
