/*
 * @Date: 2023-02-20 17:02:32
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-02 15:50:21
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/ActiveBall/OneBuyBall.tsx
 * @Description:
 */
import { TouchEvent, useEffect, useRef, useState } from 'react'
import Taro from '@/utils/Taro'
import FloatBall from '@/components/FloatBall/FloatBall'

import { callGetAllPageActivity } from './services'
import CacheManage from '@/utils/cacheManage'
import './OneBuyBall.less'
import { sendPoint } from '@/utils/sendPoint'
import useQuery from '../../useQuery'

interface ISpecialActivityDetail {
  show_txt: string
  type: string // 'one'
  url: string
  user_level: number
}

interface IPageActivity {
  [key: string]: {
    oneBuy?: ISpecialActivityDetail
    buyCountDown?: ISpecialActivityDetail
    specialChannel?: ISpecialActivityDetail
  }
}

interface IProps {
  path?: string
}

// 点击延期 图片
const postponeImg = 'https://static.licaimofang.com/wp-content/uploads/2023/02/postpone.png'
// 专属折扣倒计时  图片
const specialImg = 'https://static.licaimofang.com/wp-content/uploads/2023/02/special.png'
// 体验买卖信号  图片
const trialImg = 'https://static.licaimofang.com/wp-content/uploads/2023/02/trial.png'

const pageid = 'Underdetail'
/** 活动缓存 */
const oneBuyCache = new CacheManage<IPageActivity>({
  name: 'oneBuyCache',
  expireDuration: 1000, // 2 分钟最多请求一次
  newDataFunc: () => {
    return callGetAllPageActivity()
  }
})

export default function OneBuyBall(props: IProps) {
  const query = useQuery()
  const [show, setShow] = useState(true)
  const [oneBuy, setOneBuy] = useState<ISpecialActivityDetail>()
  const [special, setSepcial] = useState<ISpecialActivityDetail>()
  const [postpone, setPostpone] = useState<ISpecialActivityDetail>()

  const curPageRef = useRef<string>('/pages/web-signal-details/index')
  const activityNameRef = useRef<string>('')

  const handleClose = (e: TouchEvent) => {
    e.stopPropagation()
    setShow(false)
  }
  const handleClick = (item: ISpecialActivityDetail) => {
    sendPoint({
      pageid: pageid,
      event: 'click',
      ctrl: 'floating_ad',
      oid: activityNameRef.current
    })

    // 到我的页面
    if (item.url.indexOf('pages/member-buy/index') !== -1) {
      Taro.switchTab({
        url: '/pages/member-buy/index'
      })
    } else {
      Taro.navigateTo({
        url: item.url
      })
    }
  }
  useEffect(() => {
    if (oneBuy || special || postpone) {
      sendPoint({
        pageid: pageid,
        event: 'view',
        ctrl: 'floating_ad',
        oid: activityNameRef.current
      })
      console.log('OneBuyBall:', oneBuy || special || postpone)
    }
  }, [oneBuy, special, postpone])

  const loadPageAcitivty = () => {
    oneBuyCache.get().then((res) => {
      const activities = res[curPageRef.current]
      if (activities) {
        activityNameRef.current = Object.keys(activities)[0]
      }
      setOneBuy(activities?.oneBuy)
      setSepcial(activities?.specialChannel)
      setPostpone(activities?.buyCountDown)
    })
  }
  useEffect(() => {
    loadPageAcitivty()

    const timer = setTimeout(loadPageAcitivty, 2 * 1000)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [query])

  if (!show) return null

  if (oneBuy) {
    return (
      <FloatBall onClose={handleClose} onClick={() => handleClick(oneBuy)}>
        <div className="oneBuy animator">
          <img className="img" src={trialImg} />
          <div className="text">{oneBuy.show_txt}</div>
        </div>
      </FloatBall>
    )
  }
  if (special) {
    return (
      <FloatBall onClose={handleClose} onClick={() => handleClick(special)}>
        <div className="special animator">
          <img className="img" src={specialImg} />
          <div className="text">{special?.show_txt ?? '7天'}</div>
        </div>
      </FloatBall>
    )
  }

  if (postpone) {
    return (
      <FloatBall onClose={handleClose} onClick={() => handleClick(postpone)}>
        <div className="postpone animator">
          <img className="img" src={postponeImg} />
          <div className="textWrap">
            <span className="text">{postpone?.show_txt ?? '7天'}</span>
            <span className="desc">信号倒计时</span>
          </div>
        </div>
      </FloatBall>
    )
  }

  return null
}
