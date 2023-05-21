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

const Iconzuo1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M380.330667 520.213333l346.965333 346.944a21.333333 21.333333 0 0 1 0 30.165334l-30.165333 30.186666a21.333333 21.333333 0 0 1-30.186667 0L289.834667 550.378667a42.666667 42.666667 0 0 1 0-60.330667L666.944 112.917333a21.333333 21.333333 0 0 1 30.186667 0l30.165333 30.165334a21.333333 21.333333 0 0 1 0 30.165333L380.330667 520.213333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzuo1.defaultProps = {
  size: 18
}

export default Iconzuo1
