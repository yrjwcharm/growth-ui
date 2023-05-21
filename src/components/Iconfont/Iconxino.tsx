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

const Iconxino: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 917.333333c223.850667 0 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333z m0 64C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M632.874667 363.285333l30.165333 30.165334-120.682667 120.661333 120.682667 120.682667-30.165333 30.186666-120.682667-120.704-120.661333 120.704-30.186667-30.186666 120.682667-120.682667-120.682667-120.661333 30.186667-30.165334 120.661333 120.682667 120.682667-120.682667z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  )
}

Iconxino.defaultProps = {
  size: 18
}

export default Iconxino
