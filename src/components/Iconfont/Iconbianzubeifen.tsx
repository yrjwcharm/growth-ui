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

const Iconbianzubeifen: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M170.666667 102.4h665.6a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128h-116.309334a128 128 0 0 0-86.784 33.877333c-55.253333 50.986667-95.658667 76.458667-121.173333 76.458667-25.429333 0-65.194667-25.301333-119.338667-75.861333a128 128 0 0 0-87.381333-34.474667H170.666667a128 128 0 0 1-128-128v-512a128 128 0 0 1 128-128z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M337.066667 481.408h332.8a38.4 38.4 0 1 1 0 76.8H337.066667a38.4 38.4 0 1 1 0-76.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  )
}

Iconbianzubeifen.defaultProps = {
  size: 18
}

export default Iconbianzubeifen
