/*
 * @Date: 2023-02-09 10:56:14
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-09 14:29:44
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/TodaySign.tsx
 * @Description: 今日买卖点信号
 */
import '../index.less'
import { sendPoint } from '@/utils/sendPoint'

import buy from '@/assets/images/buy.png'
import buyArea from '@/assets/images/buy_area.png'
import seal from '@/assets/images/seal.png'
import sealArea from '@/assets/images/seal_area.png'
import signalMask1 from '@/assets/images/sign-detail/lock_mask_today.png'
import { usePageContext } from '../usePageContext'
import useQuery from '@/pages/fund-assistant/signal-details/useQuery'

export default function TodaySign({ info }: { info: any }) {
  const { isLock, isToBuyCombo } = usePageContext()
  const { is_cover } = useQuery()

  return (
    <div className="describe-wrap">
      <img
        src={
          info?.daily_level == 1
            ? buy
            : info?.daily_level == 2
            ? buyArea
            : info?.daily_level == 4
            ? sealArea
            : info?.daily_level == 5
            ? seal
            : ''
        }
        className="signal-reverse"
        alt=""
      />
      {is_cover !== '1' && isLock && (
        <img
          src={signalMask1}
          onClick={async () => {
            sendPoint({
              pageid: 'Underdetail',
              // ts: ts_in_app,
              ts: Date.now(),
              event: `click1`
            })
            // @ts-ignore
            isToBuyCombo()
          }}
          className="signal_mask"
          alt=""
        />
      )}
    </div>
  )
}
