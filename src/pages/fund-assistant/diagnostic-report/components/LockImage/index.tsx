import { FC } from 'react'

interface IProps {
  src: string
  onClick?: () => void
}

const LockImage: FC<IProps> = ({ src, onClick }) => {
  return (
    <div
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      <img
        style={{
          width: '100%'
        }}
        src={src}
        alt=""
      />
    </div>
  )
}

export default LockImage
