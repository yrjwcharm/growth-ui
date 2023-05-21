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

const Iconrili: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M768 213.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667H341.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667H170.666667v213.333334h682.666666V213.333333h-85.333333z m0-85.333333h128c23.573333 0 42.666667 20.16 42.666667 45.034667V893.653333C938.666667 918.506667 919.573333 938.666667 896 938.666667H128c-23.573333 0-42.666667-20.16-42.666667-45.034667V173.013333C85.333333 148.16 104.426667 128 128 128h128V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667h341.333334V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667zM170.666667 512v341.333333h682.666666V512H170.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconrili.defaultProps = {
  size: 18
}

export default Iconrili
