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

const Iconyuandui: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M0 512c0 282.794667 229.205333 512 512 512s512-229.205333 512-512S794.794667 0 512 0 0 229.205333 0 512z m778.261333-131.669333a10.666667 10.666667 0 0 1 0 15.104L453.930667 719.744a10.666667 10.666667 0 0 1-10.624 2.666667l1.258666-1.066667a10.666667 10.666667 0 0 1-15.082666 0l-165.930667-165.909333a10.666667 10.666667 0 0 1 0-15.104l52.778667-52.778667a10.666667 10.666667 0 0 1 15.104 0l109.482666 109.44 269.461334-269.44a10.666667 10.666667 0 0 1 15.082666 0l52.8 52.778667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyuandui.defaultProps = {
  size: 18
}

export default Iconyuandui
