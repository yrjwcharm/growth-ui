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

const Iconjiaotong: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M668.8 213.632c-59.285333 0-116.650667 15.296-164.437333 47.786667l-158.72 103.253333V9.066667L60.736 244.224v443.605333c0 131.946667 87.957333 242.837333 208.426667 282.986667l53.546666 17.216c-112.810667-53.546667-185.472-164.437333-185.472-290.645333 0-181.632 152.96-326.954667 342.250667-326.954667 175.914667 0 321.237333 128.106667 340.352 290.624h-195.029333a152.021333 152.021333 0 0 0-147.221334-112.810667c-84.138667 0-152.96 68.842667-152.96 151.061334 0 82.218667 68.821333 149.141333 152.96 149.141333 78.4 0 141.482667-55.466667 151.04-131.925333h195.050667c-3.84 66.922667-30.592 126.186667-68.842667 173.994666 0 0 118.549333-137.664 158.72-200.768 36.309333-55.466667 57.344-114.730667 57.344-181.653333 0-158.72-135.765333-294.464-302.101333-294.464z"
        fill={getIconColor(color, 0, '#00367A')}
      />
    </svg>
  )
}

Iconjiaotong.defaultProps = {
  size: 18
}

export default Iconjiaotong
