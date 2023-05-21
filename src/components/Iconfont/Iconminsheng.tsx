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

const Iconminsheng: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 401.834667l-102.4-46.933334 102.4-46.933333 102.4 46.933333-102.4 46.933334z m115.2 12.8l132.266667-59.733334-247.466667-110.933333-247.466667 110.933333 247.466667 110.933334c187.733333 0 337.066667 85.333333 337.066667 187.733333 0 102.4-153.6 187.733333-337.066667 187.733333-183.466667 0-337.066667-85.333333-337.066667-187.733333v-4.266667H0v4.266667c0 140.8 230.4 251.733333 512 251.733333s512-115.2 512-251.733333c0-115.2-170.666667-209.066667-396.8-238.933333z"
        fill={getIconColor(color, 0, '#006FBA')}
      />
      <path
        d="M512 606.634667l102.4 46.933333-102.4 42.666667-102.4-42.666667 102.4-46.933333z m0-503.466667c-281.6 0-512 110.933333-512 251.733333 0 115.2 170.666667 209.066667 396.8 238.933334l-132.266667 59.733333 247.466667 110.933333 247.466667-110.933333-247.466667-110.933333c-187.733333 0-337.066667-85.333333-337.066667-187.733334 0-102.4 153.6-187.733333 337.066667-187.733333 183.466667 0 337.066667 85.333333 337.066667 187.733333v4.266667H1024v-4.266667c0-140.8-230.4-251.733333-512-251.733333z"
        fill={getIconColor(color, 1, '#00A65F')}
      />
    </svg>
  )
}

Iconminsheng.defaultProps = {
  size: 18
}

export default Iconminsheng
