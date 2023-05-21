import './Section.less'
import { useEffect, useState } from 'react'
import NavEstiChart from '../components/NavEstiChart'
import PerformanceTrend from '@/pages/fund-details/components/PerformanceTrend'
import HoldingProfit from '@/pages/fund-details/components/HoldingProfit'
import SevenDayAnnual from '@/pages/fund-details/components/SevenDayAnnual'
import ThousandProfit from '@/pages/fund-details/components/ThousandProfit'
const SectionComponent = ({
  fund_code,
  uid,
  info,
  valuation_cur_gain,
  valuation_nav
}: {
  info: TInfo
  fund_code: string
  uid: string
  valuation_nav: string
  valuation_cur_gain: string
}) => {
  const [id, setId] = useState<number>(1)
  const [tabs, setTabs] = useState<
    {
      title: string
      id: number
      isActive?: boolean
    }[]
  >([])
  const selTab = (el: { title: string; id: number; isActive?: boolean }) => {
    tabs.map((item) => {
      item.isActive = JSON.stringify(item) === JSON.stringify(el)
    })
    setId(el.id)
    setTabs([...tabs])
  }
  useEffect(() => {
    info?.is_monetary
      ? setTabs([
          {
            title: '万分收益',
            id: 1,
            isActive: true
          },
          {
            title: '七日年化',
            id: 2,
            isActive: false
          }
        ])
      : setTabs([
          {
            title: '净值估算',
            id: 1,
            isActive: true
          },
          {
            title: '业绩走势',
            id: 2,
            isActive: false
          },
          {
            title: '我的收益',
            id: 3,
            isActive: false
          }
        ])
  }, [info])

  return (
    <div className="fund_details_section_box">
      {info.hasOwnProperty('is_monetary') && (
        <div className="tabs">
          <div className="tab_wrap">
            {tabs?.map((el, index) => {
              return (
                <div
                  key={el.id}
                  className="tab_item"
                  onClick={() => selTab(el)}
                  style={{
                    color: el.isActive ? '#121D3A' : '#9AA1B2',
                    fontFamily: el.isActive ? 'PingFangSC-Medium' : 'PingFangSC-Regular',
                    fontWeight: el.isActive ? '500' : '400'
                  }}
                >
                  <span>{el.title}</span>
                  <div
                    className="tab_separator"
                    style={{
                      background: el.isActive ? '#121D3A' : 'transparent'
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div
        style={{
          minHeight: '300px'
        }}
      >
        {info?.is_monetary ? (
          <>
            {id == 1 && <ThousandProfit fund_code={fund_code} info={info} />}
            {id == 2 && <SevenDayAnnual fund_code={fund_code} />}
          </>
        ) : (
          <>
            {id == 1 && (
              <NavEstiChart
                fund_code={fund_code}
                uid={uid}
                info={info}
                gain={valuation_cur_gain}
                nav={valuation_nav}
                isBarrage={true}
              />
            )}
            {id == 2 && <PerformanceTrend fund_code={fund_code} uid={uid} info={info} />}
            {id == 3 && <HoldingProfit fund_code={fund_code} uid={uid} />}
          </>
        )}
      </div>
    </div>
  )
}
export default SectionComponent
