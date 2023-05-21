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

const IconaBianzu33: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 51.2c254.506667 0 460.8 206.293333 460.8 460.8 0 254.506667-206.293333 460.8-460.8 460.8-254.506667 0-460.8-206.293333-460.8-460.8C51.2 257.493333 257.493333 51.2 512 51.2z m0 64a396.8 396.8 0 1 0 0 793.6 396.8 396.8 0 0 0 0-793.6z"
        fill={getIconColor(color, 0, '#646C80')}
      />
      <path
        d="M668.885333 451.669333a85.333333 85.333333 0 0 1 0 120.661334l-96.554666 96.554666a85.333333 85.333333 0 0 1-120.661334 0l-96.554666-96.554666a85.333333 85.333333 0 0 1 0-120.661334l96.554666-96.554666a85.333333 85.333333 0 0 1 120.661334 0l96.554666 96.554666z m-45.226666 45.226667l-96.554667-96.512a21.333333 21.333333 0 0 0-27.221333-2.474667l-2.986667 2.474667-96.512 96.512a21.333333 21.333333 0 0 0-2.474667 27.221333l2.474667 2.986667 96.512 96.512a21.333333 21.333333 0 0 0 27.221333 2.474667l2.986667-2.474667 96.512-96.512a21.333333 21.333333 0 0 0 2.474667-27.221333l-2.474667-2.986667z"
        fill={getIconColor(color, 1, '#646C80')}
      />
    </svg>
  )
}

IconaBianzu33.defaultProps = {
  size: 18
}

export default IconaBianzu33
