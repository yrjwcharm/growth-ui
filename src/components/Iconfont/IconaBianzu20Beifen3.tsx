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

const IconaBianzu20Beifen3: FunctionComponent<Props> = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M616.789333 283.221333a32 32 0 0 1 31.744 27.648l0.256 4.352v369.792a32 32 0 0 1-51.328 25.557334l-3.285333-2.901334-80-80.042666-80.042667 80.042666a32 32 0 0 1-54.314666-18.261333l-0.298667-4.394667V315.221333a32 32 0 0 1 63.701333-4.352l0.298667 4.352v292.522667l48-48a32 32 0 0 1 41.685333-3.072l3.584 3.072 48 48V315.221333a32 32 0 0 1 27.690667-31.701333l4.309333-0.298667z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M772.394667 68.266667a85.333333 85.333333 0 0 1 71.978666 39.466666L955.733333 282.453333V870.4a85.333333 85.333333 0 0 1-85.333333 85.333333H153.6a85.333333 85.333333 0 0 1-85.333333-85.333333V275.242667L179.498667 106.666667a85.333333 85.333333 0 0 1 71.253333-38.357334h521.642667z m0 64H250.752a21.333333 21.333333 0 0 0-15.146667 6.272l-2.688 3.328L132.266667 294.4V870.4a21.333333 21.333333 0 0 0 17.493333 20.992l3.84 0.341333h716.8a21.333333 21.333333 0 0 0 20.992-17.493333l0.341333-3.84-0.042666-569.344-101.290667-158.933333a21.333333 21.333333 0 0 0-14.421333-9.557334l-3.584-0.298666z"
        fill={getIconColor(color, 1, '#3E4759')}
      />
      <path d="M910.208 258.133333v64H119.466667v-64z" fill={getIconColor(color, 2, '#3E4759')} />
    </svg>
  )
}

IconaBianzu20Beifen3.defaultProps = {
  size: 18
}

export default IconaBianzu20Beifen3
