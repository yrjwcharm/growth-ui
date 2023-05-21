/*
 * @Date: 2023-02-10 17:13:02
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-10 17:46:46
 * @FilePath: /assistant-h5/src/index.tsx
 * @Description: 应用入口
 */
import './global.less'
import ReactDOM from 'react-dom/client'
import RouterApp from './routes'
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<RouterApp />)
