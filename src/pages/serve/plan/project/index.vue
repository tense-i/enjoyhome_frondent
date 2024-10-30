<!-- 护理项目列表页 -->
<template>
  <div class="min-h serveProject bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :searchData="searchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
      @handleClear="handleClear"
    />
    <!-- end -->
    <!-- 表格 -->
    <TableList
      :data="tableData"
      :total="total"
      :pagination="pagination"
      :dataLoading="dataLoading"
      @onPageChange="onPageChange"
      @handleBulid="handleBulid"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      @handleForbidden="handleForbidden"
    />

    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <DialogFrom
      ref="formRef"
      :data="formBaseData"
      :visible="visible"
      :title="title"
      @handleClose="handleClose"
      @handleAddSubmit="handleAddSubmit"
      @handleEditSubmit="handleEditSubmit"
    />
    <!-- end -->
    <!-- 删除弹层 -->
    <CheckDialog
      :visible="operationDlgVisible"
      :title="operationTitle"
      :body="operationBody"
      @handleOperationDlgClose="handleOperationDlgClose"
      @handleOperationDlgCancel="handleOperationDlgCancel"
      @handleOperationConfirm="handleOperationConfirm"
    ></CheckDialog>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import SearchFormBox from './components/SearchFrom.vue'
import TableList from './components/TableList.vue'
import DialogFrom from './components/DialogForm.vue'
import CheckDialog from './components/CheckDialog.vue'
import {
  getNurseProjectListApi,
  projectAddApi,
  projectUpdateApi,
  projectDeleteApi,
  projectStatusApi,
  getProjectDetailsApi
} from '@/api/serve'
import type { ProjecListModel, SEARCH_PARAMS } from '@/api/model/serveModel'
import type { NetResponseType } from '@/api/model/common'
/**
 * 搜索参数
 * @attention searchData没有限定类型、可能会在前端传递中进行修改。
 */
const searchData = ref<SEARCH_PARAMS>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})

onMounted(() => {
  getNurseProjectList(searchData.value)
})

const handleSearch = (val: SEARCH_PARAMS) => {
  // 搜索后，默认回到第一页
  searchData.value.pageNum = 1
  getNurseProjectList(val)
}

/**
 * 重置为默认值
 */
const handleReset = () => {
  console.log('重置')
  searchData.value = {
    pageNum: 1,
    pageSize: 10
  }
  getNurseProjectList(searchData.value)
}

/**
 * 清空搜索条件
 * @attention 清空搜索条件后，需要重新获取数据
 */
const handleClear = (key: string) => {
  console.log(key)
  if (key === 'name') {
    delete searchData.value.name
  } else if (key === 'status') {
    delete searchData.value.status
  }
  // 深拷贝
  searchData.value = {
    ...searchData.value
  }
  getNurseProjectList(searchData.value)
}

const tableData = ref<ProjecListModel[]>([])
const total = ref(0)
const pagination = ref({})
const dataLoading = ref(false)

/**
 * 翻页或改变每页条数
 * @param data 包括Current、pageSize
 */
function onPageChange(data: any) {
  console.log(data)
  if (data.current) {
    searchData.value.pageNum = data.current
  }
  if (data.pageSize) {
    searchData.value.pageSize = data.pageSize
  }
  getNurseProjectList(searchData.value)
}

/**
 * 获取护理项目列表
 */
const getNurseProjectList = async (val: SEARCH_PARAMS) => {
  try {
    dataLoading.value = true
    const res = await getNurseProjectListApi(val)
    tableData.value = res.data.records
    total.value = Number(res.data.total)
  } catch (error) {
    console.log(error)
  } finally {
    dataLoading.value = false
  }
}

// 新增护理项目
const visible = ref(false)
const title = ref('新增')
const formRef = ref(null)
const handleBulid = () => {
  visible.value = true
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
}

// 向父组件暴露方法
defineExpose({
  handleClear
})

/**
 * 获取对话框标题
 * @param i 索引
 * @returns 标题
 */
const getDialogTitile = (i: number) => {
  const TYPETITLE = ['新增', '编辑', '删除', '禁用', '启用']
  return TYPETITLE[i] || '新增'
}

// 删除护理项目
const handleDelete = (id: number, name: string) => {
  operationDlgVisible.value = true
  operationTitle.value = getDialogTitile(3)
  operationId.value = id
  operationName.value = name
  operationBody.value = `该操作将删除${name}，是否继续？`
}

const formBaseData = ref<ProjecListModel>({} as ProjecListModel)
// 编辑护理项目
const handleEdit = async (id: number) => {
  console.log(id)
  visible.value = true
  title.value = getDialogTitile(1)
  await getProjectDetails(id)
}

const getProjectDetails = async (id: number): Promise<void> => {
  const res = await getProjectDetailsApi(id)
  console.log(res)
  if (res.code === 200) {
    formBaseData.value = res.data
  }
}
// 禁用护理项目
const handleForbidden = (nursingProject: ProjecListModel) => {
  operationDlgVisible.value = true
  if (nursingProject.status === 1) {
    operationTitle.value = getDialogTitile(2)
  } else {
    operationTitle.value = getDialogTitile(4)
  }
  operationId.value = nursingProject.id
  operationName.value = nursingProject.name
  operationBody.value = `该操作将${operationTitle.value}${nursingProject.name}，是否继续？`
}

const handleCheckUpdateResponse = (
  res: NetResponseType<ProjecListModel>,
  successMsg: string
) => {
  if (res.code === 200) {
    MessagePlugin.success(successMsg)
    getNurseProjectList(searchData.value)
    handleClose()
    formRef.value.handleClear()
    return true
  }
  MessagePlugin.error(res.message)
  return false
}
// 新增提交
const handleAddSubmit = async (params: ProjecListModel) => {
  console.log(params)
  const res = await projectAddApi(params)
  console.log(res)
  handleCheckUpdateResponse(res, '新增成功')
}
// 编辑提交
const handleEditSubmit = async (params: ProjecListModel) => {
  console.log(params)
  const res = await projectUpdateApi(params)
  console.log(res)
  handleCheckUpdateResponse(res, '编辑成功')
}

// 删除弹窗
const operationDlgVisible = ref(false)
const operationTitle = ref('')
const operationBody = ref('')
const operationId = ref(0)
const operationName = ref('')

const handleOperationDlgClose = () => {
  operationDlgVisible.value = false
  operationTitle.value = ''
  operationBody.value = ''
  operationId.value = 0
  operationName.value = ''
}

const handleOperationDlgCancel = () => {
  operationDlgVisible.value = false
}

const handleOperationConfirm = async () => {
  if (operationTitle.value === getDialogTitile(3)) {
    handleNursingProjectDelete(operationId.value)
  } else if (
    operationTitle.value === getDialogTitile(2) ||
    operationTitle.value === getDialogTitile(4)
  ) {
    await handleNursingProjectForbidden(operationId.value)
  }
  handleOperationDlgClose()
}
// 删除
const handleNursingProjectDelete = async (id: number) => {
  console.log(operationTitle.value, id)
  const res = await projectDeleteApi(id)
  handleCheckUpdateResponse(res, '删除成功')
}
// 禁用
const handleNursingProjectForbidden = async (id: number) => {
  console.log(operationTitle.value, id)
  const status = operationTitle.value === getDialogTitile(2) ? 0 : 1
  const res = await projectStatusApi({ id, status })
  handleCheckUpdateResponse(res, `${operationTitle.value}成功`)
}
</script>
