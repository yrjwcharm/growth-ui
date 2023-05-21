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

const IconaBianzu8: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M80.213333 341.546667l375.978667-253.952a85.333333 85.333333 0 0 1 95.573333 0l375.04 253.952a85.333333 85.333333 0 0 1 37.461334 70.656V896a85.333333 85.333333 0 0 1-85.333334 85.333333H128a85.333333 85.333333 0 0 1-85.333333-85.333333V412.245333a85.333333 85.333333 0 0 1 37.546666-70.698666z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M561.066667 669.653333V981.333333h-64v-311.68z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  )
}

IconaBianzu8.defaultProps = {
  size: 18
}

export default IconaBianzu8
