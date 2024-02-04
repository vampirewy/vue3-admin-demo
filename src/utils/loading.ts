import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

let loadingInstance: LoadingInstance

export function showFullScreenLoading() {
  loadingInstance = ElLoading.service({
    lock: true,
    text: '正在加载',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

export function hiddenFullScreenLoading() {
  loadingInstance.close()
}
