import { useRef, useState } from 'react'
import './Footer.less'
import debounce, { isIphoneX } from '@/utils'
import { Popup } from 'antd-mobile'
import ShareCom from '@/pages/fund-details/components/ShareCom'
const FooterComponent = ({
  info,
  valuation_nav,
  valuation_cur_gain,
  valuation_date
}: {
  info: TInfo
  valuation_nav: string
  valuation_cur_gain: string
  valuation_date: string
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [gestureModal, setGestureModal] = useState<boolean>(false)
  const bottomRef = useRef([
    // {
    //   icon: require('@/assets/images/fund-details/add_c.png'),
    //   title: '加仓',
    //   url:'',
    // },
    // {
    //   icon: require('@/assets/images/fund-details/decrease_c.png'),
    //   title: '减仓',
    //   url:''
    // },
    // {
    //   icon: require('@/assets/images/fund-details/trade.png'),
    //   title: '交易记录',
    //   url:''
    // },
    // {
    //   icon: require('@/assets/images/fund-details/reminder.png'),
    //   title: '提醒',
    //   url: ''
    // },
    {
      icon: require('@/assets/images/fund-details/dz.png'),
      title: '诊断',
      url: ''
    },
    {
      icon: require('@/assets/images/fund-details/fixed.png'),
      title: '定投',
      url: ''
    },
    // {
    //   icon: require('@/assets/images/fund-details/del_hold.png'),
    //   title: '删持有',
    //   url:''
    // },
    /*{
      icon: require('@/assets/images/fund-details/more.png'),
      title: '更多',
      url:''
    },*/
    {
      icon: require('@/assets/images/fund-details/share.png'),
      title: '分享',
      url: ''
    }
    // {
    //   icon: require('@/assets/images/fund-details/customer.png'),
    //   title: '客服',
    //   url:''
    // },
    // {
    //   icon: require('@/assets/images/fund-details/add_self_optional.png'),
    //   title: '加自选',
    //   url:''
    // },
    // {
    //   icon: require('@/assets/images/fund-details/del_self_optional.png'),
    //   title: '删自选',
    //   url:''
    // },
  ])
  const list = bottomRef.current.slice(0, 4)
  const floatList = bottomRef.current.slice(4)
  // list.push({
  //   title: '更多',
  //   icon: require('@/assets/images/fund-details/more.png'),
  //   url: ''
  // })
  // floatList.push({
  //   url: "",
  //   title:'删自选',
  //     icon: require('@/assets/images/fund-details/del_self_optional.png')
  // })
  const jumpToRemind: any = () => {
    window.wx.miniProgram.navigateTo({
      url: `/pages/raise-fall-remind/index?fund_code=${info.code}&fund_name=${info.name}&gain=${valuation_cur_gain}&nav=${valuation_nav}&date=${valuation_date}`
    })
  }
  return (
    <>
      <div className="fixed_tool">
        <div
          className="fund_details_footer_box"
          style={{
            marginBottom: isIphoneX() ? '34px' : 0
          }}
        >
          <div className="tool_wrap">
            {list?.map((item, index) => {
              return (
                <div
                  key={item + `` + index}
                  className="tool_item"
                  onClick={() => {
                    if (~item.title.indexOf('更多')) {
                      setVisible(true)
                    }
                    if (~item.title.indexOf('分享')) {
                      setGestureModal(true)
                    }
                    if (~item.title.indexOf('提醒')) {
                      debounce(jumpToRemind())
                    }
                    if (~item.title.indexOf('诊断')) {
                      window.wx.miniProgram.switchTab({
                        url: '/pages/fund-diagnosis-intro/index'
                      })
                    }
                    if (~item.title.indexOf(`定投`)) {
                      window.wx.miniProgram.switchTab({
                        url: '/pages/fixed-housekeeper/index'
                      })
                    }
                  }}
                >
                  <img src={item.icon} alt="" className="icon" />
                  <span className="title">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <ShareCom
        gestureGuide={gestureModal}
        confirmClick={() => {
          setGestureModal(false)
        }}
      />
      <Popup
        className="popup"
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{
          minHeight: '20vh'
        }}
      >
        <div className="more_wrap">
          <div className="tool_wrap">
            {floatList?.map((item, index) => {
              return (
                <div key={item + `` + index} className="tool_item">
                  <img src={item.icon} alt="" className="icon" />
                  <span className="title">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className="cancel_btn"
          onClick={() => {
            setVisible(false)
          }}
        >
          <span className="title">取消</span>
        </div>
      </Popup>
    </>
  )
}
export default FooterComponent
