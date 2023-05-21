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

const Iconmianxingdianhua: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M354.026667 461.504c-8.533333-13.76-7.616-31.274667 1.6-44.586667l43.882666-63.424c8.405333-12.16 9.877333-27.882667 3.84-41.386666l-70.912-159.146667a41.898667 41.898667 0 0 0-52.437333-22.485333L182.144 165.589333c-36.16 12.970667-59.392 49.152-53.12 87.253334 56.682667 345.514667 297.130667 579.797333 639.936 641.92 37.610667 6.826667 73.856-15.530667 87.637333-51.370667l36.565334-95.232a42.325333 42.325333 0 0 0-21.333334-53.461333L705.984 616.533333a41.770667 41.770667 0 0 0-42.453333 4.010667l-60.117334 43.733333a40.405333 40.405333 0 0 1-45.866666 1.578667 706.24 706.24 0 0 1-110.677334-88.704 628.074667 628.074667 0 0 1-92.842666-115.626667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconmianxingdianhua.defaultProps = {
  size: 18
}

export default Iconmianxingdianhua
