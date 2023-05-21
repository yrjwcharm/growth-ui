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

const Iconzhengyan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M511.36 789.333333C649.514667 789.333333 777.386667 701.44 896 511.445333 780.458667 322.112 652.842667 234.666667 511.36 234.666667 369.92 234.666667 242.730667 322.069333 128 511.445333 245.781333 701.504 373.248 789.333333 511.36 789.333333z m-0.064-640c174.357333 0 324.010667 108.288 449.002667 324.864 2.026667 3.498667 4.48 7.808 7.317333 12.949334l2.24 3.989333a42.666667 42.666667 0 0 1-0.213333 41.749333c-3.413333 5.994667-6.272 10.922667-8.533334 14.805334C832.789333 765.674667 682.88 874.666667 511.274667 874.666667c-170.965333 0-320.021333-108.224-447.189334-324.693334a786.453333 786.453333 0 0 1-3.456-5.930666l-4.096-7.189334-2.304-4.053333a42.666667 42.666667 0 0 1-0.213333-41.557333c4.48-8.106667 8.149333-14.698667 11.029333-19.690667C188.928 256.725333 337.685333 149.333333 511.296 149.333333zM512 341.333333a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z m0 85.333334a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzhengyan.defaultProps = {
  size: 18
}

export default Iconzhengyan
