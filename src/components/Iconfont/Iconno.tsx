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

const Iconno: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 896c212.074667 0 384-171.925333 384-384S724.074667 128 512 128 128 299.925333 128 512s171.925333 384 384 384z m0 85.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m0-529.664l120.682667-120.682666 60.330666 60.330666L572.330667 512l120.682666 120.682667-60.330666 60.330666L512 572.330667l-120.682667 120.682666-60.330666-60.330666L451.669333 512l-120.682666-120.682667 60.330666-60.330666L512 451.669333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconno.defaultProps = {
  size: 18
}

export default Iconno
