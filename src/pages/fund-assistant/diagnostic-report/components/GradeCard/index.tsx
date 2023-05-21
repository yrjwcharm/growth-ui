import { FC } from 'react'
import styles from './index.module.less'

import thumb from '@/assets/images/icons/thumb.png'

interface IProps {
  gradeKey: number
  text?: string
  length?: 2 | 3
  alignItems?: 'flex-end' | 'center' | 'flex-start'
}

const GradeCard: FC<IProps> = ({ text, gradeKey, length = 3, alignItems = 'flex-end' }) => {
  const height: Record<string, string> = {
    3: '.06rem',
    2: '.08rem',
    1: '.1rem'
  }
  const gradeColor: Record<string, string> = {
    3: '#E74949',
    2: '#FFAF00',
    1: '#545968'
  }
  return (
    <div
      className={styles['grade-card']}
      style={{
        alignItems: alignItems
      }}
    >
      <div
        className={styles.text}
        style={{
          color: gradeColor[`${gradeKey}`]
        }}
      >
        {text}
        {gradeKey === 3 && text ? <img src={thumb} /> : null}
      </div>
      <div className={styles['grade-bar-container']}>
        {['3', '2', '1'].map((item: string, index: number) => {
          if (length === 2 && index === 1) {
            return null
          }
          return (
            <div
              className={styles['grade-bar']}
              style={{
                height: height[item],
                background: index < gradeKey ? gradeColor[`${gradeKey}`] : '#E9EAEF'
              }}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GradeCard
