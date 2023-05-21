/**
 *
 * @param {需要复制的内容} text
 */
const copyText = (text: string) => {
  let textarea = document.createElement('textarea') //创建input对象
  let currentFocus = document.activeElement //当前获得焦点的元素
  textarea.style.position = 'fixed'
  let flag = false
  document.body.appendChild(textarea) //添加元素
  textarea.value = text
  textarea.focus()
  if (textarea.setSelectionRange) textarea.setSelectionRange(0, textarea.value.length)
  //获取光标起始位置到结束位置
  else textarea.select()
  try {
    flag = document.execCommand('copy') //执行复制
  } catch (eo) {
    flag = false
  }
  document.body.removeChild(textarea) //删除元素
  // @ts-ignore
  currentFocus?.focus()
  return flag
}

export default copyText
