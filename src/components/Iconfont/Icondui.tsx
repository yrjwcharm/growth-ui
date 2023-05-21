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

const Icondui: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M393.28 742.826667l467.626667-467.626667a21.333333 21.333333 0 0 1 30.186666 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165334L408.362667 848.426667a21.333333 21.333333 0 0 1-30.165334 0L106.666667 576.896a21.333333 21.333333 0 0 1 0-30.186667l30.165333-30.165333a21.333333 21.333333 0 0 1 30.165333 0L393.28 742.826667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icondui.defaultProps = {
  size: 18
}

export default Icondui
