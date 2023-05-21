import getValueColor from '@/utils/getValueColor'
import { FC } from 'react'
import GradeCard from '../GradeCard'
import styles from './index.module.less'

interface IProps {
  data: {
    key: string
    value: string
    style?: 0 | 1
  }[]
  judgeStatus?: 'style' | 'length'
}

const DiagnosticList: FC<IProps> = ({ data, judgeStatus = 'length' }) => {
  const renderText = (
    item: {
      key: string
      value: string
    },
    index: number
  ) => {
    return (
      <div key={index} className={styles['value-c']}>
        <div
          className={styles.value}
          style={{
            color: `${item.value}`.indexOf('%') !== -1 ? getValueColor(`${item.value}`) : '#121D3A'
          }}
        >
          {item.value}
        </div>
        <div className={styles.key}>{item.key}</div>
      </div>
    )
  }

  const renderGradeCard = (
    item: {
      key: string
      value: string
    },
    index: number
  ) => {
    return (
      <div
        key={index}
        style={{
          paddingBottom: '.1rem'
        }}
      >
        <GradeCard text={item.value} gradeKey={parseInt(item.key)} />
      </div>
    )
  }
  return (
    <div className={styles['diagnostic-list']}>
      <div className={styles['diagnostic-values']}>
        {data?.map((item, index) => {
          if (judgeStatus === 'style') {
            if (item.style == 1) {
              return renderGradeCard(item, index)
            } else {
              return renderText(item, index)
            }
          } else {
            if (index === data.length - 1) {
              return renderGradeCard(item, index)
            } else {
              return renderText(item, index)
            }
          }
        })}
      </div>
    </div>
  )
}

export default DiagnosticList
