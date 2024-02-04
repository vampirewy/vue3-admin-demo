import { ElMessage } from 'element-plus'
import type { MessageOptions } from 'element-plus'

export function messageError(message: MessageOptions['message']) {
  return ElMessage.error({
    message,
    duration: 2000,
  })
}
