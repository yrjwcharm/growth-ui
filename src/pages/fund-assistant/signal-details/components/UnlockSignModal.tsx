/*
 * @Date: 2023-02-09 11:04:49
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-09 16:13:21
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/UnlockSignModal.tsx
 * @Description: 解锁基金买卖信号的套餐弹窗
 */
import { SetStateAction, useState } from 'react'
import { Dialog as AlertDialog, Popup, Toast } from 'antd-mobile'
import { callFundUnlockInterfaceApi } from '../services'
import { history } from 'umi'
import '../index.less'
import close from '@/assets/images/close.png'
import forward from '@/assets/images/forward.png'
import EventBus from '@/utils/EventBus'
// 套餐详情的弹窗
const searchComboDetail = (el: {
  combo_name: string
  combo_use_time_key: string
  combo_use_time_val: string
  can_unlock_num_key: string
  can_unlock_num_val: string
  can_unlock_time_key: string
  can_unlock_time_val: string
}) => {
  AlertDialog.show({
    title: `${el.combo_name}详情`,
    closeOnMaskClick: true,
    content: (
      <>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#545968', fontSize: 12 }}>{el.combo_use_time_key}</span>
          <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
            {el.combo_use_time_val}
          </span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#545968', fontSize: 12 }}>{el.can_unlock_num_key}</span>
          <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
            {el.can_unlock_num_val}
          </span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#545968', fontSize: 12 }}>{el.can_unlock_time_key}</span>
          <span style={{ marginTop: 4, color: '#121D3A', fontSize: 12 }}>
            {el.can_unlock_time_val}
          </span>
        </div>
      </>
    ),
    closeOnAction: true,
    actions: [
      [
        {
          key: 'confirm',
          text: '知道了',
          bold: true,
          style: { color: '#0051cc' }
        }
      ]
    ]
  })
}

function UnlockSignModal(props: { _ref: { current: { show: (list: any) => void } } }) {
  const query = history.location.query
  const [visible, setVisible] = useState(false)
  const [comboList, setComboList] = useState([])

  const show = (list: SetStateAction<never[]>) => {
    setComboList(list)
    setVisible(true)
  }

  props._ref.current = { show }

  const unLock = async (el: { fund_code: string; unlock_re_id: string; combo_id: string }) => {
    Toast.show({
      content: '请稍等...',
      maskClickable: false,
      icon: 'loading'
    })
    const res = await callFundUnlockInterfaceApi({
      fund_code: query.fund_code,
      unlock_re_id: el.unlock_re_id,
      combo_id: el.combo_id,
      uid: query.uid
    })
    Toast.clear()
    res &&
      AlertDialog.show({
        title: '买卖信号已解锁',
        closeOnMaskClick: true,
        content: '',
        closeOnAction: true,
        actions: [
          [
            {
              key: 'confirm',
              text: '知道了',
              bold: true,
              style: { color: '#0051cc' },
              onClick: async () => {
                setVisible(false)
                EventBus.emit('unlock_trigger')
              }
            }
          ]
        ]
      })
  }

  const selCombo = (el: any) => {
    comboList.map((item: any) => {
      item.isActive = false
      if (JSON.stringify(el) === JSON.stringify(item)) {
        item.isActive = true
      }
    })
    setComboList([...comboList])
  }

  return (
    <Popup
      className="__popup"
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        maxHeight: '40vh'
      }}
    >
      <div className="mock_content_signal">
        <div className="mock_content_signal_header">
          <span className="title">请选择用于解锁本基金买卖信号的套餐</span>
          <img
            alt=""
            onClick={() => {
              setVisible(false)
            }}
            src={close}
            className="close"
          />
        </div>
        <div
          className="mock_content_signal_list_container"
          style={{ height: '30vh', overflowY: 'scroll' }}
        >
          {comboList.map((el: any, index) => {
            return (
              <div
                onClick={() => selCombo(el)}
                className={
                  el.isActive
                    ? `mock_content_signal_list_container_wrap is_active`
                    : 'mock_content_signal_list_container_wrap'
                }
              >
                <div className="left">
                  <div className="top_wrap">
                    <span className="title">{el.combo_name}</span>
                    <span className="subtitle">{el.can_unlock_info}</span>
                  </div>
                  <span className="middle_title">{el.combo_time_info}</span>
                  <div className="bottom_wrap">
                    <div
                      onClick={(e) => {
                        searchComboDetail(el)
                      }}
                    >
                      <span className="title">查看详情</span>
                      <img alt="" src={forward} className="forward" />
                    </div>
                  </div>
                </div>
                <div
                  className={el.isActive ? 'highlight_right' : 'normal_right'}
                  onClick={(e) => {
                    unLock(el)
                  }}
                >
                  <span className="text" style={{ color: el.isActive ? 'white' : '#0051CC' }}>
                    解锁
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Popup>
  )
}

export default UnlockSignModal
