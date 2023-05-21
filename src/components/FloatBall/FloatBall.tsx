import { Component } from 'react'
import classNames from 'classnames'
import './FloatBall.less'
import closeImg from '@/assets/images/fission-activity/close.png'
interface IProps {
  style?: Object
  /** 是否有导航栏，默认有 */
  hasNavbar?: boolean
  /** 是否有tabbar，默认有 */
  hasTabbar?: boolean

  /** 关闭悬浮球 */
  onClose: Function
  /** 点击事件 */
  onClick: Function
  children?: any
}
interface IState {
  oLeft: number
  oTop: number
  show: boolean
  /** 动画步骤 */
  animatorStep: 0 | 1 | 2 | 3
}

// 悬浮按钮尺寸
const kBallWidth: number = 70 // 悬钮宽度
const kBallHeight: number = 70

const screenWidth = window.document.body.clientWidth
const screenHeight = window.document.body.clientHeight

class FloatBall extends Component<IProps, IState> {
  $vm: any // 悬浮按钮
  moving: boolean // 移动状态

  htmlWidth: number // 页面宽度
  htmlHeight: number

  click: boolean // 是否是点击

  minY: number
  maxY: number

  constructor(props: IProps) {
    super(props)
    this.state = {
      oLeft: screenWidth - kBallWidth,
      oTop: screenHeight / 2 - kBallHeight,
      animatorStep: 0,
      show: true
    }
    this.click = false
    this.moving = false

    this.htmlWidth = screenWidth
    this.htmlHeight = screenHeight

    this.minY = 0
    this.maxY = screenHeight
  }

  render() {
    const { style, children } = this.props
    const { animatorStep, show } = this.state

    const className = classNames(['floatball-button', `animator-step-${animatorStep}`])

    if (!show) return null
    return (
      <div
        onClick={() => {
          !this.click && this.props.onClick()
        }}
        className={className}
        ref={($vm) => (this.$vm = $vm)}
        style={{
          width: kBallWidth,
          height: kBallHeight,
          right: '10px',
          top: `${this.state.oTop}px`,
          ...style
        }}
      >
        <div
          className="closeWrap"
          onClick={(e) => {
            this.props.onClose(e)
          }}
        >
          <img className="closeImg" src={closeImg} alt={''} />
        </div>
        {children}
      </div>
    )
  }
}

export default FloatBall
