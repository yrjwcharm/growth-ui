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

const Icondianhua: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M391.210667 440.490667a585.770667 585.770667 0 0 0 85.610666 106.24 662.976 662.976 0 0 0 102.4 82.325333l59.242667-43.050667a84.437333 84.437333 0 0 1 85.717333-8.085333l165.845334 78.186667a84.992 84.992 0 0 1 42.965333 107.349333l-36.586667 95.232c-21.162667 55.104-77.333333 88.533333-135.061333 78.08C397.866667 870.869333 146.048 620.266667 86.912 259.754667c-9.578667-58.282667 25.088-114.346667 80.832-134.336l97.856-35.114667a84.565333 84.565333 0 0 1 105.792 45.269333l70.954667 159.146667a85.077333 85.077333 0 0 1-7.765334 83.050667l-43.370666 62.72z m-70.656-47.850667l43.776-63.296-70.613334-158.464-97.152 34.858667c-17.706667 6.357333-28.224 23.338667-25.450666 40.192 53.248 324.522667 277.12 547.349333 605.44 606.869333 16.490667 2.986667 33.429333-7.082667 40.192-24.704l36.48-94.976-164.992-77.802667-59.733334 43.434667a83.050667 83.050667 0 0 1-94.208 2.858667 748.8 748.8 0 0 1-117.376-94.08 670.613333 670.613333 0 0 1-99.136-123.52c-17.557333-28.266667-16.085333-64.149333 2.773334-91.370667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icondianhua.defaultProps = {
  size: 18
}

export default Icondianhua
