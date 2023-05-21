import { useEffect, useState } from 'react'

import topImg from './assets/top.png'
import contentImg from './assets/content.png'
import buttonImg from './assets/button.png'
import { history } from 'umi'
import { arrivedH5, getMinAppLink } from './services'
import { sendPoint } from '@/utils/sendPoint'
import { setTitle } from '@/utils/setTitle'
import Toast from '@/components/Toast'

import './index.less'

const pageid: string = 'Minifundaide'
let ts_in: number = 0

export default function DouYin() {
  const query = history.location.query as {
    ad_channel: string
    adid: string
    creativeid: string
    creativetype: string
    clickid: string
  }

  const [, setMinAppLink] = useState<string>('')
  const toMinAppLink = async () => {
    Toast.show()
    try {
      const res = await getMinAppLink({
        ...query,
        path: 'pages/hold/index'
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
          <div
            className="jump-to-minapp-btn"
            onClick={() => {
              sendPoint({
                app: 6000,
                chn: query.ad_channel || 'mini_program', // 渠道：mini_program(默认)
                did: query.clickid || null, // 渠道：mini_program(默认)
                pageid: pageid,
                ts: Date.now(),
                event: 'h5register'
              })
              toMinAppLink()
            }}
          >
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
