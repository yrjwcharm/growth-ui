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

const Iconmulu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M213.333333 128v768h597.333334V128H213.333333zM170.666667 42.666667h682.666666c23.573333 0 42.666667 20.010667 42.666667 44.693333v849.28C896 961.322667 876.906667 981.333333 853.333333 981.333333H170.666667c-23.573333 0-42.666667-20.010667-42.666667-44.693333V87.36C128 62.677333 147.093333 42.666667 170.666667 42.666667z m149.333333 256h128a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-128a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z m0 170.666666h384a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H320a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334z m0 170.666667h384a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H320a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconmulu.defaultProps = {
  size: 18
}

export default Iconmulu
