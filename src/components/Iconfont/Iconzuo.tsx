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

const Iconzuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M694.528 512L347.584 165.056a21.333333 21.333333 0 0 1 0-30.186667l30.165333-30.165333a21.333333 21.333333 0 0 1 30.165334 0L785.066667 481.834667a42.666667 42.666667 0 0 1 0 60.330666L407.914667 919.296a21.333333 21.333333 0 0 1-30.165334 0l-30.165333-30.165333a21.333333 21.333333 0 0 1 0-30.186667L694.528 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzuo.defaultProps = {
  size: 18
}

export default Iconzuo
