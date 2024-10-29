// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  createBy: number
  createTime: string
  description: string
  fee: number
  id: number
  name: string
  planId: number
  planName: string
  status: number
  updateBy: number
  updateTime: string
}
// 护理等级表单提交
export interface FormLevel {
  createBy: number
  createTime: string
  description: string
  fee: number
  id: number
  name: string
  planId: number
  planName: string
  status: number
  updateBy: number
  updateTime: string
}
// 删除基础列表的数据
export interface deleteListParams {
  id: number
}
// 护理项目列表
export interface ProjectListResult {
  data: any[]
  list: Array<ProjecListModel>
}
export interface page {
  page: number
  pageSize: number
  pages: number
  total: number
}

/**
 * 护理项目列表Model
 */
export interface ProjecListModel {
  createBy: number // 创建人
  createTime: string // 创建时间
  creator: string // 创建人
  id: number // 主键
  image: string // 图片
  name: string // 名称
  nursingRequirement: string // 护理要求
  orderNo: number // 排序
  price: number // 价格
  status: number // 状态
  unit: string // 单位
  updateBy: number // 更新人
  updateTime: string // 更新时间
}

/**
 * 分页响应参数
 */
export interface ResponseData<T> {
  code: number
  data: {
    page: number
    pages: string
    records: Array<T>
    pageSize: number
    total: string
  }
  message: string
}

/**
 * 护理项目列表返回值
 */
export interface NurseProjectListResult {
  data: any[]
  list: Array<ProjecListModel>
  page: page
  total: number
}

// 护理计划列表
export interface PlanListResult {
  data: any[]
  list: Array<PlanListModel>
}
export interface PlanListModel {
  createBy: number
  createTime: string
  id: number
  planName: string
  projectPlans: [
    {
      createBy: number
      createTime: string
      executeCycle: number
      executeFrequency: number
      executeTime: string
      id: number
      planId: number
      projectId: number
      updateBy: number
      updateTime: string
    }
  ]
  sortNo: number
  status: number
  updateBy: number
  updateTime: string
}
export interface ListArrangeResult {
  data: any[]
  list: Array<ListArrangeModel>
}
export interface ListArrangeModel {
  createBy: number
  createTime: string
  description: string
  fee: number
  id: number
  name: string
  planId: number
  planName: string
  status: number
  updateBy: number
  updateTime: string
}
