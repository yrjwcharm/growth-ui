import copyText from '@/utils/copy'
import { sendPoint } from '@/utils/sendPoint'
import { FC, useEffect, useState } from 'react'

interface IProps {
  data?: {
    button?: string | undefined
    jump_url?: string | undefined
    pop_up?: string | undefined
  }
  query: any
  closeModal?: () => void
}

const pageid: string = 'Funddiagnosis'

const DownLoadModal: FC<IProps> = ({ data, closeModal, query }) => {
  const [toastText, setToastText] = useState<string>('')

  useEffect(() => {
    if (toastText) {
      const timer = setTimeout(() => {
        setToastText('')
        if (closeModal) closeModal()
        if (timer) {
          clearTimeout(timer)
        }
      }, 2000)
    }
  }, [toastText])
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '30%'
      }}
      onClick={() => {
        if (closeModal) closeModal()
      }}
    >
      <div
        style={{
          position: 'relative'
        }}
      >
        <img
          style={{
            width: '5.6rem'
          }}
          src={data?.pop_up}
          alt=""
        />
        <div
          style={{
            padding: '0 .6rem',
            position: 'absolute',
            bottom: '.56rem'
          }}
        >
          <img
            style={{
              width: '100%'
            }}
            src={data?.button}
            alt=""
            onClick={(e) => {
              e.stopPropagation()
              sendPoint({
                app: 5001,
                uid: query.uid,
                chn: query.chn || 'mini_program', // 渠道：mini_program(默认)
                did: query.did || null, // 渠道：mini_program(默认)
                pageid: pageid,
                ts: Date.now(),
                oid: query.fund_code,
                event: 'click'
              })
              if (data?.jump_url) {
                const res = copyText(data.jump_url)
                if (res) {
                  setToastText('复制成功，前往浏览器访问下载吧')
                } else {
                  setToastText('复制失败，请稍后重试')
                }
              } else {
                setToastText('复制失败，请稍后重试')
              }
            }}
          />
        </div>
        {toastText ? (
          <div
            style={{
              position: 'absolute',
              top: '4.8rem',
              left: 0,
              right: 0,
              margin: 'auto',
              width: '4.8rem',
              padding: '.12rem .32rem',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              fontSize: '.32rem',
              borderRadius: '.1rem',
              textAlign: 'center'
            }}
          >
            {toastText}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DownLoadModal
