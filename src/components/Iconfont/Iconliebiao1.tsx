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

const Iconliebiao1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 768v85.333333h-128v-85.333333h128z m-256 0v85.333333H170.666667v-85.333333h426.666666z m0-298.666667v85.333334H170.666667v-85.333334h426.666666z m256 0v85.333334h-128v-85.333334h128z m0-298.666666v85.333333H170.666667V170.666667h682.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconliebiao1.defaultProps = {
  size: 18
}

export default Iconliebiao1
