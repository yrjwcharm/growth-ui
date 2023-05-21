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

const IconaBianzu4: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M411.733333 889.6L54.954667 440.149333a128 128 0 0 1-9.642667-145.152L158.293333 105.557333a128 128 0 0 1 109.909334-62.421333h487.509333a128 128 0 0 1 109.909333 62.421333l113.066667 189.397334a128 128 0 0 1-9.685333 145.152L612.266667 889.642667a128 128 0 0 1-200.533334 0z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M648.277333 425.813333a32 32 0 0 1 38.4 50.986667l-3.754666 2.858667-135.04 86.997333a74.666667 74.666667 0 0 1-77.013334 2.304l-5.888-3.669333-124.757333-86.186667a32 32 0 0 1 32.298667-55.04l4.053333 2.346667 124.8 86.229333a10.666667 10.666667 0 0 0 9.557333 1.28l2.261334-1.066667 135.082666-87.04z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  )
}

IconaBianzu4.defaultProps = {
  size: 18
}

export default IconaBianzu4
