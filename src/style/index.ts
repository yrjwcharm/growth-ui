import { CSSProperties } from 'react'

interface CreateParamsProps {
  [prop: string]: CSSProperties
}

interface StyleSheetProps {
  create: <T extends CreateParamsProps>(styles: T | CreateParamsProps) => T | CreateParamsProps
}
export const StyleSheet: StyleSheetProps = {
  create: (styles) => styles
}
