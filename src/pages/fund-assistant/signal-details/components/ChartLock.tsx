/*
 * @Date: 2023-02-09 17:49:33
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-10 16:03:24
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/ChartLock.tsx
 * @Description:
 */
import { usePageContext } from '../usePageContext'
// import signalMaskHistory from '@/assets/images/sign-detail/lock_mask_history.png'
import lockFillImg from '@/assets/images/sign-detail/lock-fill.png'
import addImg from '@/assets/images/sign-detail/add-1.png'
import { sendPoint } from '@/utils/sendPoint'
import { useEffect, useState } from 'react'
import useQuery from '../useQuery'

interface IProps {
  canvasId: string
}

export default function ChartLock(props: IProps) {
  const { canvasId } = props
  const query = useQuery()

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0
  })
  const { historyInfo, isToBuyCombo } = usePageContext()

  useEffect(() => {
    const canvas = document.getElementById(canvasId)

    setCanvasSize({
      width: canvas?.offsetWidth ?? 0,
      height: canvas?.offsetHeight ?? 0
    })
  }, [canvasId])

  const width = canvasSize.width * (1 / 3) - 20
  return (
    <div
      className="lockWrap"
      style={{ width }}
      onClick={() => {
        sendPoint({
          pageid: 'Underdetail',
          ts: Date.now(),
          event: `click1`,
          app: 5001,
          uid: query.uid,
          chn: query.chn || 'mini_program', // 渠道：mini_program(默认)
          did: query.did || null, // 渠道：mini_program(默认)
          oid: query.fund_code
        })
        isToBuyCombo?.()
      }}
    >
      <div className="blurBg"></div>
      <div className="scaleContent" style={{ transform: `scale(85%)` }}>
        <img className="lock" src={lockFillImg} alt="" />
        <span className="lock_text">点击解锁</span>
        <div className="addImgWrap">
          <img className="add" src={addImg} />
          <span className="add_text">买卖信号</span>
        </div>
        <div className="lockDesc">
          <span style={{ textAlign: 'center' }}>历史收益率可</span>
          <br />
          <span style={{ textAlign: 'center' }}>
            增加
            <span style={{ color: '#E74949' }}>
              {historyInfo?.fund_profit_info?.excess_profit?.profit}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
