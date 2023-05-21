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

const Iconzhongguo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 0c282.773333 0 512 229.226667 512 512S794.773333 1024 512 1024 0 794.773333 0 512 229.226667 0 512 0z m-64 133.312C266.389333 163.776 128 321.706667 128 512c0 190.293333 138.389333 348.224 320 378.688V704h-85.333333a85.333333 85.333333 0 0 1-85.333334-85.333333V405.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h85.333333V133.312z m128 0V320h85.333333a85.333333 85.333333 0 0 1 85.333334 85.333333v213.333334a85.333333 85.333333 0 0 1-85.333334 85.333333h-85.333333v186.688C757.653333 860.202667 896 702.272 896 512S757.632 163.797333 576 133.312zM618.666667 405.333333H405.333333a21.333333 21.333333 0 0 0-21.184 18.837334L384 426.666667v170.666666a21.333333 21.333333 0 0 0 18.837333 21.184L405.333333 618.666667h213.333334a21.333333 21.333333 0 0 0 21.184-18.837334L640 597.333333v-170.666666a21.333333 21.333333 0 0 0-21.333333-21.333334z"
        fill={getIconColor(color, 0, '#DB0A35')}
      />
    </svg>
  )
}

Iconzhongguo.defaultProps = {
  size: 18
}

export default Iconzhongguo
