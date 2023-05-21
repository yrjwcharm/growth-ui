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

const Iconsaoma: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M170.666667 725.333333v128h128v85.333334H128a42.666667 42.666667 0 0 1-42.666667-42.666667v-170.666667h85.333334z m768 0v170.666667a42.666667 42.666667 0 0 1-42.666667 42.666667h-170.666667v-85.333334h128v-128h85.333334z m0-256v85.333334H85.333333v-85.333334h853.333334zM298.666667 85.333333v85.333334H170.666667v128H85.333333V128a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666667z m597.333333 0a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666667h-85.333334V170.666667h-128V85.333333h170.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconsaoma.defaultProps = {
  size: 18
}

export default Iconsaoma
