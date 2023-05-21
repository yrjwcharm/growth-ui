import { useCallback, useEffect, useRef } from 'react'
import './index.less'
const MOMENTUM_LIMIT_TIME = 300
const MOMENTUM_LIMIT_DISTANCE = 40
const defaultSetting = {
  /** 刻度线高度 */
  scaleHeight: 30,
  /** 开始值/最小阈值 */
  start: 0,
  /** 结束值/最大阈值 */
  end: 0,
  /** 间距 */
  lineMargin: 10,
  /** 精度 */
  precision: 0.1
}

/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 */
function easeOut(t: number, b: number, c: number, d: number) {
  return c * ((t = t / d - 1) * t * t + 1) + b
}

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

interface ScaleComponentProps {
  /** 刻度尺当前值 */
  current: number
  /** 刻度尺开始值/最小值 */
  start?: number
  /** 刻度尺结束值值/最大值 */
  end?: number
  /** 刻度尺精度 */
  precision?: number
  /** 回调函数 */
  onChange?: (value: number) => void
  isUnit?: boolean
}

/** 初始化渲染的canvas信息 */
interface OriginCanvasInfo {
  canvas?: HTMLCanvasElement
  context?: CanvasRenderingContext2D
  originCanvasWidth: number
  originCanvasHeight: number
  dprOrginCanvasWidth: number
  dprOriginCanvasHeight: number
  dpr: number
}

const ScaleComponent: React.FC<ScaleComponentProps> = (props) => {
  const { current, start, end, precision, onChange, isUnit } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const originCanvasInfo = useRef<OriginCanvasInfo>({
    originCanvasWidth: 0,
    originCanvasHeight: 0,
    dprOrginCanvasWidth: 0,
    dprOriginCanvasHeight: 0,
    dpr: 0
  })
  const startVal = useRef(0)

  /** 滑动相关信息记录 */
  const touchInfo = useRef({
    startX: 0,
    currentMoveX: 0
  })
  /** 滑动的开始时间 */
  const touchStartTime = useRef(0)

  const limitThreshole = (value: number) => range(value, defaultSetting.start, defaultSetting.end)

  const scrollAction = (distance: number, _duration: number) => {
    let targetDistance = startVal.current - distance
    const duration = 13
    let currentTime = 1
    const originVal = startVal.current
    const step = () => {
      let value = easeOut(currentTime, originVal, targetDistance - originVal, duration)
      if (currentTime < duration) {
        startVal.current =
          Math.round(limitThreshole(value) / defaultSetting.precision) * defaultSetting.precision
        drawScale()
        currentTime += 1
        window.requestAnimationFrame(step)
      } else {
      }
    }
    window.requestAnimationFrame(step)
  }

  /** 根据当前精度保留对应的整数或小数位置，再转成数字类型 */
  const handlePrecisionNum = (num: number) => {
    const settingPrecision = defaultSetting.precision
    if (settingPrecision < 1) {
      return Number(num.toFixed(settingPrecision * 100))
    }
    return Number(num.toFixed(settingPrecision * 100 - 100))
  }

  /** 绘制中间线 */
  const drawMiddleLine = (context: CanvasRenderingContext2D) => {
    /** ————绘制中间线———— */
    const midLineXVal = Math.floor(originCanvasInfo.current.originCanvasWidth / 2)
    context.beginPath()
    context.lineWidth = 4
    context.lineCap = 'round'
    context.moveTo(midLineXVal, 0)
    context.lineTo(midLineXVal, 20)
    context.strokeStyle = '#44CD8D'
    context.stroke()
    context.closePath()
    // let img = new Image();
    // img.src ='@/assets/images/ruler.png';
    // img.onload=function (){
    //   context.drawImage(img,145,0,10,24);
    //
    // }
  }

  /** 绘制背景色和底线 */
  const drawBackGroundUnderLine = (
    tempCanvas: HTMLCanvasElement,
    tempContext: CanvasRenderingContext2D
  ) => {
    tempContext.fillStyle = '#fff'
    tempContext.fillRect(0, 0, tempCanvas.width, 200)

    tempContext.beginPath()
    tempContext.moveTo(0, 0)
    tempContext.lineTo(tempCanvas.width, 0)
    tempContext.strokeStyle = '#9E9E9E'
    tempContext.stroke()
    tempContext.closePath()
  }

  /** 绘制两侧渐变区域 */
  const drawLinearGradient = (context: CanvasRenderingContext2D) => {
    const originCanvasWidth = originCanvasInfo.current.originCanvasWidth

    context.beginPath()
    let lineargradient = context.createLinearGradient(65, 31, 0, 31)
    lineargradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    lineargradient.addColorStop(1, '#FFFFFF')
    context.fillStyle = lineargradient
    context.fillRect(0, 0, 65, 91)
    context.closePath()

    context.beginPath()
    let lineargradient1 = context.createLinearGradient(
      originCanvasWidth,
      31,
      originCanvasWidth - 65,
      31
    )
    lineargradient1.addColorStop(0, '#FFFFFF')
    lineargradient1.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = lineargradient1
    context.fillRect(originCanvasWidth - 65, 0, 65, 91)
    context.closePath()
  }
  /** 绘制刻度线 */
  const drawScale = useCallback(() => {
    const {
      context,
      originCanvasWidth,
      originCanvasHeight,
      dprOrginCanvasWidth,
      dprOriginCanvasHeight,
      dpr
    } = originCanvasInfo.current
    if (!context) return
    let tempCanvas: HTMLCanvasElement = document.createElement('canvas')
    let tempContext = tempCanvas.getContext('2d')!

    tempCanvas.style.width = `${originCanvasWidth || 300}px`
    tempCanvas.style.height = `${originCanvasHeight || 60}px`
    tempCanvas.width = 600
    tempCanvas.height = 120
    tempContext.scale(dpr, dpr)

    drawBackGroundUnderLine(tempCanvas, tempContext)
    /** 当前刻度尺最左侧的刻度值 */
    let beginNum =
      startVal.current -
      (originCanvasWidth / 2 / defaultSetting.lineMargin) * defaultSetting.precision
    /** 当前能绘制刻度尺的总数 */
    let scaleTotal = (originCanvasWidth / defaultSetting.lineMargin) | 0
    /** 当前刻度值与向上取整的刻度值之间的差值 */
    let beginNumDiffVal =
      Math.ceil(beginNum / defaultSetting.precision) * defaultSetting.precision - beginNum
    /** 计算出间距与精度之间的比例值 */
    const marginPrecisionRatio = defaultSetting.lineMargin / defaultSetting.precision
    /** 需要空出来的位移值 */
    const blankMoveVal = beginNumDiffVal * marginPrecisionRatio
    for (let i = 0; i < scaleTotal; i++) {
      let currentNum = Math.ceil(beginNum / defaultSetting.precision + i) * defaultSetting.precision
      if (currentNum < defaultSetting.start) {
        continue
      } else if (currentNum > defaultSetting.end) {
        break
      }
      tempContext.beginPath()
      tempContext.strokeStyle = '#9E9E9E'
      tempContext.font = '16px SimSun, Songti SC'
      tempContext.fillStyle = '#333333'
      tempContext.textAlign = 'center'
      tempContext.lineWidth = 1

      let drawXval = blankMoveVal + i * defaultSetting.lineMargin
      if (currentNum % (defaultSetting.precision * 10) === 0) {
        tempContext.moveTo(drawXval, 0)
        tempContext.strokeStyle = '#9AA0B1'
        tempContext.shadowColor = '#9e9e9e'

        tempContext.fillText(
          isUnit ? String(currentNum) + '%' : String(currentNum * 100),
          drawXval,
          defaultSetting.scaleHeight + 10
        )
        tempContext.lineTo(drawXval, defaultSetting.scaleHeight - 8)
      } else if (currentNum % (defaultSetting.precision * 5) === 0) {
        tempContext.strokeStyle = '#9AA0B1'
        tempContext.moveTo(drawXval, 0)
        tempContext.lineTo(drawXval, defaultSetting.scaleHeight - 10)
      } else {
        tempContext.moveTo(drawXval, 0)
        tempContext.lineTo(drawXval, defaultSetting.scaleHeight - 18)
      }
      tempContext.stroke()
      tempContext.closePath()
    }

    context.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
    context.drawImage(
      tempCanvas,
      0,
      0,
      dprOrginCanvasWidth,
      dprOriginCanvasHeight,
      0,
      0,
      originCanvasWidth,
      originCanvasHeight
    )
    drawMiddleLine(context)
    drawLinearGradient(context)

    onChange?.(handlePrecisionNum(startVal.current))
  }, [onChange])

  useEffect(() => {
    /** 初始化 */
    const drawScaleInit = () => {
      if (current < (start || 0)) {
        throw Error('当前值小于开始值？你真是个大聪明')
      } else if (current > (end || 0)) {
        throw Error('当前值大于结束值？你真是个大聪明')
      }
      if (!canvasRef.current) return
      let canvas: HTMLCanvasElement = canvasRef.current
      let context = canvas.getContext('2d')!
      let { width: originCanvasWidth, height: originCanvasHeight } = canvas.getBoundingClientRect()
      canvas.style.width = `${originCanvasWidth || 300}px`
      canvas.style.height = `${originCanvasHeight || 60}px`
      const dpr = window.devicePixelRatio
      canvas.width = dpr * (originCanvasWidth || 300)
      canvas.height = dpr * (originCanvasHeight || 60)
      context.scale(dpr, dpr)

      /** 设置当前值 */
      startVal.current = current
      originCanvasInfo.current = {
        canvas,
        context,
        originCanvasWidth: originCanvasWidth || 300,
        originCanvasHeight: originCanvasHeight || 60,
        dprOrginCanvasWidth: dpr * (originCanvasWidth || 300),
        dprOriginCanvasHeight: dpr * (originCanvasHeight || 60),
        dpr
      }
      if (start) defaultSetting.start = start
      if (end) {
        defaultSetting.end = end
      } else {
        defaultSetting.end = current + 100
      }
      if (precision) {
        defaultSetting.precision = precision
      }
    }
    drawScaleInit()
    drawScale()
  }, [current, start, end, precision, drawScale])

  const onTouchStart = (event: TouchEvent | React.TouchEvent) => {
    touchInfo.current.startX = event.touches[0].pageX
    touchInfo.current.currentMoveX = event.touches[0].pageX
    touchStartTime.current = Date.now()
  }

  const onTouchMove = (event: TouchEvent | React.TouchEvent) => {
    const current_x = event.touches[0].pageX
    const move_x = current_x - touchInfo.current.currentMoveX
    startVal.current = range(
      startVal.current - (move_x / defaultSetting.lineMargin) * defaultSetting.precision,
      defaultSetting.start,
      defaultSetting.end
    )
    window.requestAnimationFrame(() => drawScale())
    touchInfo.current.currentMoveX = current_x

    const now = Date.now()
    if (now - touchStartTime.current > MOMENTUM_LIMIT_TIME) {
      touchStartTime.current = now
      touchInfo.current.startX = current_x
    }
  }

  const onTouchEnd = (event: TouchEvent | React.TouchEvent) => {
    const duration = Date.now() - touchStartTime.current
    const distance =
      (event.changedTouches[0].pageX - touchInfo.current.startX) * defaultSetting.precision
    const allowEaseAction =
      duration < MOMENTUM_LIMIT_TIME &&
      Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE * defaultSetting.precision
    if (allowEaseAction) {
      scrollAction(distance, duration)
    } else {
      startVal.current =
        Math.round(limitThreshole(startVal.current) / defaultSetting.precision) *
        defaultSetting.precision
      window.requestAnimationFrame(() => drawScale())
    }
  }
  return (
    <canvas
      className="component-scale"
      ref={canvasRef}
      style={{ width: '300px', height: '60px' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    />
  )
}

export default ScaleComponent
