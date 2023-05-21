import { FC } from 'react'

interface IProps {
  size?: 'large' | 'small' | number
}

const ActivityIndicator: FC<IProps> = ({ size = 'small' }) => {
  const getSize = (type: typeof size) => {
    switch (type) {
      case 'large':
        return 70
      case 'small':
        return 40

      default:
        return type
    }
  }
  return (
    <img
      src={require('@/assets/images/spinner.gif')}
      style={{
        width: getSize(size),
        height: getSize(size)
      }}
      alt=""
    />
  )
}
export default ActivityIndicator
