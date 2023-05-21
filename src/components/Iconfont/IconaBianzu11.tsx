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

const IconaBianzu11: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M473.429333 55.594667l-0.426666 0.298666C385.28 119.893333 288 156.032 186.88 162.773333l-16.853333 0.853334c-35.669333 0-65.493333 29.781333-65.493334 66.56v266.368c0 234.922667 162.133333 436.949333 391.808 488.490666l17.408 3.498667 14.677334-3.712c230.101333-53.162667 391.04-254.506667 391.04-488.277333V230.186667a66.56 66.56 0 0 0-58.24-66.090667l-6.357334-0.426667c-107.818667-3.712-211.2-40.149333-306.005333-107.946666a65.450667 65.450667 0 0 0-75.434667-0.128z m22.485334 62.506666l14.336-10.154666a1.408 1.408 0 0 1 1.578666 0c104.661333 74.794667 220.16 115.541333 339.968 119.637333l3.413334 0.213333 0.256 2.389334v266.368l-0.170667 12.202666c-5.333333 194.645333-138.581333 361.258667-329.813333 410.88l-13.269334 3.285334-2.56-0.512a435.626667 435.626667 0 0 1-341.12-425.813334V230.144a2.56 2.56 0 0 1 2.56-2.56c115.456-3.925333 225.792-41.258667 324.821334-109.525333z"
        fill={getIconColor(color, 0, '#3E4759')}
      />
      <path
        d="M660.48 390.698667a32 32 0 0 1 47.573333 42.496l-3.157333 3.541333-181.888 175.616a32 32 0 0 1-41.770667 2.304l-3.498666-3.157333-125.354667-130.474667a32 32 0 0 1 42.666667-47.488l3.498666 3.157333 103.082667 107.306667 158.805333-153.301333z"
        fill={getIconColor(color, 1, '#3370FF')}
      />
    </svg>
  )
}

IconaBianzu11.defaultProps = {
  size: 18
}

export default IconaBianzu11
