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

const Iconxia: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 694.528l346.944-346.944a21.333333 21.333333 0 0 1 30.186667 0l30.165333 30.165333a21.333333 21.333333 0 0 1 0 30.165334L542.165333 785.066667a42.666667 42.666667 0 0 1-60.330666 0L104.704 407.914667a21.333333 21.333333 0 0 1 0-30.165334l30.165333-30.165333a21.333333 21.333333 0 0 1 30.186667 0L512 694.528z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconxia.defaultProps = {
  size: 18
}

export default Iconxia
