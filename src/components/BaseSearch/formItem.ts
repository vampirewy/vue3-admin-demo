export interface FormItemProps {
  item: {
    label?: string
    prop: string
    component: string
    options?: {
      label: string
      value: string | number
    }[]
    [key: string]: any
  }
  value: any
}
