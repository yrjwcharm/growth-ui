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

const Iconshanghai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M537.408 431.146667c127.146667 0 238.933333 10.346667 335.168 29.269333 58.410667 12.096 104.832 24.085333 142.677333 39.594667L520.256 6.656 28.544 498.261333c43.008-15.402667 98.026667-29.162667 163.349333-39.509333 104.832-19.029333 220.010667-27.605333 345.514667-27.605333z"
        fill={getIconColor(color, 0, '#FCCF00')}
      />
      <path
        d="M520.256 996.672L1011.84 503.424c-68.757333-5.162667-163.349333-5.162667-281.813333 3.413333-125.632 8.576-211.541333 20.565333-261.482667 36.053334-44.650667 13.76-65.322667 32.682667-61.802667 55.04 0 6.912 3.413333 15.488 10.325334 22.314666l12.096 10.325334c17.173333 12.010667 27.52 17.173333 30.933333 20.586666 15.381333 13.866667 20.565333 31.018667 17.152 51.584-6.826667 27.52-61.824 56.746667-163.242667 86.016l206.250667 207.914667z"
        fill={getIconColor(color, 1, '#293C8F')}
      />
    </svg>
  )
}

Iconshanghai.defaultProps = {
  size: 18
}

export default Iconshanghai
