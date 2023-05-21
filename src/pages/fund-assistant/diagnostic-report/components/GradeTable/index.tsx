import { FC, useState } from 'react'
import styles from './index.module.less'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import getValueColor from '@/utils/getValueColor'
import DefaultGraph from '@/components/DefaultGraph'

const default_length = 5

interface IProps {
  data: {
    table_head?: {
      index: string
      title: string
    }[]
    table_list?: Record<string, any>[]
  }
}

const level: Record<
  string,
  {
    text: string
    color: string
  }
> = {
  3: {
    text: '优秀',
    color: '#E74949'
  },
  2: {
    text: '良好',
    color: '#FFAF00'
  },
  1: {
    text: '一般',
    color: '#545968'
  }
}

const GradeTable: FC<IProps> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false)

  if (data.table_head && data.table_head.length > 0) {
    return (
      <div className={styles['grade-table']}>
        <div className={styles.thead}>
          {data.table_head.map((item, index) => {
            return (
              <div
                key={item.index}
                className={`${styles.td} ${index === 0 ? styles.flex1 : styles.width} ${
                  index === data.table_head?.length! - 1 ? styles['flex-left'] : ''
                }`}
              >
                {item.title}
              </div>
            )
          })}
        </div>
        {data.table_list && data.table_list?.length > 0 ? (
          <>
            <div
              style={{
                height:
                  data.table_list?.length > default_length
                    ? show
                      ? 'auto'
                      : `${default_length * 0.62}rem`
                    : 'auto',
                overflow: 'hidden'
              }}
            >
              {data.table_list.map((item, index) => {
                return (
                  <div key={index} className={styles.tbody}>
                    {data?.table_head?.map((val, i) => {
                      return (
                        <div
                          key={i}
                          className={`${styles.td} ${i === 0 ? styles.flex1 : styles.width} ${
                            i === 0 || i === data.table_head?.length! - 1
                              ? styles['font-size-26']
                              : styles['font-size-28']
                          } ${
                            i === data.table_head?.length! - 1
                              ? styles['flex-left']
                              : styles['font-family-din']
                          }`}
                          style={{
                            color:
                              `${item[val.index]}`.indexOf('%') !== -1
                                ? getValueColor(`${item[val.index]}`)
                                : '#545968'
                          }}
                        >
                          {i === data.table_head?.length! - 1 ? (
                            <span
                              style={{
                                color: level[`${item[val.index]}`].color
                              }}
                            >
                              {level[`${item[val.index]}`].text}
                            </span>
                          ) : (
                            item[val.index]
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            {data.table_list?.length > default_length ? (
              <div
                className={styles['tbody-footer']}
                onClick={() => {
                  setShow(!show)
                }}
              >
                {show ? <UpOutline /> : <DownOutline />}
                <span
                  style={{
                    marginLeft: '.12rem'
                  }}
                >
                  {show ? '收起' : '展开'}
                </span>
              </div>
            ) : null}
          </>
        ) : (
          <div
            style={{
              marginTop: '.48rem'
            }}
          >
            <DefaultGraph title="暂无数据" />
          </div>
        )}
      </div>
    )
  } else {
    return null
  }
}

export default GradeTable
