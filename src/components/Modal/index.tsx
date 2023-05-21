import { colorRgba } from '@/utils'
import { FC, ReactNode } from 'react'

interface IProps {
  transparent?: boolean
  visible?: boolean
  style?: React.CSSProperties
  animationType?: 'none' | 'fade' | 'slide'
  children?: ReactNode
}

const Modal: FC<IProps> = ({ visible, transparent, children, style }) => {
  return visible ? (
    <div
      style={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorRgba(style?.backgroundColor || 'rgb(0, 0, 0)', 0.5),
        top: 0,
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        ...style
      }}
    >
      {children}
    </div>
  ) : null
}
export default Modal
