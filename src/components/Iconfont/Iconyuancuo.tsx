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

const Iconyuancuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 0c282.794667 0 512 229.205333 512 512S794.794667 1024 512 1024 0 794.794667 0 512 229.205333 0 512 0z m-128.085333 316.032a10.666667 10.666667 0 0 0-15.104 0l-52.778667 52.778667a10.666667 10.666667 0 0 0 0 15.104l128.213333 128.213333-128.213333 128.213333a10.666667 10.666667 0 0 0-1.237333 13.610667l1.237333 1.493333 52.778667 52.778667a10.666667 10.666667 0 0 0 15.104 0l128.213333-128.213333 128.213333 128.213333a10.666667 10.666667 0 0 0 13.610667 1.237333l1.493333-1.237333 52.778667-52.8a10.666667 10.666667 0 0 0 0-15.082667l-128.213333-128.213333 128.213333-128.213333a10.666667 10.666667 0 0 0 1.237333-13.610667l-1.237333-1.493333-52.8-52.778667a10.666667 10.666667 0 0 0-15.082667 0l-128.213333 128.213333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyuancuo.defaultProps = {
  size: 18
}

export default Iconyuancuo
