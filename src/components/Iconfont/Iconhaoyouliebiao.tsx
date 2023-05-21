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

const Iconhaoyouliebiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M426.666667 512c-117.76 0-213.333333-95.509333-213.333334-213.333333S308.906667 85.333333 426.666667 85.333333s213.333333 95.509333 213.333333 213.333334-95.573333 213.333333-213.333333 213.333333z m0-85.333333c70.656 0 128-57.322667 128-128s-57.344-128-128-128-128 57.322667-128 128 57.344 128 128 128zM42.666667 810.666667c0-141.376 114.56-256 256-256h256c141.44 0 256 114.624 256 256v108.309333c0 23.573333-19.2 42.666667-42.666667 42.666667H85.333333c-23.466667 0-42.666667-19.093333-42.666666-42.666667V810.666667z m682.666666 0c0-94.293333-76.373333-170.666667-170.666666-170.666667H298.666667c-94.293333 0-170.666667 76.373333-170.666667 170.666667v65.642666h597.333333V810.666667z m21.333334-426.666667h213.333333a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H746.666667a21.333333 21.333333 0 0 1-21.333334-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333334-21.333333z m128 170.666667h85.333333a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-85.333333a21.333333 21.333333 0 0 1-21.333334-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333334-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconhaoyouliebiao.defaultProps = {
  size: 18
}

export default Iconhaoyouliebiao