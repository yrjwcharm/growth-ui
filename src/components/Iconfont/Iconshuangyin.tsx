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

const Iconshuangyin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M291.029333 85.333333l133.888 87.957334L194.069333 498.730667h247.872V928.64H0V498.773333L291.029333 85.333333z m582.08 0l133.888 87.957334L776.106667 498.730667H1024V928.64H582.058667V498.773333L873.109333 85.333333z"
        fill={getIconColor(color, 0, '#EBDECE')}
      />
    </svg>
  )
}

Iconshuangyin.defaultProps = {
  size: 18
}

export default Iconshuangyin
