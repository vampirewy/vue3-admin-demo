import { computed, ref } from 'vue'

export interface DefaultOption {
  placeholder: (label: string) => string
  valueFormat?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export interface DefaultOptionMap {
  [key: string]: DefaultOption | any
}

export interface FormItem {
  label: string
  component: string
  prop: string
  [key: string]: any
}
export interface FormProps {
  searchConfig: FormItem[]
  value: any
  handlerSubmit: (values: { [key: string]: any }) => void
}

const defaultOptionsMap: DefaultOptionMap = {
  input: {
    placeholder: (label: string) => `请输入${label}`,
  },
  select: {
    placeholder: (label: string) => `请选择${label}`,
  },
  'date-picker': {
    placeholder: (label: string) => `请选择${label}`,
    valueFormat: 'YYYY-MM-DD',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    rangeSeparator: '至',
  },
}

const useForm = (props: FormProps) => {
  const getDefaultOptions = () => {
    const option = defaultOptionsMap

    return props.searchConfig.reduce((result: any[], item) => {
      const { component, label, placeholder } = item

      const newItem = Object.keys(option[component]).reduce(
        (acc: any, key) => {
          if (!placeholder) {
            acc[key] =
              typeof option[component][key] === 'function' ? option[component][key](label) : option[component][key]
          }
          return acc
        },
        { ...item, clearable: true },
      )

      delete newItem.value

      result.push(newItem)
      return result
    }, [])
  }

  const formElementRef = ref()

  const values = ref({ ...props.value })

  const config = computed(() => {
    return getDefaultOptions()
  })

  const submit = () => {
    if (props.handlerSubmit) {
      props.handlerSubmit(values.value)
    }
  }

  const reset = () => {
    formElementRef.value.resetFields()
    submit()
  }

  return {
    values,
    config,
    formElementRef,
    getDefaultOptions,
    submit,
    reset,
  }
}

export default useForm
