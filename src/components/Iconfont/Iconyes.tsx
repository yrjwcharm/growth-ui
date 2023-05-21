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

const Iconyes: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 85.333333C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384S724.074667 128 512 128z m191.872 239.914667l60.330667 60.352L462.506667 729.962667l-186.346667-186.346667 60.330667-60.352 126.016 126.016 241.365333-241.365333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyes.defaultProps = {
  size: 18
}

export default Iconyes
