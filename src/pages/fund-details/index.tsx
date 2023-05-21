import HeaderComponent from './components/HeaderComponent'
import SectionComponent from './components/SectionComponent'
import FooterComponent from './components/FooterComponent'
import { setLocalToken } from '@/utils'
import { useEffect, useState } from 'react'
import { callEstiNavApi, callGetFundInfoApi } from '@/pages/fund-details/services'
import useQuery from '@/pages/fund-assistant/signal-details/useQuery'
import Loading from '@/components/Loading'
import EventBus from '@/utils/EventBus'
const FundDetails = () => {
  const { fund_code = 'j   ', uid = '1007034977', token } = useQuery()
  const [valuation_nav, setValuation_nav] = useState<string>('')
  const [valuation_date, setValuationDate] = useState<string>('')
  const [valuation_cur_gain, setValuationCurGain] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [info, setInfo] = useState<TInfo>({
    view: { bullet_screen_open: 0, expect_rise_fall: 0, fall: '', rise: '' },
    code: '',
    funding_date: '',
    is_monetary: false,
    name: '',
    nav_info: { daily_return: '', date: '', inc: 0, inc_ratio: 0, nav: 0, week_apr: 0 },
    year_yield: { title: '', value: '' }
  })
  const [day_inc, setDayInc] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [inc_type, setIncType] = useState<string>('')
  /**
   * 获取基金基本信息
   */
  const loadData = async (fund_code: string) => {
    const res = await callGetFundInfoApi(fund_code)
    setInfo(res.info)
    setLoading(false)
  }
  /**
   * 获取净值估算曲线图
   */
  const loadEstiData = async () => {
    const res = await callEstiNavApi({
      uid,
      fund_code
    })
    const { valuation_cur_gain = '', valuation_nav = '', valuation_date = '' } = res?.valuation_info
    const {
      day_inc,
      inc_time: { title, time },
      inc_type
    } = res?.day_info
    setValuation_nav(valuation_nav)
    setValuationCurGain(valuation_cur_gain)
    setValuationDate(valuation_date)
    setDayInc(day_inc)
    setTitle(title)
    setTime(time)
    setIncType(inc_type)
  }
  useEffect(() => {
    if (!fund_code) return
    setLocalToken(token)
    let before = Date.now()
    let timer = setInterval(() => {
      let now = Date.now()
      if (now - before > 40000) {
        loadEstiData().then((r) => {})
        before = now
      }
    }, 1000)
    loadEstiData().then((r) => {})
    loadData(fund_code)
    return () => {
      timer && clearInterval(timer)
    }
  }, [fund_code])
  useEffect(() => {
    EventBus.addListener('updateRaiseFall', () => {
      loadData(fund_code)
    })
    return () => {
      EventBus.removeListener('updateRaiseFall', () => {})
    }
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="fund_details_box">
          {/*头部*/}
          <HeaderComponent
            info={info}
            inc_type={inc_type}
            day_inc={day_inc}
            title={title}
            time={time}
            fund_code={fund_code}
            uid={uid}
          />
          <div
            style={{
              height: '8px',
              background: '#f5f6f8'
            }}
          />
          {/*主体*/}
          <SectionComponent
            info={info}
            fund_code={fund_code}
            uid={uid}
            valuation_nav={valuation_nav}
            valuation_cur_gain={valuation_cur_gain}
          />
          {/*底部工具栏*/}
          <FooterComponent
            info={info}
            valuation_nav={valuation_nav}
            valuation_cur_gain={valuation_cur_gain}
            valuation_date={valuation_date}
          />
        </div>
      )}
    </>
  )
}
export default FundDetails
