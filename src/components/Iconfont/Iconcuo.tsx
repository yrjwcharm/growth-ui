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

const Iconcuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M509.568 447.082667L796.16 160.469333a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165334a21.333333 21.333333 0 0 1 0 30.186666L569.898667 507.434667 856.512 794.026667a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165334 0L509.568 567.765333 222.933333 854.378667a21.333333 21.333333 0 0 1-30.186666 0l-30.165334-30.165334a21.333333 21.333333 0 0 1 0-30.165333l286.613334-286.613333L162.602667 220.8a21.333333 21.333333 0 0 1 0-30.186667l30.165333-30.165333a21.333333 21.333333 0 0 1 30.186667 0l286.613333 286.613333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconcuo.defaultProps = {
  size: 18
}

export default Iconcuo
