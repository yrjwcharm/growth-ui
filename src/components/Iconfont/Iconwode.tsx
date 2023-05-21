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

const Iconwode: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M302.976 375.466667c0-121.216 107.456-217.813333 234.133333-203.392 91.776 10.453333 167.808 82.090667 181.546667 171.626666 11.84 77.184-20.394667 147.669333-75.648 191.253334 104.277333 38.4 183.509333 123.008 208.853333 237.653333C861.077333 814.293333 826.794667 853.333333 783.253333 853.333333H240.810667c-43.52 0-77.802667-39.018667-68.608-80.682666 25.365333-114.666667 104.554667-199.274667 208.874666-237.674667-47.573333-37.504-78.101333-94.997333-78.101333-159.509333zM512 580.266667c-115.477333 0-214.613333 57.941333-256.810667 159.104-9.088 21.888 8.725333 45.674667 32.832 45.674666H736c24.106667 0 41.92-23.786667 32.810667-45.653333-42.197333-101.184-141.312-159.146667-256.810667-159.146667z m0.042667-341.376c-76.821333 0-139.370667 61.226667-139.370667 136.533333 0 75.306667 62.549333 136.533333 139.370667 136.533333 76.864 0 139.370667-61.226667 139.370666-136.533333 0-75.306667-62.506667-136.533333-139.370666-136.533333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconwode.defaultProps = {
  size: 18
}

export default Iconwode
