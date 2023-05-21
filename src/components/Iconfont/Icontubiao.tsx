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

const Icontubiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M106.666667 853.333333V492.586667C106.666667 467.989333 127.146667 448 152.384 448H341.333333V130.24C341.333333 105.450667 363.157333 85.333333 390.101333 85.333333h243.797334C660.842667 85.333333 682.666667 105.450667 682.666667 130.24V341.333333h188.949333c25.258667 0 45.717333 19.093333 45.717333 42.666667v469.333333h21.333334a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H85.333333a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h21.333334z m725.333333 0V426.666667h-149.333333v426.666666h149.333333z m-234.666667 0V170.666667h-170.666666v682.666666h170.666666z m-256 0V533.333333H192v320h149.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icontubiao.defaultProps = {
  size: 18
}

export default Icontubiao
