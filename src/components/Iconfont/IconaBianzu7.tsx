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

const IconaBianzu7: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M503.466667 503.466667m-460.8 0a460.8 460.8 0 1 0 921.6 0 460.8 460.8 0 1 0-921.6 0Z"
        fill={getIconColor(color, 0, '#3370FF')}
      />
      <path
        d="M660.352 443.136a85.333333 85.333333 0 0 1 0 120.661333l-96.554667 96.554667a85.333333 85.333333 0 0 1-120.661333 0l-96.554667-96.554667a85.333333 85.333333 0 0 1 0-120.661333l96.554667-96.554667a85.333333 85.333333 0 0 1 120.661333 0l96.554667 96.554667z m-45.226667 45.226667l-96.554666-96.512a21.333333 21.333333 0 0 0-27.221334-2.474667l-2.986666 2.474667-96.512 96.512a21.333333 21.333333 0 0 0-2.474667 27.221333l2.474667 2.986667 96.512 96.512a21.333333 21.333333 0 0 0 27.221333 2.474666l2.986667-2.474666 96.512-96.512a21.333333 21.333333 0 0 0 2.474666-27.221334l-2.474666-2.986666z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  )
}

IconaBianzu7.defaultProps = {
  size: 18
}

export default IconaBianzu7
