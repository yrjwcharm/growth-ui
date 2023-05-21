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

const Iconshouji: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M384 106.666667h-128v810.666666h512V106.666667h-128v42.666666a42.666667 42.666667 0 0 1-42.666667 42.666667h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666667V106.666667z m-170.666667-85.333334h597.333334c23.573333 0 42.666667 19.2 42.666666 42.666667v896c0 23.466667-19.093333 42.666667-42.666666 42.666667H213.333333c-23.573333 0-42.666667-19.2-42.666666-42.666667V64c0-23.466667 19.093333-42.666667 42.666666-42.666667z m298.666667 682.666667a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshouji.defaultProps = {
  size: 18
}

export default Iconshouji
