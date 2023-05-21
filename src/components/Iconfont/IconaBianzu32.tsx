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

const IconaBianzu32: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M432.426667 910.933333a128 128 0 0 1-20.693334-20.693333L54.954667 440.704a128 128 0 0 1-9.642667-145.152L158.293333 106.154667a128 128 0 0 1 109.909334-62.378667h487.509333a128 128 0 0 1 109.909333 62.378667l113.066667 189.397333a128 128 0 0 1-9.685333 145.152L612.266667 890.24a128 128 0 0 1-179.84 20.693333z m39.765333-50.133333a64 64 0 0 0 85.632-5.418667l4.266667-4.949333 356.821333-449.493333a64 64 0 0 0 7.893333-66.773334l-3.072-5.802666-113.024-189.44a64 64 0 0 0-48.853333-30.890667l-6.101333-0.256H268.245333a64 64 0 0 0-51.626666 26.112L213.333333 138.965333l-113.066666 189.397334a64 64 0 0 0 1.024 67.2l3.84 5.376 356.778666 449.493333c2.048 2.56 4.266667 4.949333 6.656 7.168l3.669334 3.2z"
        fill={getIconColor(color, 0, '#646C80')}
      />
      <path
        d="M648.277333 348.586667a32 32 0 0 1 38.4 50.944l-3.754666 2.858666-135.04 86.954667a74.666667 74.666667 0 0 1-77.013334 2.346667l-5.888-3.669334-124.757333-86.229333a32 32 0 0 1 32.298667-55.04l4.053333 2.389333 124.8 86.186667a10.666667 10.666667 0 0 0 9.557333 1.322667l2.261334-1.109334 135.082666-86.997333z"
        fill={getIconColor(color, 1, '#646C80')}
      />
    </svg>
  )
}

IconaBianzu32.defaultProps = {
  size: 18
}

export default IconaBianzu32
