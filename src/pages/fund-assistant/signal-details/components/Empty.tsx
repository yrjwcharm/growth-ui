/*
 * @Date: 2023-02-08 18:48:00
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-08 18:49:49
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/Empty.tsx
 * @Description:
 */
import DefaultGraph from '@/components/DefaultGraph'
import '../index.less'

export default function Empty() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
      className="signal_container"
    >
      <div
        style={{
          marginTop: '2rem'
        }}
      >
        <DefaultGraph
          title="暂无估值数据"
          subtitle={
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                className="default-graph-subtitle"
              >
                <span>如下情况会导致没有基金估值数据</span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <span>1、基金清盘、退市；</span>
                  <span>2、新基金上市1年内；</span>
                  <span>3、其他异常数据问题；</span>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
