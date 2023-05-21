/* tslint:disable */
/* eslint-disable */

import { CSSProperties, SVGAttributes, FunctionComponent } from 'react'
import { getIconColor } from './helper'

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number
  color?: string | string[]
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block'
}

const Iconshipinyuanbofang: FunctionComponent<Props> = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m-90.922667 256a37.696 37.696 0 0 0-26.261333 10.709333c-6.954667 6.826667-10.858667 16.064-10.816 25.685333v353.92c0 6.805333 1.962667 13.461333 5.632 19.264a36.906667 36.906667 0 0 0 23.082667 16.149334c9.6 2.176 19.669333 0.533333 28.010666-4.586667l288.533334-176.938667c10.837333-6.698667 17.408-18.346667 17.408-30.869333 0-12.522667-6.570667-24.149333-17.408-30.869333L440.746667 304.213333a37.589333 37.589333 0 0 0-19.669334-5.525333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshipinyuanbofang.defaultProps = {
  size: 18
}

export default Iconshipinyuanbofang
