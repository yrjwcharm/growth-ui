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

const Iconjuxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M277.248 448.853333h284.074667v56.874667H277.248V448.853333z m-0.341333 163.712h177.536v56.874667h-177.493334v-56.874667z m0-326.656h284.074666v56.832H276.906667V285.909333z m447.616 282.581334a156.373333 156.373333 0 0 1 156.202666 156.16 156.458667 156.458667 0 0 1-156.202666 156.330666 156.373333 156.373333 0 0 1-156.202667-156.202666 156.458667 156.458667 0 0 1 156.202667-156.288m0-56.874667a213.034667 213.034667 0 1 0 0 426.112 213.034667 213.034667 0 0 0 0-426.112z"
        fill={getIconColor(color, 0, '#3E4759')}
      />
      <path
        d="M142.165333 156.586667v710.186666c0 7.808 6.357333 14.208 14.250667 14.208h568.192v56.832H142.208A56.874667 56.874667 0 0 1 85.333333 880.981333V142.336c0-31.36 25.472-56.832 56.832-56.832h553.984c31.36 0 56.832 25.472 56.832 56.832v400h-56.832V156.586667a14.208 14.208 0 0 0-14.250666-14.250667H156.416a14.165333 14.165333 0 0 0-14.250667 14.250667z"
        fill={getIconColor(color, 1, '#3E4759')}
      />
      <path
        d="M635.818667 696.661333h177.493333v56.832h-177.493333z"
        fill={getIconColor(color, 2, '#3370FF')}
      />
      <path
        d="M752.981333 636.330667v177.536h-56.832v-177.493334z"
        fill={getIconColor(color, 3, '#3370FF')}
      />
    </svg>
  )
}

Iconjuxing.defaultProps = {
  size: 18
}

export default Iconjuxing
