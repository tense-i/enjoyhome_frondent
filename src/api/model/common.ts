export type NetResponseType<T> = {
  code: number
  data: T
  message: string
}

// 分页数据
export type PaginationType = {
  pageNum?: number
  pageSize?: number
  total?: number
}
