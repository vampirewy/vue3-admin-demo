import { vi, describe, it, expect } from 'vitest'
import useForm from '../form'
import { formItemConfig } from '@/tests/fixture'
import { type FormItem } from '../form'

const handlerSubmit = vi.fn()

function initialValues(name: string | undefined = undefined) {
  return {
    name,
  }
}

function mockProps(searchConfig: FormItem[], value: any) {
  return {
    searchConfig,
    value,
    handlerSubmit,
  }
}

describe('search list', () => {
  describe('initial values', () => {
    it('should initial values is undefined', () => {
      const { values } = useForm(mockProps(formItemConfig(), {}))

      expect(values.value).toEqual(initialValues())
    })

    it('should initial values is have correct value', () => {
      const { values } = useForm(mockProps(formItemConfig({ value: '小王' }), initialValues('小王')))

      expect(values.value).toEqual(initialValues('小王'))
    })
  })

  it('should initial config', () => {
    const { config } = useForm(mockProps(formItemConfig(), {}))

    expect(config.value).toEqual(
      formItemConfig({
        placeholder: '请输入姓名',
        clearable: true,
      }),
    )
  })

  it('should return correct values when handlerSubmit', () => {
    const { submit } = useForm(mockProps(formItemConfig(), initialValues('小李')))

    submit()

    expect(handlerSubmit).toBeCalledWith(initialValues('小李'))
  })
})
