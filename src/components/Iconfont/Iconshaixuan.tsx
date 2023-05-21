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

const Iconshaixuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M682.666667 487.722667V917.333333a21.333333 21.333333 0 0 1-21.333334 21.333334h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333334V469.333333c0-6.272 1.344-12.224 3.776-17.578666a40.96 40.96 0 0 1 17.066667-19.925334L853.333333 291.456V170.666667H170.666667v122.282666l228.053333 136.32A42.666667 42.666667 0 0 1 426.666667 469.333333v298.666667a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333V489.173333L105.557333 348.224a40.896 40.896 0 0 1-12.885333-12.117333A21.290667 21.290667 0 0 1 85.333333 320V128a42.666667 42.666667 0 0 1 42.666667-42.666667h768c11.776 0 22.442667 4.778667 30.165333 12.501334 7.722667 7.722667 12.501333 18.389333 12.501334 30.165333v178.901333c0.32 2.986667 0.32 6.016 0 8.96V320a21.312 21.312 0 0 1-9.002667 17.408c-2.944 3.626667-6.570667 6.805333-10.794667 9.322667L682.666667 487.744z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshaixuan.defaultProps = {
  size: 18
}

export default Iconshaixuan
