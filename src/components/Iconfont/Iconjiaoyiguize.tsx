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

const Iconjiaoyiguize: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M42.666667 512C42.666667 252.8 252.8 42.666667 512 42.666667a469.162667 469.162667 0 0 1 469.333333 469.333333 42.666667 42.666667 0 1 1-85.333333 0A383.850667 383.850667 0 0 0 512 128C299.925333 128 128 299.925333 128 512s171.925333 384 384 384c82.24 0 160.490667-25.877333 225.578667-73.194667a386.474667 386.474667 0 0 0 81.408-80.085333 42.666667 42.666667 0 1 1 68.181333 51.306667 471.808 471.808 0 0 1-99.413333 97.792A467.349333 467.349333 0 0 1 512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512z"
        fill={getIconColor(color, 0, '#51565D')}
      />
      <path
        d="M436.181333 276.053333a32 32 0 0 1 47.445334 42.816l-2.197334 2.432-84.181333 84.16h320.853333a32 32 0 0 1 31.829334 28.928l0.149333 3.072A32 32 0 0 1 721.173333 469.333333l-3.093333 0.149334H320c-27.52 0-41.792-32.128-24.597333-52.48l1.962666-2.133334 138.816-138.816zM601.834667 737.429333a32 32 0 0 1-47.445334-42.816l2.197334-2.432 84.181333-84.181333H319.936a32 32 0 0 1-31.850667-28.928L287.936 576a32 32 0 0 1 28.928-31.850667l3.072-0.149333h398.08c27.52 0 41.792 32.128 24.597333 52.48l-1.962666 2.133333-138.816 138.816z"
        fill={getIconColor(color, 1, '#F84949')}
      />
    </svg>
  )
}

Iconjiaoyiguize.defaultProps = {
  size: 18
}

export default Iconjiaoyiguize
