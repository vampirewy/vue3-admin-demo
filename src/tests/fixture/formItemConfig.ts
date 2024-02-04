import { type FormItem } from '@/components/BaseSearch/form'

export function formItemConfig(configItem?: any): FormItem[] {
  return [
    {
      ...configItem,
      label: '姓名',
      component: 'input',
      prop: 'name',
    },
  ]
}
