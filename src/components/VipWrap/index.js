/*
 * @Date: 2023-01-28 11:32:36
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-01-29 14:32:23
 * @FilePath: /growth-ui/src/components/VipWrap/index.tsx
 * @Description:
 */
import React from 'react'
import './index.css'

function VipContent(props) {
  const {
    onClick = () => {
      console.log('lock')
    }
  } = props
  return (
    <div className={`vip_lockWrap ${props.className}`} style={props.style} onClick={onClick}>
      <img src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"></img>
      <div className="viplock_descWrap">
        <label>点击解锁</label>
        <label>完整买卖信号</label>
      </div>
    </div>
  )
}

/** 图表的遮罩 */
export function VipChartWrap(props) {
  const { position } = props
  console.log('position:', position)
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', ...props.style }}
      className="vipchartwrap"
    >
      {props.children}
      {position && (
        <VipContent
          onClick={props.onClick}
          className={`vipchart_lockWrap ${props.className}`}
          style={{
            top: position.y,
            left: position.x,
            width: position.width,
            height: position.height
          }}
        />
      )}
    </div>
  )
}

/** 图表的遮罩 */
export function VipBlockWrap(props) {
  return (
    <div style={{ position: 'relative' }} className="vipchartwrap">
      {props.children}
      <VipContent
        onClick={props.onClick}
        className={`vipblock_lockWrap ${props.containerClass}`}
        style={props.containerStyle}
      />
    </div>
  )
}

export default VipChartWrap
