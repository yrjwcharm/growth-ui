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

const Iconshouyimingxi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M874.666667 128a106.666667 106.666667 0 0 1 106.666666 106.666667v554.666666a106.666667 106.666667 0 0 1-106.666666 106.666667H149.333333a106.666667 106.666667 0 0 1-106.666666-106.666667V234.666667a106.666667 106.666667 0 0 1 106.666666-106.666667h725.333334z m0 64H149.333333a42.666667 42.666667 0 0 0-42.56 39.466667L106.666667 234.666667v554.666666a42.666667 42.666667 0 0 0 39.466666 42.56L149.333333 832h725.333334a42.666667 42.666667 0 0 0 42.56-39.466667L917.333333 789.333333V234.666667a42.666667 42.666667 0 0 0-39.466666-42.56L874.666667 192z"
        fill={getIconColor(color, 0, '#51565D')}
      />
      <path
        d="M755.114667 334.378667a32 32 0 0 1 54.997333 32.576l-1.578667 2.666666-189.866666 288a32 32 0 0 1-45.653334 8.192l-2.496-2.048-162.624-146.496-121.493333 173.12a32 32 0 0 1-41.962667 9.450667l-2.624-1.642667a32 32 0 0 1-9.450666-41.984l1.664-2.602666 142.272-202.666667a32 32 0 0 1 45.141333-7.381333l2.453333 2.005333 161.813334 145.728 169.386666-256.917333z"
        fill={getIconColor(color, 1, '#F54A45')}
      />
    </svg>
  )
}

Iconshouyimingxi.defaultProps = {
  size: 18
}

export default Iconshouyimingxi
