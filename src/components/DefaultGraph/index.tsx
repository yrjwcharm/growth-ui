import { FC, ReactNode } from 'react'

import noData from '@/assets/images/defaultGraph/no-data.png'
import noReminder from '@/assets/images/defaultGraph/no-reminder.png'

import './index.less'

type DefaultGraphType = 'no-data' | 'no-reminder' | 'custom' // custom: 自定义图片
type SubtitleType =
  | string
  | string[]
  | React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface DefaultProps {
  type?: DefaultGraphType
  title?: string
  subtitle?: SubtitleType
  containerStyle?: React.CSSProperties | undefined
  imgSrc?: string
  children?: ReactNode
}

const DefaultGraph: FC<DefaultProps> = ({
  type = 'no-data',
  containerStyle,
  title,
  subtitle,
  imgSrc
}) => {
  const getImage = (key: DefaultGraphType) => {
    switch (key) {
      case 'no-data':
        return <img src={noData} alt="" />
      case 'no-reminder':
        return <img src={noReminder} alt="" />
      case 'custom':
        if (imgSrc) {
          return <img src={imgSrc} alt="" />
        } else {
          console.error('请传入图片路径')
          break
        }
      default:
        return null
    }
  }

  const renderSubtitle = (subtitle: SubtitleType) => {
    if (typeof subtitle === 'string') {
      return <span className="default-graph-subtitle">{subtitle}</span>
    } else if (subtitle instanceof Array) {
      return subtitle.map((item, index) => {
        return (
          <div key={index}>
            <span className="default-graph-subtitle">{item}</span>
          </div>
        )
      })
    } else {
      return subtitle
    }
  }

  return (
    <div style={containerStyle || {}} className="default-graph-c">
      <>
        {getImage(type)}
        {title ? <span className="default-graph-title">{title}</span> : null}
        {subtitle ? renderSubtitle(subtitle) : null}
      </>
    </div>
  )
}

export default DefaultGraph
