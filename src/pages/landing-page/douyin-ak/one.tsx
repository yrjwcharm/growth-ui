import { useEffect, useState } from 'react'

import topImg from './assets/top.png'
import contentImg from './assets/content.png'
import buttonImg from './assets/button-99.png'
import { history } from 'umi'
import { arrivedH5, callGetWeixinPayment, callOrderPayStatusApi, getMinAppLink } from './services'
import { sendPoint } from '@/utils/sendPoint'
import { setTitle } from '@/utils/setTitle'
import Toast from '@/components/Toast'

import './index.less'
import debounce, { getStorage, setStorage } from '@/utils'
import { Dialog } from 'antd-mobile'
const pageid: string = 'Minifundaide'
let ts_in: number = 0
export default function DouYin() {
  const query = history.location.query as {
    ad_channel: string
    adid: string
    creativeid: string
    creativetype: string
    clickid: string
    order_no?: string
  }
  const [, setMinAppLink] = useState<string>('')
  const [, setCount] = useState<number>(0)
  const toMinAppLink = async (order_no: string | undefined) => {
    Toast.show({
      content: '请稍等...',
      icon: 'loading'
    })
    try {
      const res = await getMinAppLink({
        ...query,
        order_no,
        path: 'pages/buy-sell-signal/index'
      })
      if (res.url_link) {
        setMinAppLink(res.url_link)
        window.location.href = res.url_link
      } else {
        Toast.failed('系统繁忙，请稍后重试')
      }
    } catch (error) {}
    Toast.hide()
  }
  useEffect(() => {
    const order_no = getStorage('order_no')
    if (!query.order_no) return
    if (query.order_no == order_no) {
      Dialog.show({
        title: '支付确认',
        closeOnMaskClick: false,
        content:
          '如您已确认支付，可以点击下方”立即领取“按钮打开《基金助手小程序》，完成授权登录后将自动获得套餐。否则点击”取消“放弃支付。',
        closeOnAction: false,
        actions: [
          [
            {
              key: 'confirm',
              text: '立即领取',
              bold: true,
              style: { color: '#0051cc' },
              onClick: () => {
                /**同步形式查询订单状态
                 * @params order_no
                 */
                new Promise((resolve) => {
                  setCount((count) => {
                    resolve(count)
                    return count + 1
                  })
                }).then(async (res) => {
                  const response = await callOrderPayStatusApi(query.order_no)
                  if (response.is_pay == 1) {
                    toMinAppLink(query.order_no)
                  } else {
                    if ((res as number) > 1) {
                      Dialog.clear()
                      return
                    }
                    Toast.show({
                      content: '您的订单还未完成支付，请重新支付',
                      icon: 'fail'
                    })
                  }
                })
              }
            }
          ]
        ]
      })
    }
    return () => {
      order_no && localStorage.removeItem('order_no')
    }
  }, [query.order_no])
  /**
   *  获取微信外部浏览器跳转支付url todo 价格后期再说 目前写死就行
   */
  const sendPayRequest = async () => {
    sendPoint({
      app: 6000,
      chn: query.ad_channel || 'mini_program', // 渠道：mini_program(默认)
      did: query.clickid || null, // 渠道：mini_program(默认)
      pageid: pageid,
      ts: Date.now(),
      event: 'h5register'
    })
    const res = await callGetWeixinPayment({
      product_id: '1',
      price: 9.9,
      pay_type: 'wxmp',
      pay_way: 'h5',
      ad_info: JSON.stringify(query)
    })
    const { url, order_no } = res
    setStorage('order_no', order_no)
    window.location.replace(decodeURIComponent(url))
  }
  const dataReturn = async () => {
    let _query_str = ''
    try {
      _query_str = JSON.stringify(query)
    } catch (error) {}
    try {
      await arrivedH5({
        ad_info: `${_query_str}`
      })
    } catch (error) {}
  }

  useEffect(() => {
    setTitle('')
  }, [])

  useEffect(() => {
    if (query.ad_channel) {
      dataReturn()
    }
  }, [])

  useEffect(() => {
    ts_in = Date.now()
    sendPoint({
      app: 6000,
      chn: query.ad_channel || 'mini_program', // 渠道：mini_program(默认)
      did: query.clickid || null, // 渠道：mini_program(默认)
      pageid: pageid,
      ts: ts_in,
      event: 'h5load'
    })
  }, [])

  return (
    <div className="douyin-page">
      <div>
        <div
          style={{
            fontSize: 0,
            position: 'relative'
          }}
        >
          <img
            src={topImg}
            alt=""
            style={{
              width: '100%'
            }}
          />
          <div className="jump-to-minapp-btn" onClick={debounce(sendPayRequest, 1000, true)}>
            <img
              style={{
                width: '100%'
              }}
              src={buttonImg}
              alt=""
            />
          </div>
        </div>
        <img
          src={contentImg}
          alt=""
          style={{
            width: '100%'
          }}
        />
      </div>

      {/* <div
        style={{
          width: '100%',
          // height: 'calc(100% - 1rem)'
          height: '100%'
        }}
      >
        <iframe
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto'
          }}
          src="https://sky.baoyun18.com/m/short2020/trial?wareId=23224&accountId=10000737013&aSign=a5b095f27a17be9d046f3b75102ec9bb&partner=67000"
        ></iframe>
      </div>

      <div
        style={{
          width: '1rem',
          height: '1rem',
          position: 'fixed',
          bottom: '1rem',
          background: 'pink'
        }}
      >
        这是一个悬浮的按钮
      </div> */}
    </div>
  )
}
