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

const Iconshipinbofang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M266.154667 85.333333a75.392 75.392 0 0 0-52.544 21.418667A71.616 71.616 0 0 0 192 158.122667v707.84c0 13.589333 3.925333 26.944 11.285333 38.506666a73.813333 73.813333 0 0 0 46.144 32.32c19.178667 4.352 39.338667 1.066667 56.021334-9.173333l577.045333-353.877333A72.661333 72.661333 0 0 0 917.333333 512a72.661333 72.661333 0 0 0-34.837333-61.717333L305.493333 96.405333A75.178667 75.178667 0 0 0 266.154667 85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshipinbofang.defaultProps = {
  size: 18
}

export default Iconshipinbofang
