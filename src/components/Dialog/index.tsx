import { CSSProperties, FC } from 'react'
import Modal from '../Modal'
import View from '../View'
import Text from '../Text'
import { StyleSheet } from '@/style/index'
import { ReactElement } from 'react'
interface ActionType {
  title: string // 按钮的标题
  onPress: (event: any) => void //按钮点击
}
interface IProps {
  title?: string // dialog标题
  content?: string | ReactElement // dialog描述
  action: ActionType[]
  visible: boolean // dialog是否展示
  containerStyle?: CSSProperties
  textAlign?: 'center' | 'left' | 'right'
}
const Dialog: FC<IProps> = ({
  title,
  content,
  action: dataList,
  visible = false,
  containerStyle,
  textAlign = 'center'
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      style={{ zIndex: 1000, ...containerStyle }}
    >
      <View style={styles.container}>
        <View style={styles['dialog-container']}>
          <View style={styles.shadow}>
            <View style={styles['dialog-content']}>
              {title && (
                <Text
                  style={Object.assign(
                    styles['dialog-title'],
                    content ? {} : { marginBottom: '0.38rem' }
                  )}
                >
                  {title}
                </Text>
              )}
              {content &&
                (typeof content === 'string' ? (
                  <Text
                    style={Object.assign(styles['dialog-main-content'])}
                    // ellipsizeMode="tail"
                    // numberOfLines={5}
                  >
                    {content}
                  </Text>
                ) : (
                  <View style={styles['dialog-main-content']}>{content}</View>
                ))}
            </View>
            {/* slot */}
            {/* <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingBottom: 20
              }}>
              <View
                style={{
                  borderWidth: 1,
                  height: 36,
                  justifyContent: 'center',

                  borderColor: '#DEE0E3'
                }}>
                <TextInput style={{ height: 36 }} />
              </View>
            </View> */}
            {dataList && (
              <View
                style={
                  dataList.length > 2
                    ? styles['dialog-btn-contaienr-long']
                    : styles['dialog-btn-contaienr-short']
                }
              >
                {dataList.map((item, index) => {
                  const last = index + 1 === dataList.length
                  const count = dataList.length > 2
                  return (
                    <View
                      key={index}
                      onClick={item?.onPress}
                      style={Object.assign(
                        count
                          ? styles['dialog-btn-contaienr-long-item']
                          : styles['dialog-btn-contaienr-short-item'],
                        last ? (count ? styles['last-long-item'] : styles['last-short-item']) : {},
                        dataList.length === 1 ? { paddingLeft: 0 } : {}
                      )}
                    >
                      <Text style={last ? styles['hight-light-item'] : styles['text-item']}>
                        {item.title}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Dialog

const styles = StyleSheet.create({
  container: {
    width: 'calc(100vw - 1.44rem)',
    margin: '0 auto',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  flex1: {},
  'dialog-container': {
    width: '100%',
    borderRadius: '0.08rem',
    overflow: 'hidden'
  },
  shadow: {
    overflow: 'hidden'
  },
  'dialog-content': {
    backgroundColor: '#FFFFFF',
    padding: '0.46rem 0.4rem'
  },
  'dialog-title': {
    marginBottom: '0.2rem',
    fontWeight: 500,
    fontSize: '0.34rem',
    color: '#212121',
    textAlign: 'center'
  },
  'dialog-main-content': {
    color: '#1F2329',
    textAlign: 'center',
    fontSize: '0.32rem'
  },
  // 只有两个选项 并且选项字不超过7个的时候 为short
  'dialog-btn-contaienr-short': {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: '0.02rem',
    borderTopStyle: 'solid',
    borderTopColor: '#DEE0E3'
  },
  // 只有两个选项 并且选项字不超过7个的时候 为short
  'dialog-btn-contaienr-short-item': {
    height: '1rem',
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: '0.02rem',
    borderRightStyle: 'solid',
    borderRightColor: '#DEE0E3',
    alignItems: 'center',
    paddingRight: '0.4rem'
  },
  'last-short-item': {
    paddingLeft: '0.4rem',
    borderRightWidth: 0,
    borderRightStyle: 'solid',
    borderRightColor: '#DEE0E3',
    paddingRight: 0
  },
  // 超过两个选项 或者选项字超过7个的时候 为long
  'dialog-btn-contaienr-long': {
    backgroundColor: '#fff'
  },
  'dialog-btn-contaienr-long-item': {
    height: '1rem',
    justifyContent: 'center',
    borderTopWidth: '0.02rem',
    borderTopStyle: 'solid',
    borderTopColor: '#DEE0E3',
    alignItems: 'center'
  },
  'last-long-item': {},
  'hight-light-item': {
    color: '#0051CC',
    fontSize: '0.34rem'
  },
  'text-item': {
    color: '#1F2329',
    fontSize: '0.34rem'
  }
})
