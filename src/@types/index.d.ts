interface CommonSearchListDto<T> {
  total: string
  records: Array<T>
}

interface CommonSearchListParams {
  size: number
  current: number
}
