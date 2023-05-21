import './index.less'
import { useEffect } from 'react'

export default function SignalDetails() {
  useEffect(() => {}, [])

  return (
    <div>
      <wx-open-launch-weapp id="launch-btn" username="gh_2a6eaffe7b71" path="pages/hold/index">
        <script type="text/wxtag-template">
          <button>打开小程序</button>
        </script>
      </wx-open-launch-weapp>
    </div>
  )
}
