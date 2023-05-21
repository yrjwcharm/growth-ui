import { useEffect, useState } from 'react'
import './index.less'
import { callBuyPriceApi } from '@/components/CommonModal/services'
const CommonModal = ({
  title = '',
  bool = true,
  index = 0,
  isClose = true,
  closeModal = () => {},
  lookSample = () => {},
  openMember = () => {}
}) => {
  const [item, setItem] = useState<any>({})
  const [price, setPrice] = useState<string>('')
  const [listItems, setListItems] = useState([
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_buy_signal.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_buy_signal.png',
      background: require('@/assets/images/member-buy/svg/buy_signal.svg'),
      explain: `买卖点信号`,
      title: '查看基金买卖点',
      isActive: true,
      swiperHeight: '161PX',
      bannerHeight: '161PX',
      bannerList: [
        'https://static.licaimofang.com/wp-content/uploads/2023/03/buy_signal_pop-3.png'
      ],
      separatorWidth: '2PX',
      separatorHeight: '37PX',
      titleComponent: () => (
        <div className="nav_right">
          <span>会买的是徒弟，会卖的是师傅。</span>
          <span>
            买卖点信号采用AI系统为您所关心基金，<span className="bold_title">提供买卖点信</span>
            <span className="bold_title">号</span>，并适时送上贴心提醒，
            <span className="bold_title">助您低位建仓高位逃顶</span>。
          </span>
        </div>
      )
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_fixed.png',
      selectImg: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_fixed.png',
      background: require('@/assets/images/member-buy/svg/fixed.svg'),
      explain: '智能定投管家',
      title: '定制你的定投方案',
      isActive: false,
      swiperHeight: '174PX',
      bannerHeight: '174PX',
      bannerList: [
        require('./images/fixed_pop.png')
        // 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-2_fixed_bg.png',
      ],
      separatorWidth: '2PX',
      separatorHeight: '24PX',
      titleComponent: () => (
        <div className="nav_right">
          <span>最合适的才是最好的 </span>
          <span className="bold_title">
            定投管家为您打造<span>最适合您的定投计划</span>。
          </span>
        </div>
      )
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_family_class.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_family_class.png',
      background: require('@/assets/images/member-buy/svg/family_class.svg'),
      explain: '家庭理财课程',
      title: '学习完整课程',
      isActive: false,
      swiperHeight: '174PX',
      bannerHeight: '174PX',
      bannerList: [require('./images/family_pop.png')],
      separatorWidth: '2PX',
      separatorHeight: '24PX',
      titleComponent: () => (
        <div className="nav_right">
          <span>
            <span className="bold_title">提升您从小白到专家的投资认知</span>
            ，您赚的每一分钱都是认识的变现。
          </span>
        </div>
      )
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_fund_report.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_fund_report.png',
      background: require('@/assets/images/member-buy/svg/fund_report.svg'),
      explain: '基金投研报告',
      title: '',
      isActive: false,
      swiperHeight: '161PX',
      bannerHeight: '161PX',
      bannerList: [
        require('./images/fund_pop.png')
        // 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-2_fund_report.png',
      ],
      separatorWidth: '2PX',
      separatorHeight: '37PX',
      titleComponent: () => (
        <div className="nav_right">
          <span>
            工欲善其事，必先利其器 ！精选投研报告，为您提供全面、系统、客观的
            <span className="bold_title">基金分析体系，降低您的投资失误和风险</span>。
          </span>
        </div>
      )
    },
    {
      img: 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_community_group.png',
      selectImg:
        'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-1_select_community_group.png',
      background: require('@/assets/images/member-buy/svg/invest_group.svg'),
      explain: '投资大咖社群',
      isActive: false,
      title: '',
      swiperHeight: '176PX',
      bannerHeight: '176PX',
      bannerList: [
        require('./images/group_pop.png')
        // 'https://static.licaimofang.com/wp-content/uploads/2022/12/ass-2_invest_group_bg.png',
      ],
      separatorWidth: '2PX',
      separatorHeight: '24PX',
      titleComponent: () => (
        <div className="nav_right">
          <span>想要和更多基金投资大咖交流？想要更多基金研究干货，投资线索？都在VIP社群</span>
        </div>
      )
    }
  ])
  useEffect(() => {
    listItems.map((el, i) => {
      el.isActive = i == index
    })
    setListItems([...listItems])
    setItem(listItems[index])
  }, [index])
  const selPrivilege = (el: any, index: number) => {
    listItems.map((item) => {
      item.isActive = false
      if (JSON.stringify(item) == JSON.stringify(el)) {
        item.isActive = true
      }
    })
    setItem(listItems[index])
    setListItems([...listItems])
  }
  useEffect(() => {
    ;(async () => {
      /**
       * 获取弹窗底部文案
       */
      const res = await callBuyPriceApi()
      setPrice(res)
    })()
  }, [])
  return (
    <div className="fixed_common_modal">
      <div className="modal">
        {isClose && (
          <img
            src={require('@/assets/images/close_circle.png')}
            onClick={closeModal}
            className="close_circle"
            alt=""
          />
        )}
        <span className="title">开通套餐{title ? `-${listItems[index]['title']}` : title}</span>
        {bool && (
          <div className="check_sample" onClick={lookSample}>
            <span className="txt">查看样例</span>
            <img src={require('@/assets/images/arrow_right.png')} className="arrow_right" alt="" />
          </div>
        )}
        <img src={require('@/assets/images/divider.png')} className="divider_img" alt="" />
        <div className="privilege_flex">
          {listItems.map((el, index) => {
            return (
              <div
                key={el + '' + index}
                className="privilege_item"
                onClick={() => selPrivilege(el, index)}
              >
                <img alt="" src={el.isActive ? el.selectImg : el.img} className="img" />
                <span
                  className="explain"
                  style={{
                    color: el.isActive ? '#121D3A' : '#545968',
                    fontFamily: el.isActive ? 'PingFangSC-Medium' : 'PingFangSC-Regular',
                    fontWeight: el.isActive ? 'bold' : 'normal'
                  }}
                >
                  {index == 0 ? (
                    <span>
                      {el.explain.substring(0, 4)}
                      <br />
                    </span>
                  ) : (
                    el.explain
                  )}
                  {index == 0 && <span>{el.explain.charAt(el.explain.length - 1)}</span>}
                </span>
              </div>
            )
          })}
        </div>
        {Object.keys(item).length > 0 && (
          <div
            className="footer_content"
            style={{
              background: `url(${item['background']}) no-repeat`,
              backgroundSize: 'cover'
            }}
          >
            <div className="nav">
              <div
                className="separator"
                style={{ width: item['separatorWidth'], height: item['separatorHeight'] }}
              />
              {item['titleComponent']?.()}
            </div>
            {item['bannerList']?.map((el: any) => {
              return (
                <img
                  src={el}
                  className="image"
                  style={{ height: item['bannerHeight'], width: '100%' }}
                  alt=""
                />
              )
            })}
          </div>
        )}
        <div className="btn" onClick={openMember}>
          <span>每天仅需{price}元，开通套餐</span>
        </div>
      </div>
    </div>
  )
}
export default CommonModal
