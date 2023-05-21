/*
 * @Date: 2023-02-08 18:39:37
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-08 18:43:00
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/ShareGuide.tsx
 * @Description: 点击分享按钮
 */
import { useState } from 'react'

import gestureGuideImg from '@/assets/images/gesture_guide.png'
import shareDot from '@/assets/images/more.png'

export default function ShareGuideBtn() {
  const [gestureGuide, setGestureGuide] = useState<boolean>(false)

  return (
    <>
      <div
        className="fixed-button"
        onClick={() => {
          setGestureGuide(true)
        }}
      >
        <div className="tool-btn">
          <span>将这支基金的买卖点，告诉你的朋友</span>
        </div>
      </div>
      {gestureGuide && (
        <div className="fixed__gesture__guide">
          <div className="gesture_wrap">
            <div className="gesture_column">
              <img alt="" src={gestureGuideImg} className="gesture_img" />
              <div className="gesture_center">
                <span>点击“</span>
                <img alt="" src={shareDot} className="share_dot" />
                <span>”按钮分享给你的好友</span>
              </div>
              <div
                className="btn_wrap"
                onClick={() => {
                  setGestureGuide(false)
                }}
              >
                知道了
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
