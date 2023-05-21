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

const Iconfuzhi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M213.333333 341.333333v512h426.666667V341.333333H213.333333z m512-42.666666v602.069333c0 20.949333-17.834667 37.930667-39.829333 37.930667H167.829333C145.834667 938.666667 128 921.685333 128 900.736V293.930667C128 272.981333 145.834667 256 167.829333 256H682.666667a42.666667 42.666667 0 0 1 42.666666 42.666667z m158.165334-200.832c7.722667 7.722667 12.501333 18.389333 12.501333 30.165333v533.333333a21.333333 21.333333 0 0 1-21.333333 21.333334h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V170.666667H405.333333a21.333333 21.333333 0 0 1-21.333333-21.333334V106.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h448c11.776 0 22.442667 4.778667 30.165334 12.501334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconfuzhi.defaultProps = {
  size: 18
}

export default Iconfuzhi
