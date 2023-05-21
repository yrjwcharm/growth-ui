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

const Iconpaizhao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M298.666667 192l23.616-58.602667A42.666667 42.666667 0 0 1 361.856 106.666667h298.666667A42.666667 42.666667 0 0 1 699.733333 132.48L725.333333 192h209.066667c25.92 0 46.933333 19.093333 46.933333 42.666667v640c0 23.573333-21.013333 42.666667-46.933333 42.666666H89.6C63.68 917.333333 42.666667 898.24 42.666667 874.666667V234.666667c0-23.573333 21.013333-42.666667 46.933333-42.666667H298.666667z m-170.666667 85.333333v554.666667h768V277.333333H128z m384 405.333334a128 128 0 1 0 0-256 128 128 0 0 0 0 256z m0 85.333333c-117.824 0-213.333333-95.509333-213.333333-213.333333s95.509333-213.333333 213.333333-213.333334 213.333333 95.509333 213.333333 213.333334-95.509333 213.333333-213.333333 213.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconpaizhao.defaultProps = {
  size: 18
}

export default Iconpaizhao
