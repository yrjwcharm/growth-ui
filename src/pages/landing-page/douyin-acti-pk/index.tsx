import { useEffect, useState } from 'react'

import topImg from './assets/top.png'
import contentImg1 from './assets/content1.png'
import contentImg2 from './assets/content2.png'
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

  const [contentImgArr] = useState<string[]>([contentImg1, contentImg2])

  const [, setMinAppLink] = useState<string>('')
  const toMinAppLink = async () => {
    Toast.show({ content: '请稍等...' })
    try {
      const res = await getMinAppLink({
        ...query,
        path: 'pages/activity/index'
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

    // return () => {
    //   sendPoint({
    //     app: 6000,
    //     chn: query.ad_channel || 'mini_program', // 渠道：mini_program(默认)
    //     did: query.clickid || null, // 渠道：mini_program(默认)
    //     pageid: pageid,
    //     ts: Date.now(),
    //     staytime: Date.now() - ts_in,
    //     event: 'h5load'
    //   })
    // }
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
        {contentImgArr?.map((item) => {
          return (
            <img
              src={item}
              alt=""
              style={{
                width: '100%'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
