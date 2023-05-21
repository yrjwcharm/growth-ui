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

const Iconyuanjin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 51.2c254.506667 0 460.8 206.293333 460.8 460.8 0 254.506667-206.293333 460.8-460.8 460.8-254.506667 0-460.8-206.293333-460.8-460.8C51.2 257.493333 257.493333 51.2 512 51.2z m219.733333 409.6H292.266667a10.666667 10.666667 0 0 0-10.666667 10.666667v81.066666a10.666667 10.666667 0 0 0 10.666667 10.666667h439.466666a10.666667 10.666667 0 0 0 10.666667-10.666667v-81.066666a10.666667 10.666667 0 0 0-10.666667-10.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyuanjin.defaultProps = {
  size: 18
}

export default Iconyuanjin
