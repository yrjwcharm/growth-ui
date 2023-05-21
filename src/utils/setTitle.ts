export const setTitle = (title: string) => {
  setTimeout(() => {
    document.title = title
    let _iframe = document.createElement('iframe')
    _iframe.style.display = 'none'
    _iframe.style.width = '1px'
    _iframe.style.height = '1px'

    _iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(_iframe)
      }, 0)
    }
    document.body.appendChild(_iframe)
  }, 0)
}
