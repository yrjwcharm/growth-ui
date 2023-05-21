/*
 * @Date: 2023-02-06 16:58:39
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-06 20:59:08
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/CompareBar/index.tsx
 * @Description: 历史累计收益率中柱状图
 */
import './index.less'

interface IProps {
  value: number
  other: number
}

// 计算数字最大长度
function maxLen(a: number, b: number) {
  if (checkSameFlag(a, b)) {
    return Math.abs(a + b)
  }
  return Math.abs(a) + Math.abs(b)
}
// 符号一样
function checkSameFlag(a: number, b: number) {
  return (a > 0 && b > 0) || (a < 0 && b < 0)
}

export default function CompareBar(props: IProps) {
  const { value = 0, other = 0 } = props
  const isPlus = value > 0
  const isSame = checkSameFlag(value, other)
  const width = (Math.abs(value) / maxLen(value, other)) * 40
  return (
    <div className={`comparebar_wrap ${isSame ? 'same' : ''}`}>
      <div className="mid">
        {!isPlus && (
          <div className="comparebar minu" style={{ width: width || 0 }}>
            <span className="value">{value.toFixed(2)}%</span>
          </div>
        )}

        {isPlus && (
          <div className="comparebar plus" style={{ width: width || 0 }}>
            <span className="value">{value.toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}
