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

const IconaBianzu14: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 68.266667c245.077333 0 443.733333 198.656 443.733333 443.733333 0 245.077333-198.656 443.733333-443.733333 443.733333-245.077333 0-443.733333-198.656-443.733333-443.733333C68.266667 266.922667 266.922667 68.266667 512 68.266667z m0 64a379.733333 379.733333 0 1 0 0 759.466666 379.733333 379.733333 0 0 0 0-759.466666z"
        fill={getIconColor(color, 0, '#3E4759')}
      />
      <path
        d="M708.693333 372.352l-66.048 207.36a85.333333 85.333333 0 0 1-55.04 55.296l-213.333333 69.12a42.666667 42.666667 0 0 1-53.376-54.784l68.736-194.986667a85.333333 85.333333 0 0 1 49.365333-51.114666l213.504-83.626667a42.666667 42.666667 0 0 1 56.234667 52.736z m-74.538666 23.210667l-171.818667 67.285333a21.333333 21.333333 0 0 0-10.837333 9.386667l-1.493334 3.413333-54.4 154.24 172.288-55.765333a21.333333 21.333333 0 0 0 12.16-10.069334l1.621334-3.754666 52.48-164.693334z"
        fill={getIconColor(color, 1, '#3370FF')}
      />
      <path
        d="M512 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
        fill={getIconColor(color, 2, '#3E4759')}
      />
    </svg>
  )
}

IconaBianzu14.defaultProps = {
  size: 18
}

export default IconaBianzu14
