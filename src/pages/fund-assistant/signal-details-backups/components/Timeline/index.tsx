import { FC } from 'react'
import './index.less'

export interface HistoryType {
  daily_level: number // 1~5 档位
  ra_code: string // 基金代码
  ra_date: string // 日期
  history_text: string
}

interface IProps {
  data: HistoryType[]
}

const Timeline: FC<IProps> = ({ data }) => {
  return (
    <div className="time-line-container">
      {data.map((item, index) => {
        return (
          <div
            style={{
              paddingTop: index === 0 ? 0 : '.3rem'
            }}
          >
            <div className="time-line-title">
              <div className="point-container">
                <div
                  style={{ background: index === 0 ? '#fff' : 'transparent' }}
                  className="point-top"
                />
                <div className="point" />
                <div style={{ flex: 1 }} />
              </div>
              <span className="time">{item.ra_date}</span>
              {/* <span className="tag">低估信号</span> */}
            </div>
            <div className="time-line-content">{item.history_text}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
