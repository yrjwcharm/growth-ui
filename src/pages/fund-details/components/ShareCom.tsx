import gestureGuideImg from '@/assets/images/gesture_guide.png'
import shareDot from '@/assets/images/more.png'
import './ShareCom.less'
const ShareCom = ({
  gestureGuide,
  confirmClick
}: {
  gestureGuide: boolean
  confirmClick: () => void
}) => {
  return (
    <>
      {gestureGuide && (
        <div className="fixed__gesture_guide">
          <div className="gesture_wrap">
            <div className="gesture_column">
              <img alt="" src={gestureGuideImg} className="gesture_img" />
              <div className="gesture_center">
                <span>点击“</span>
                <img alt="" src={shareDot} className="share_dot" />
                <span>”按钮分享给你的好友</span>
              </div>
              <div className="btn_wrap" onClick={confirmClick}>
                知道了
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ShareCom
