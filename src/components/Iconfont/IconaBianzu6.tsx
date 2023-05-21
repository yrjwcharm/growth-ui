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

const IconaBianzu6: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 847.488a409.6 409.6 0 1 0 0-819.2 409.6 409.6 0 0 0 0 819.2z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M193.536 942.848c227.328-85.333333 445.312-85.333333 652.373333 0.426667a32 32 0 0 1-24.448 59.093333c-191.744-79.36-392.96-79.36-605.44 0.426667a32 32 0 0 1-22.485333-59.946667z"
        fill={getIconColor(color, 1, '#3370FF')}
      />
      <path
        d="M621.909333 565.717333a32 32 0 1 1 41.728 48.554667c-94.976 81.621333-197.973333 81.621333-298.24 0.597333a32 32 0 0 1 40.192-49.792c76.544 61.866667 145.066667 61.866667 216.32 0.64z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  )
}

IconaBianzu6.defaultProps = {
  size: 18
}

export default IconaBianzu6
