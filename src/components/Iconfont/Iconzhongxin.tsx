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

const Iconzhongxin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M287.274667 111.722667c-11.648-3.882667-13.589333-7.765333-7.765334-17.472 0-13.589333 3.882667-21.333333 13.589334-25.216a502.357333 502.357333 0 0 1 207.68-44.650667c75.690667 0 143.637333 17.472 207.68 46.570667 13.589333 5.824 17.493333 13.589333 17.493333 25.237333 0 7.765333-3.904 13.589333-13.610667 17.493333-75.690667 29.098667-151.381333 108.672-151.381333 201.856v704.576c-17.493333 3.882667-38.826667 3.882667-56.298667 3.882667-17.472 0-38.826667-5.824-56.298666-5.824V313.6c-1.92-91.242667-79.573333-172.757333-161.088-201.877333zM368.789333 1002.666667c-34.944-11.648-67.925333-21.333333-97.066666-38.826667V204.885333c56.32 25.237333 97.066667 81.536 97.066666 151.402667V1002.666667z m357.141334-38.826667c-29.098667 17.493333-64.042667 29.12-97.045334 38.826667V356.288c0-67.925333 38.826667-126.165333 97.066667-151.402667V963.84zM104.810667 433.941333c-3.882667 0-7.765333 3.882667-17.472 11.648-17.472 21.333333-29.098667 54.336-29.098667 83.456 0 33.002667 11.626667 60.16 29.098667 83.456 7.765333 0 3.882667 3.882667 11.648 3.882667 7.765333 0 11.648-7.765333 11.648-11.648 11.648-29.098667 34.944-54.336 64.064-54.336 11.648 0 21.333333 7.765333 25.216 11.648v355.2C79.594667 827.946667 0 686.272 0 525.141333c0-161.066667 77.653333-302.784 201.856-395.946666v355.2c-7.765333 7.765333-13.568 11.648-25.216 11.648-33.002667 0-54.357333-25.237333-64.064-54.336 1.941333-3.882667-5.824-7.765333-7.765333-7.765334z m857.92 114.517334c13.589333 0 25.237333 11.648 33.002666 38.826666v17.450667c-21.333333 126.165333-89.28 240.682667-186.325333 316.373333V136.96c106.752 81.514667 176.64 201.856 190.208 337.728-3.882667 13.589333-17.472 25.237333-33.002667 25.237333-32.981333 0-54.336-25.237333-64.042666-54.336 0-7.765333-7.765333-11.648-11.648-11.648-7.765333 0-11.648 3.882667-11.648 3.882667-17.472 21.333333-29.12 54.336-29.12 83.456 0 33.002667 11.648 60.16 25.237333 83.456 7.765333 0 3.882667 3.882667 11.648 3.882667 7.765333 0 11.648-7.765333 11.648-11.648 9.706667-23.296 34.944-48.512 64.042667-48.512z"
        fill={getIconColor(color, 0, '#D7000F')}
      />
    </svg>
  )
}

Iconzhongxin.defaultProps = {
  size: 18
}

export default Iconzhongxin