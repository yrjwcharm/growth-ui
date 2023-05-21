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

const Iconwodedingtou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 170.666667a85.333333 85.333333 0 0 1 85.333334 85.333333v597.333333a85.333333 85.333333 0 0 1-85.333334 85.333334H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334V256a85.333333 85.333333 0 0 1 85.333334-85.333333h682.666666z m0 64H170.666667a21.333333 21.333333 0 0 0-21.184 18.837333L149.333333 256v597.333333a21.333333 21.333333 0 0 0 18.837334 21.184L170.666667 874.666667h682.666666a21.333333 21.333333 0 0 0 21.184-18.837334L874.666667 853.333333V256a21.333333 21.333333 0 0 0-18.837334-21.184L853.333333 234.666667z"
        fill={getIconColor(color, 0, '#51565D')}
      />
      <path
        d="M362.666667 85.333333v234.666667h-64V85.333333zM725.333333 85.333333v234.666667h-64V85.333333z"
        fill={getIconColor(color, 1, '#51565D')}
      />
      <path
        d="M716.672 416c27.178667 0 41.578667 31.424 25.066667 51.925333l-1.898667 2.133334-189.013333 198.4a32 32 0 0 1-44.458667 1.834666l-2.304-2.282666-73.749333-80.469334-88.490667 82.282667a32 32 0 0 1-42.88 0.64l-2.346667-2.282667a32 32 0 0 1-0.64-42.88l2.282667-2.346666 112.128-104.213334a32 32 0 0 1 43.029333-0.490666l2.346667 2.304 72.362667 78.954666 113.877333-119.509333H612.266667a32 32 0 0 1-31.850667-28.928L580.266667 448a32 32 0 0 1 28.928-31.850667l3.072-0.149333h104.405333z"
        fill={getIconColor(color, 2, '#F84949')}
      />
    </svg>
  )
}

Iconwodedingtou.defaultProps = {
  size: 18
}

export default Iconwodedingtou
